/* assets/js/avatar3d.js
 * Avatar do personagem em 3D de verdade (Three.js), no lugar do sprite CSS antigo.
 * Personagem "voxel" estilizado, montado com geometrias primitivas (caixas,
 * cilindros, esferas, toros) como esqueleto base -- SEM textura de imagem --
 * mas a maioria das pecas equipaveis agora veste o MODELO glTF de verdade
 * (baixado do Poly Pizza, ver assets/models/ e os creditos no rodape da
 * pagina) no lugar da geometria simples, assim que ele termina de carregar.
 * Enquanto o modelo ainda nao chegou (ou se a rede falhar), a peca em
 * primitivas continua aparecendo como fallback -- o boneco nunca fica sem
 * roupa por causa disso.
 *
 * Cada modelo importado e' CLONADO com material proprio e pintado com a cor
 * do item equipado (aplicarCor), entao trocar de roupa realmente muda a
 * "skin" do boneco -- nao e' so' a cor de uma caixa, e' o modelo entrando/
 * saindo da cena.
 *
 * API exposta em window.Avatar3D, consumida por assets/js/gamificacao.js:
 *   Avatar3D.montar(containerEl)              -> cria a cena dentro do elemento
 *   Avatar3D.atualizar(visual, opcoes)        -> aplica cores/estilos dos itens equipados
 *   Avatar3D.celebrar()                       -> giro extra ao ganhar recompensa
 */
