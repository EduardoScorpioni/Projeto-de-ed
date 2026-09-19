/* assets/js/avatar3d.js
 * Avatar do personagem em 3D de verdade (Three.js), no lugar do sprite CSS antigo.
 * Personagem "voxel" simples (blocos), montado com geometrias primitivas —
 * sem precisar de nenhum arquivo de modelo 3D externo. Gira sozinho devagar e
 * pode ser arrastado (mouse ou toque) para girar manualmente.
 *
 * API exposta em window.Avatar3D, consumida por assets/js/gamificacao.js:
 *   Avatar3D.montar(containerEl)              -> cria a cena dentro do elemento
 *   Avatar3D.atualizar(visual, opcoes)        -> aplica as cores do item equipado
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
  let materiais = null;
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

  function construirPersonagem() {
    const THREE = window.THREE;
    const grupo = new THREE.Group();

    const matPele = new THREE.MeshStandardMaterial({ color: 0xe6b98f, roughness: 0.7 });
    const matCabeca = new THREE.MeshStandardMaterial({ color: 0x27312c, roughness: 0.6 });
    const matTronco = new THREE.MeshStandardMaterial({ color: 0x2f7d5a, roughness: 0.6 });
    const matPernas = new THREE.MeshStandardMaterial({ color: 0x2e5e8c, roughness: 0.6 });
    const matAcessorio = new THREE.MeshStandardMaterial({ color: 0xc4782b, roughness: 0.5 });
    const matEscuro = new THREE.MeshStandardMaterial({ color: 0x10231a, roughness: 0.8 });

    // Cabeca
    const cabeca = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), matPele);
    cabeca.position.y = 2.15;
    grupo.add(cabeca);

    // Chapeu / cabelo (item de slot "cabeca")
    const chapeu = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.42, 1.08), matCabeca);
    chapeu.position.y = 2.66;
    grupo.add(chapeu);

    // Olhos
    const olhoGeo = new THREE.BoxGeometry(0.12, 0.12, 0.06);
    const olhoEsq = new THREE.Mesh(olhoGeo, matEscuro);
    olhoEsq.position.set(-0.22, 2.15, 0.52);
    grupo.add(olhoEsq);
    const olhoDir = olhoEsq.clone();
    olhoDir.position.x = 0.22;
    grupo.add(olhoDir);

    // Tronco
    const tronco = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 0.7), matTronco);
    tronco.position.y = 1.05;
    grupo.add(tronco);

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

    // Pernas
    const pernaGeo = new THREE.BoxGeometry(0.5, 1.1, 0.5);
    const pernaEsq = new THREE.Mesh(pernaGeo, matPernas);
    pernaEsq.position.set(-0.35, -0.15, 0);
    grupo.add(pernaEsq);
    const pernaDir = pernaEsq.clone();
    pernaDir.position.x = 0.35;
    grupo.add(pernaDir);

    // Acessorio (oculos), escondido ate ter algo equipado no slot
    const acessorio = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.16), matAcessorio);
    acessorio.position.set(0, 2.16, 0.56);
    acessorio.visible = false;
    grupo.add(acessorio);

    // Aura (esfera translucida), escondida ate ter algo equipado no slot
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

    // Sombra simples no chao
    const sombra = new THREE.Mesh(
      new THREE.CircleGeometry(1.1, 24),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
    );
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = -0.72;
    grupo.add(sombra);

    return {
      grupo,
      materiais: {
        matPele,
        matCabeca,
        matTronco,
        matPernas,
        matAcessorio,
        acessorioMesh: acessorio,
        auraMesh: aura,
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
    materiais = construido.materiais;
    cena.add(grupoPersonagem);

    configurarArraste(renderer.domElement);
    window.addEventListener('resize', redimensionar);
    animar();

    return true;
  }

  function atualizar(visual, opcoes) {
    if (!materiais) {
      return;
    }

    const config = opcoes || {};

    materiais.matCabeca.color.set(visual.head || '#27312c');
    materiais.matTronco.color.set(visual.torso || '#2f7d5a');
    materiais.matPernas.color.set(visual.legs || '#2e5e8c');
    materiais.matAcessorio.color.set(visual.accent || '#c4782b');

    materiais.acessorioMesh.visible = Boolean(config.temAcessorio);

    const corAura = corRgbaParaComponentes(visual.aura);
    materiais.auraMesh.visible = Boolean(config.temAura);
    materiais.auraMesh.material.color.setRGB(corAura.r, corAura.g, corAura.b);
    materiais.auraMesh.material.opacity = Math.min(0.4, corAura.a * 1.6);

    const brilhoExtra = config.overpowered ? 0.35 : 0;
    [materiais.matCabeca, materiais.matTronco, materiais.matPernas, materiais.matAcessorio].forEach((mat) => {
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
