/* assets/js/item-preview-3d.js
 * Mostra os modelos 3D reais (glTF, baixados do Poly Pizza -- ver creditos no
 * rodape da pagina) girando dentro dos cards da loja e do inventario, no lugar
 * do cubo generico em CSS. Um card sem modelo cadastrado continua mostrando o
 * cubo normalmente (fallback), sem precisar de nenhuma mudanca no HTML dele.
 *
 * Cada card CLONA o modelo (o download/parse do glTF em si acontece so' uma
 * vez por modelo, cacheado) e pinta o clone com a cor do proprio item
 * (data-model-color) -- os modelos baixados vem com as cores/estampa
 * originais deles (ex.: a camiseta e' uma camisa de time em varias cores),
 * entao sem essa repintura cada card ficaria com uma cor diferente e sem
 * relacao com o item, em vez de casar com o resto do visual do jogo.
 *
 * Tecnica de render: em vez de um <canvas>/WebGLRenderer por card (o
 * navegador tem um limite baixo de contextos WebGL simultaneos), existe UM
 * unico renderer, num canvas fixo cobrindo a tela inteira (pointer-events:
 * none, entao os cliques atravessam pros botoes reais). A cada frame, pra
 * cada card visivel, o renderer usa scissor+viewport pra desenhar so' dentro
 * do retangulo daquele card.
 */
(() => {
  if (typeof window === 'undefined' || typeof window.THREE === 'undefined' || !window.THREE.GLTFLoader) {
    return;
  }

  const THREE = window.THREE;

  const MODEL_URLS = {
    oculos: '../assets/models/oculos.glb',
    bone: '../assets/models/bone.glb',
    bota: '../assets/models/bota.glb',
    amuleto: '../assets/models/amuleto.glb',
    jaqueta: '../assets/models/jaqueta.glb',
    capa: '../assets/models/capa.glb',
    armadura: '../assets/models/armadura.glb',
    tenis: '../assets/models/tenis.glb',
    camiseta: '../assets/models/camiseta.glb',
  };

  const loader = new THREE.GLTFLoader();
  const cenaCruaCache = {};
  const entradaPorElemento = new WeakMap();
  const anguloPorElemento = new WeakMap();

  let renderer = null;
  let canvas = null;

  function garantirRenderer() {
    if (renderer) {
      return;
    }

    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '3';
    document.body.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // alpha:true so o contexto webgl aceita transparencia; a cor de limpeza
    // continua opaca por padrao ate setarmos alpha 0 aqui explicitamente --
    // sem isso o canvas cobre a pagina inteira com um retangulo preto solido.
    renderer.setClearColor(0x000000, 0);
    renderer.setScissorTest(true);
    redimensionar();
    window.addEventListener('resize', redimensionar);
  }

  function redimensionar() {
    if (!renderer) {
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight, true);
  }

  function carregarCru(chave) {
    if (!cenaCruaCache[chave]) {
      cenaCruaCache[chave] = new Promise((resolve, reject) => {
        loader.load(MODEL_URLS[chave], (gltf) => resolve(gltf.scene), undefined, reject);
      });
    }
    return cenaCruaCache[chave];
  }

  // Clona o modelo original (so' clona -- o fetch/parse ja aconteceu e fica
  // em cache), tira qualquer textura/estampa original e devolve os
  // materiais clonados pra poder pintar cada card com a cor do proprio item.
  function clonarSemTextura(original) {
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
    clone.scale.setScalar(1.5 / maiorLado);

    const caixaDepois = new THREE.Box3().setFromObject(clone);
    const centro = new THREE.Vector3();
    caixaDepois.getCenter(centro);
    clone.position.sub(centro);

    return { clone, materiais };
  }

  function criarEntrada(elemento, chave) {
    const cena = new THREE.Scene();
    cena.add(new THREE.AmbientLight(0xffffff, 0.95));
    const luz = new THREE.DirectionalLight(0xffffff, 0.8);
    luz.position.set(2, 3, 4);
    cena.add(luz);
    const luzVerde = new THREE.DirectionalLight(0x3fe08c, 0.35);
    luzVerde.position.set(-2, 1, -3);
    cena.add(luzVerde);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.12, 3.1);
    camera.lookAt(0, 0, 0);

    const grupo = new THREE.Group();
    cena.add(grupo);

    const entrada = { cena, camera, grupo, materiais: [], pronto: false };
    entradaPorElemento.set(elemento, entrada);

    carregarCru(chave).then((original) => {
      const { clone, materiais } = clonarSemTextura(original);
      grupo.add(clone);
      entrada.materiais = materiais;
      const cor = elemento.dataset.modelColor;
      if (cor) {
        materiais.forEach((mat) => mat.color.set(cor));
      }
      entrada.pronto = true;
    }).catch((erro) => {
      // Falha de rede/CDN: o card correspondente so' fica sem preview 3D
      // (nao quebra o resto da pagina).
      console.warn('Preview 3D: falha ao carregar modelo', chave, erro);
    });

    return entrada;
  }

  function retanguloDoCard(elemento) {
    const rect = elemento.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
      return null;
    }

    const dpr = renderer.getPixelRatio();
    const x = rect.left * dpr;
    const larguraPx = rect.width * dpr;
    const alturaPx = rect.height * dpr;
    const yTopo = rect.top * dpr;
    const alturaCanvas = window.innerHeight * dpr;
    const y = alturaCanvas - yTopo - alturaPx; // origem do viewport WebGL e' embaixo-esquerda

    return { x, y, w: larguraPx, h: alturaPx };
  }

  function limparTela() {
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, canvas.width, canvas.height);
    renderer.clear();
    renderer.setScissorTest(true);
  }

  function animar() {
    requestAnimationFrame(animar);

    const nos = document.querySelectorAll('[data-model-preview]');
    if (!nos.length) {
      return;
    }

    garantirRenderer();
    limparTela();

    nos.forEach((elemento) => {
      const chave = elemento.dataset.modelPreview;
      if (!MODEL_URLS[chave]) {
        return;
      }

      let entrada = entradaPorElemento.get(elemento);
      if (!entrada) {
        entrada = criarEntrada(elemento, chave);
      }
      if (!entrada.pronto) {
        return;
      }

      const retangulo = retanguloDoCard(elemento);
      if (!retangulo || retangulo.w <= 0 || retangulo.h <= 0) {
        return;
      }

      const anguloAtual = (anguloPorElemento.get(elemento) || 0) + 0.012;
      anguloPorElemento.set(elemento, anguloAtual);
      entrada.grupo.rotation.y = anguloAtual;
      entrada.grupo.rotation.x = -0.12;

      entrada.camera.aspect = retangulo.w / retangulo.h;
      entrada.camera.updateProjectionMatrix();

      renderer.setScissor(retangulo.x, retangulo.y, retangulo.w, retangulo.h);
      renderer.setViewport(retangulo.x, retangulo.y, retangulo.w, retangulo.h);
      renderer.render(entrada.cena, entrada.camera);
    });
  }

  animar();
})();