(() => {
  if (typeof window === 'undefined') {
    return;
  }

  let cena = null;
  let camera = null;
  let renderer = null;
  let grupoPersonagem = null;
  let partes = null;
  let containerRef = null;

  let arrastando = false;
  let ultimoX = 0;
  let anguloAlvo = 0;
  let anguloAtual = 0;

  function corRgbaParaComponentes(valor) {
    const m = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\)/.exec(valor || '');
    if (!m) {
      return { r: 63 / 255, g: 224 / 255, b: 140 / 255, a: 0.18 };
    }
    return {
      r: Number(m[1]) / 255,
      g: Number(m[2]) / 255,
      b: Number(m[3]) / 255,
      a: m[4] !== undefined ? Number(m[4]) : 0.2,
    };
  }

  const carregadorTextura = typeof window !== 'undefined' && window.THREE ? new window.THREE.TextureLoader() : null;
  let texturaBrunoSecreta = null;

  function obterTexturaBrunoSecreta() {
    if (!texturaBrunoSecreta && carregadorTextura) {
      texturaBrunoSecreta = carregadorTextura.load('../assets/img/bruno-secreto.png');
      // Imagem fonte e pequena (75x75) e nao e potencia de 2: sem mipmap e com
      // filtro linear ela fica nitida e sem artefato ao ser ampliada no decal.
      texturaBrunoSecreta.generateMipmaps = false;
      texturaBrunoSecreta.minFilter = window.THREE.LinearFilter;
      texturaBrunoSecreta.magFilter = window.THREE.LinearFilter;
    }
    return texturaBrunoSecreta;
  }

  // ===== Modelos glTF importados (Poly Pizza) que o boneco pode vestir =====
  const MODEL_URLS = {
    oculos: '../assets/models/oculos.glb',
    amuleto: '../assets/models/amuleto.glb',
    capa: '../assets/models/capa.glb',
    armadura: '../assets/models/armadura.glb',
    tenis: '../assets/models/tenis.glb',
    bota: '../assets/models/bota.glb',
  };

  const gltfLoader = typeof window.THREE !== 'undefined' && window.THREE.GLTFLoader ? new window.THREE.GLTFLoader() : null;
  const cenaCruaCache = {};
  let ultimoVisual = null;
  let ultimaConfig = null;

  function carregarCru(chave) {
    if (!gltfLoader || !MODEL_URLS[chave]) {
      return Promise.reject(new Error('sem loader ou url para ' + chave));
    }
    if (!cenaCruaCache[chave]) {
      cenaCruaCache[chave] = new Promise((resolve, reject) => {
        gltfLoader.load(MODEL_URLS[chave], (gltf) => resolve(gltf.scene), undefined, reject);
      });
    }
    return cenaCruaCache[chave];
  }

  // Centraliza, escala pra caber numa caixa de 1 unidade e remove qualquer
  // textura/imagem do modelo original -- a cor final vem sempre do item
  // equipado (aplicarCor), nunca de uma textura baixada.
  function normalizarClone(original) {
    const THREE = window.THREE;
    const clone = original.clone(true);
    const materiais = [];

    clone.traverse((obj) => {
      if (obj.isMesh) {
        const materialClonado = obj.material.clone();
        materialClonado.map = null;
        materialClonado.roughness = 0.6;
        materialClonado.metalness = 0.08;
        obj.material = materialClonado;
        materiais.push(materialClonado);
      }
    });

    const caixaAntes = new THREE.Box3().setFromObject(clone);
    const tamanho = new THREE.Vector3();
    caixaAntes.getSize(tamanho);
    const maiorLado = Math.max(tamanho.x, tamanho.y, tamanho.z) || 1;
    clone.scale.setScalar(1 / maiorLado);

    const caixaDepois = new THREE.Box3().setFromObject(clone);
    const centro = new THREE.Vector3();
    caixaDepois.getCenter(centro);
    clone.position.sub(centro);

    return { clone, materiais };
  }

  // Cria o "suporte" (posicao + escala no corpo) de uma peca vestivel e
  // dispara o carregamento; quando terminar, o modelo normalizado entra
  // dentro do suporte e o estado.pronto vira true (atualizar() troca a
  // primitiva pelo modelo no proximo frame).
  function criarSuportePeca(grupoPersonagem2, chave, x, y, z, escala, rotY, rotX) {
    const suporte = new window.THREE.Group();
    suporte.position.set(x, y, z);
    suporte.scale.setScalar(escala);
    if (rotY) {
      suporte.rotation.y = rotY;
    }
    if (rotX) {
      suporte.rotation.x = rotX;
    }
    suporte.visible = false;
    grupoPersonagem2.add(suporte);

    const estado = { grupo: suporte, materiais: [], pronto: false };

    carregarCru(chave)
      .then((original) => {
        const { clone, materiais } = normalizarClone(original);
        suporte.add(clone);
        estado.materiais = materiais;
        estado.pronto = true;

        // O modelo pode terminar de carregar bem depois do ultimo clique do
        // usuario (rede lenta); sem isso, a peca em primitiva ficaria
        // "presa" na tela ate a proxima acao chamar atualizar() de novo.
        if (ultimoVisual) {
          atualizar(ultimoVisual, ultimaConfig);
        }
      })
      .catch(() => {
        // Sem internet/CDN: a peca em primitivas (fallback) continua
        // aparecendo normalmente, o boneco nao quebra por causa disso.
      });

    return estado;
  }

  function aplicarCor(estadoModelo, corHex) {
    if (!estadoModelo || !corHex) {
      return;
    }
    estadoModelo.materiais.forEach((mat) => mat.color.set(corHex));
  }

  function construirPersonagem() {
    const THREE = window.THREE;
    const grupo = new THREE.Group();

    const matPele = new THREE.MeshStandardMaterial({ color: 0xe6b98f, roughness: 0.7 });
    const matCabeca = new THREE.MeshStandardMaterial({ color: 0x27312c, roughness: 0.6 });
    const matTronco = new THREE.MeshStandardMaterial({ color: 0x2f7d5a, roughness: 0.6 });
    const matPernas = new THREE.MeshStandardMaterial({ color: 0x2e5e8c, roughness: 0.6 });
    const matAcessorio = new THREE.MeshStandardMaterial({ color: 0xc4782b, roughness: 0.5 });
    const matEscuro = new THREE.MeshStandardMaterial({ color: 0x10231a, roughness: 0.8 });
    const matCalcado = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7 });
    const matArmadura = new THREE.MeshStandardMaterial({ color: 0xcfd4d8, roughness: 0.32, metalness: 0.75 });
    const matCapa = new THREE.MeshStandardMaterial({
      color: 0xc4782b,
      roughness: 0.55,
      side: THREE.DoubleSide,
    });

    // Cabeca
    const cabeca = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), matPele);
    cabeca.position.y = 2.15;
    grupo.add(cabeca);

    // Pescoco (liga cabeca ao tronco, da mais definicao ao personagem)
    const pescoco = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.22, 12), matPele);
    pescoco.position.y = 1.72;
    grupo.add(pescoco);

    // Olhos
    const olhoGeo = new THREE.BoxGeometry(0.12, 0.12, 0.06);
    const olhoEsq = new THREE.Mesh(olhoGeo, matEscuro);
    olhoEsq.position.set(-0.22, 2.2, 0.52);
    grupo.add(olhoEsq);
    const olhoDir = olhoEsq.clone();
    olhoDir.position.x = 0.22;
    grupo.add(olhoDir);

    // Boca
    const boca = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.06), matEscuro);
    boca.position.set(0, 1.94, 0.52);
    grupo.add(boca);

    // ===== Cabeca: bone (boné) vs capuz (hoodie) — trocam de verdade, nao so de cor =====
    const chapeu = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.42, 1.08), matCabeca);
    chapeu.position.y = 2.66;
    grupo.add(chapeu);

    const boneBrim = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.3), matCabeca);
    boneBrim.position.set(0, 2.5, 0.63);
    boneBrim.visible = false;
    grupo.add(boneBrim);

    const capuzGrupo = new THREE.Group();
    const capuzTopo = new THREE.Mesh(
      new THREE.SphereGeometry(0.74, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.6),
      matCabeca
    );
    capuzTopo.position.y = 2.5;
    capuzGrupo.add(capuzTopo);
    const capuzCosta = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.55), matCabeca);
    capuzCosta.position.set(0, 1.95, -0.18);
    capuzGrupo.add(capuzCosta);
    capuzGrupo.visible = false;
    grupo.add(capuzGrupo);

    // Tronco
    const tronco = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 0.7), matTronco);
    tronco.position.y = 1.05;
    grupo.add(tronco);

    // ===== Tronco: detalhes que so aparecem por estilo de peca =====
    const jaquetaGrupo = new THREE.Group();
    const lapelaEsq = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.58, 0.1), matAcessorio);
    lapelaEsq.position.set(-0.26, 1.26, 0.38);
    lapelaEsq.rotation.z = 0.28;
    jaquetaGrupo.add(lapelaEsq);
    const lapelaDir = lapelaEsq.clone();
    lapelaDir.position.x = 0.26;
    lapelaDir.rotation.z = -0.28;
    jaquetaGrupo.add(lapelaDir);
    const ziper = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.02, 0.06), matAcessorio);
    ziper.position.set(0, 1.05, 0.38);
    jaquetaGrupo.add(ziper);
    jaquetaGrupo.visible = false;
    grupo.add(jaquetaGrupo);

    const coleteGrupo = new THREE.Group();
    const tiraEsq = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.15, 0.07), matAcessorio);
    tiraEsq.position.set(-0.27, 1.08, 0.37);
    tiraEsq.rotation.z = 0.2;
    coleteGrupo.add(tiraEsq);
    const tiraDir = tiraEsq.clone();
    tiraDir.position.x = 0.27;
    tiraDir.rotation.z = -0.2;
    coleteGrupo.add(tiraDir);
    const fivela = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), matAcessorio);
    fivela.position.set(0, 0.72, 0.39);
    coleteGrupo.add(fivela);
    coleteGrupo.visible = false;
    grupo.add(coleteGrupo);

    const kimonoGrupo = new THREE.Group();
    const kimonoSaia = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 0.9), matTronco);
    kimonoSaia.position.set(0, 0.14, 0);
    kimonoGrupo.add(kimonoSaia);
    const kimonoFaixa = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.2, 0.78), matAcessorio);
    kimonoFaixa.position.set(0, 0.56, 0);
    kimonoGrupo.add(kimonoFaixa);
    kimonoGrupo.visible = false;
    grupo.add(kimonoGrupo);

    const armaduraGrupo = new THREE.Group();
    const ombreiraEsq = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.52), matArmadura);
    ombreiraEsq.position.set(-0.95, 1.64, 0);
    armaduraGrupo.add(ombreiraEsq);
    const ombreiraDir = ombreiraEsq.clone();
    ombreiraDir.position.x = 0.95;
    armaduraGrupo.add(ombreiraDir);
    const peitoral = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.92, 0.16), matArmadura);
    peitoral.position.set(0, 1.15, 0.41);
    armaduraGrupo.add(peitoral);
    armaduraGrupo.visible = false;
    grupo.add(armaduraGrupo);

    // Bracos
    const bracoGeo = new THREE.BoxGeometry(0.4, 1.15, 0.4);
    const bracoEsq = new THREE.Mesh(bracoGeo, matTronco);
    bracoEsq.position.set(-0.95, 1.05, 0);
    bracoEsq.rotation.z = 0.12;
    grupo.add(bracoEsq);
    const bracoDir = bracoEsq.clone();
    bracoDir.position.x = 0.95;
    bracoDir.rotation.z = -0.12;
    grupo.add(bracoDir);

    // Maos
    const maoGeo = new THREE.BoxGeometry(0.32, 0.3, 0.32);
    const maoEsq = new THREE.Mesh(maoGeo, matPele);
    maoEsq.position.set(-1.06, 0.42, 0);
    grupo.add(maoEsq);
    const maoDir = maoEsq.clone();
    maoDir.position.x = 1.06;
    grupo.add(maoDir);

    // Pernas
    const pernaGeo = new THREE.BoxGeometry(0.5, 1.1, 0.5);
    const pernaEsq = new THREE.Mesh(pernaGeo, matPernas);
    pernaEsq.position.set(-0.35, -0.15, 0);
    grupo.add(pernaEsq);
    const pernaDir = pernaEsq.clone();
    pernaDir.position.x = 0.35;
    grupo.add(pernaDir);

    const calcaEsportivaGrupo = new THREE.Group();
    const listraEsq = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.02, 0.07), matAcessorio);
    listraEsq.position.set(-0.35, -0.15, 0.27);
    calcaEsportivaGrupo.add(listraEsq);
    const listraDir = listraEsq.clone();
    listraDir.position.x = 0.35;
    calcaEsportivaGrupo.add(listraDir);
    calcaEsportivaGrupo.visible = false;
    grupo.add(calcaEsportivaGrupo);

    // ===== Pes: tenis (padrao) vs bota (mais alta) =====
    const tenisGeo = new THREE.BoxGeometry(0.56, 0.22, 0.62);
    const tenisEsq = new THREE.Mesh(tenisGeo, matCalcado);
    tenisEsq.position.set(-0.35, -0.79, 0.06);
    grupo.add(tenisEsq);
    const tenisDir = tenisEsq.clone();
    tenisDir.position.x = 0.35;
    grupo.add(tenisDir);

    const botaGeo = new THREE.BoxGeometry(0.58, 0.52, 0.62);
    const botaEsq = new THREE.Mesh(botaGeo, matCalcado);
    botaEsq.position.set(-0.35, -0.62, 0.05);
    botaEsq.visible = false;
    grupo.add(botaEsq);
    const botaDir = botaEsq.clone();
    botaDir.position.x = 0.35;
    botaDir.visible = false;
    grupo.add(botaDir);

    // ===== Acessorio: oculos de verdade (lente + ponte + haste) vs amuleto =====
    const oculosGrupo = new THREE.Group();
    const lenteGeo = new THREE.TorusGeometry(0.13, 0.032, 8, 16);
    const lenteEsq = new THREE.Mesh(lenteGeo, matAcessorio);
    lenteEsq.position.set(-0.22, 2.2, 0.55);
    oculosGrupo.add(lenteEsq);
    const lenteDir = lenteEsq.clone();
    lenteDir.position.x = 0.22;
    oculosGrupo.add(lenteDir);
    const ponte = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.032, 0.032), matAcessorio);
    ponte.position.set(0, 2.2, 0.55);
    oculosGrupo.add(ponte);
    const hasteEsq = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.032, 0.032), matAcessorio);
    hasteEsq.position.set(-0.42, 2.2, 0.42);
    hasteEsq.rotation.y = -0.55;
    oculosGrupo.add(hasteEsq);
    const hasteDir = hasteEsq.clone();
    hasteDir.position.x = 0.42;
    hasteDir.rotation.y = 0.55;
    oculosGrupo.add(hasteDir);
    oculosGrupo.visible = false;
    grupo.add(oculosGrupo);

    const amuletoGrupo = new THREE.Group();
    const cordao = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), matEscuro);
    cordao.position.set(0, 1.52, 0.4);
    amuletoGrupo.add(cordao);
    const gema = new THREE.Mesh(new THREE.OctahedronGeometry(0.14), matAcessorio);
    gema.position.set(0, 1.28, 0.44);
    amuletoGrupo.add(gema);
    amuletoGrupo.visible = false;
    grupo.add(amuletoGrupo);

    // Decal secreto (easter egg do Bruno): so aparece com a camiseta exclusiva equipada.
    // Grande de proposito -- o rosto precisa ficar bem visivel, entao cobre quase
    // toda a frente do tronco (tronco tem 1.3 de largura/altura).
    const decalBruno = new THREE.Mesh(
      new THREE.PlaneGeometry(1.08, 1.08),
      new THREE.MeshBasicMaterial({ map: obterTexturaBrunoSecreta(), transparent: true })
    );
    decalBruno.position.set(0, 1.1, 0.361);
    decalBruno.visible = false;
    grupo.add(decalBruno);

    // ===== Slot de aura: brilho esferico vs capa de verdade nas costas =====
    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(1.95, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x3fe08c,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    aura.position.y = 1.1;
    aura.visible = false;
    grupo.add(aura);

    const capa = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.7), matCapa);
    capa.position.set(0, 1.0, -0.38);
    capa.rotation.x = 0.08;
    capa.visible = false;
    grupo.add(capa);

    // Sombra simples no chao
    const sombra = new THREE.Mesh(
      new THREE.CircleGeometry(1.1, 24),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
    );
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = -0.72;
    grupo.add(sombra);

    // ===== Modelos glTF importados: cada um "veste" na posicao equivalente
    // da peca em primitivas. So aparecem quando terminam de carregar.
    // Bone (bone) e Jaqueta (jaqueta) ficaram deformados demais nessa escala
    // pequena pra cobrir cabeca/tronco -- essas duas pecas continuam so' na
    // geometria em primitivas (o modelo real deles ainda aparece certinho no
    // preview giratorio da loja, que e' um espaco pequeno e neutro). =====
    const oculosModelo = criarSuportePeca(grupo, 'oculos', 0, 2.18, 0.56, 0.62);
    const amuletoModelo = criarSuportePeca(grupo, 'amuleto', 0, 1.34, 0.42, 0.46);
    const capaModelo = criarSuportePeca(grupo, 'capa', 0, 0.95, -0.42, 1.85, Math.PI);
    const armaduraModelo = criarSuportePeca(grupo, 'armadura', 0, 1.2, 0.05, 1.9);
    const tenisModelo = criarSuportePeca(grupo, 'tenis', 0, -0.78, 0.04, 1.05);
    const botaModelo = criarSuportePeca(grupo, 'bota', 0, -0.66, 0.02, 1.1);

    return {
      grupo,
      partes: {
        matPele,
        matCabeca,
        matTronco,
        matPernas,
        matAcessorio,
        matArmadura,
        matCapa,
        chapeuMesh: chapeu,
        boneBrimMesh: boneBrim,
        capuzGrupo,
        jaquetaGrupo,
        coleteGrupo,
        kimonoGrupo,
        armaduraGrupo,
        calcaEsportivaGrupo,
        tenisMeshes: [tenisEsq, tenisDir],
        botaMeshes: [botaEsq, botaDir],
        oculosGrupo,
        amuletoGrupo,
        auraMesh: aura,
        capaMesh: capa,
        decalBrunoMesh: decalBruno,
        oculosModelo,
        amuletoModelo,
        capaModelo,
        armaduraModelo,
        tenisModelo,
        botaModelo,
      },
    };
  }

  function configurarArraste(dom) {
    const aoDescer = (clientX) => {
      arrastando = true;
      ultimoX = clientX;
    };
    const aoMover = (clientX) => {
      if (!arrastando) {
        return;
      }
      anguloAlvo += (clientX - ultimoX) * 0.012;
      ultimoX = clientX;
    };
    const aoSoltar = () => {
      arrastando = false;
    };

    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';

    dom.addEventListener('mousedown', (evento) => {
      dom.style.cursor = 'grabbing';
      aoDescer(evento.clientX);
    });
    window.addEventListener('mousemove', (evento) => aoMover(evento.clientX));
    window.addEventListener('mouseup', () => {
      dom.style.cursor = 'grab';
      aoSoltar();
    });

    dom.addEventListener('touchstart', (evento) => aoDescer(evento.touches[0].clientX), { passive: true });
    dom.addEventListener('touchmove', (evento) => aoMover(evento.touches[0].clientX), { passive: true });
    dom.addEventListener('touchend', aoSoltar);
  }

  function redimensionar() {
    if (!containerRef || !renderer || !camera) {
      return;
    }

    const largura = containerRef.clientWidth || 280;
    const altura = containerRef.clientHeight || 320;
    renderer.setSize(largura, altura);
    camera.aspect = largura / altura;
    camera.updateProjectionMatrix();
  }

  function animar() {
    requestAnimationFrame(animar);

    if (!arrastando) {
      anguloAlvo += 0.0035;
    }
    anguloAtual += (anguloAlvo - anguloAtual) * 0.12;

    if (grupoPersonagem) {
      grupoPersonagem.rotation.y = anguloAtual;
    }

    if (renderer && cena && camera) {
      renderer.render(cena, camera);
    }
  }

  function montar(containerEl) {
    if (!containerEl || typeof window.THREE === 'undefined') {
      return false;
    }

    const THREE = window.THREE;
    containerRef = containerEl;

    const largura = containerEl.clientWidth || 280;
    const altura = containerEl.clientHeight || 320;

    cena = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, largura / altura, 0.1, 100);
    camera.position.set(0, 1.35, 6.4);
    camera.lookAt(0, 1.05, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(largura, altura);
    containerEl.innerHTML = '';
    containerEl.appendChild(renderer.domElement);

    cena.add(new THREE.AmbientLight(0xffffff, 0.75));
    const luz = new THREE.DirectionalLight(0xffffff, 0.75);
    luz.position.set(3, 5, 4);
    cena.add(luz);
    const luzContraste = new THREE.DirectionalLight(0x3fe08c, 0.25);
    luzContraste.position.set(-3, 2, -4);
    cena.add(luzContraste);

    const construido = construirPersonagem();
    grupoPersonagem = construido.grupo;
    partes = construido.partes;
    cena.add(grupoPersonagem);

    configurarArraste(renderer.domElement);
    window.addEventListener('resize', redimensionar);
    animar();

    return true;
  }

  function atualizar(visual, opcoes) {
    if (!partes) {
      return;
    }

    const config = opcoes || {};
    ultimoVisual = visual;
    ultimaConfig = config;

    partes.matCabeca.color.set(visual.head || '#27312c');
    partes.matTronco.color.set(visual.torso || '#2f7d5a');
    partes.matPernas.color.set(visual.legs || '#2e5e8c');
    partes.matAcessorio.color.set(visual.accent || '#c4782b');
    partes.matCapa.color.set(visual.accent || '#c4782b');

    // Cabeca: bone (boné, padrao) ou capuz -- trocam de geometria, nao so de cor.
    const estiloCabeca = config.estiloCabeca || 'nenhum';
    partes.chapeuMesh.visible = estiloCabeca !== 'capuz';
    partes.boneBrimMesh.visible = estiloCabeca === 'bone';
    partes.capuzGrupo.visible = estiloCabeca === 'capuz';

    // Tronco: cada estilo liga o grupo de detalhes correspondente (a camiseta
    // continua sempre em primitiva -- e' onde o decal secreto do Bruno e'
    // desenhado, entao ela precisa continuar uma superficie plana e previsivel).
    const estiloTronco = config.estiloTronco || 'camiseta';
    partes.jaquetaGrupo.visible = estiloTronco === 'jaqueta';
    partes.coleteGrupo.visible = estiloTronco === 'colete';
    partes.kimonoGrupo.visible = estiloTronco === 'kimono';

    const armaduraModeloUsavel = Boolean(config.overpowered) && partes.armaduraModelo.pronto;
    partes.armaduraGrupo.visible = Boolean(config.overpowered) && !armaduraModeloUsavel;
    partes.armaduraModelo.grupo.visible = armaduraModeloUsavel;

    // Pernas: nao achamos nenhum modelo de calca decente pra baixar (o unico
    // candidato encontrado era, na real, um carrinho de brinquedo) -- entao a
    // perna continua na geometria em primitivas de sempre. Tenis (padrao)
    // vira bota nos itens epicos de perna.
    const estiloPernas = config.estiloPernas || 'calca';
    partes.calcaEsportivaGrupo.visible = estiloPernas === 'calca-esportiva';

    const usaBota = estiloPernas === 'bota';
    const tenisModeloUsavel = !usaBota && partes.tenisModelo.pronto;
    const botaModeloUsavel = usaBota && partes.botaModelo.pronto;
    partes.tenisMeshes.forEach((mesh) => { mesh.visible = !usaBota && !tenisModeloUsavel; });
    partes.botaMeshes.forEach((mesh) => { mesh.visible = usaBota && !botaModeloUsavel; });
    partes.tenisModelo.grupo.visible = tenisModeloUsavel;
    partes.botaModelo.grupo.visible = botaModeloUsavel;

    // Acessorio: oculos de verdade (lente+ponte+haste) ou amuleto no peito.
    const estiloAcessorio = config.estiloAcessorio || 'nenhum';
    const oculosModeloUsavel = estiloAcessorio === 'oculos' && partes.oculosModelo.pronto;
    const amuletoModeloUsavel = estiloAcessorio === 'amuleto' && partes.amuletoModelo.pronto;
    partes.oculosGrupo.visible = estiloAcessorio === 'oculos' && !oculosModeloUsavel;
    partes.amuletoGrupo.visible = estiloAcessorio === 'amuleto' && !amuletoModeloUsavel;
    partes.oculosModelo.grupo.visible = oculosModeloUsavel;
    partes.amuletoModelo.grupo.visible = amuletoModeloUsavel;
    aplicarCor(partes.oculosModelo, visual.accent);
    aplicarCor(partes.amuletoModelo, visual.accent);

    partes.decalBrunoMesh.visible = Boolean(config.temSkinSecreta);

    // Aura: brilho esferico ou capa de verdade nas costas.
    const estiloAura = config.estiloAura || 'nenhum';
    const corAura = corRgbaParaComponentes(visual.aura);
    partes.auraMesh.visible = estiloAura === 'aura-brilho';
    partes.auraMesh.material.color.setRGB(corAura.r, corAura.g, corAura.b);
    partes.auraMesh.material.opacity = Math.min(0.4, corAura.a * 1.6);

    const capaModeloUsavel = estiloAura === 'capa' && partes.capaModelo.pronto;
    partes.capaMesh.visible = estiloAura === 'capa' && !capaModeloUsavel;
    partes.capaModelo.grupo.visible = capaModeloUsavel;
    aplicarCor(partes.capaModelo, visual.accent);

    const brilhoExtra = config.overpowered ? 0.35 : 0;
    [partes.matCabeca, partes.matTronco, partes.matPernas, partes.matAcessorio, partes.matArmadura].forEach((mat) => {
      mat.emissive = new window.THREE.Color(config.overpowered ? 0xf5b341 : 0x000000);
      mat.emissiveIntensity = brilhoExtra;
    });

    // Renderiza na hora, sem esperar o proximo tick do requestAnimationFrame:
    // navegadores pausam o rAF quando a aba fica em segundo plano, e sem isso
    // o boneco so mostraria a roupa nova quando a aba voltasse a ficar visivel.
    if (renderer && cena && camera) {
      renderer.render(cena, camera);
    }
  }

  function celebrar() {
    anguloAlvo += Math.PI * 2;
  }

  window.Avatar3D = { montar, atualizar, celebrar };
})();
