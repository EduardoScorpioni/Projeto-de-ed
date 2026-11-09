'use strict';
/* =====================================================================
 * CAMADA 3 — RENDERIZADOR + PLAYER + CONTROLES
 * Usa apenas a API pública do motor (window.MotorArvore). Todo o estado
 * da interface vive em memória (sem localStorage/sessionStorage).
 * ===================================================================== */
(function () {
  const M = window.MotorArvore;
  const $ = (id) => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const reduzirMovimento = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===================================================================
   * 1. ÁRVORE GENÉRICA (só conceito): abas que destacam partes do SVG
   * =================================================================== */
  (function arvoreGenerica() {
    const nos = {}; ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach((l) => { nos[l] = $('n' + l); });
    const arestas = ['eAB', 'eAC', 'eAE', 'eBD', 'eBF', 'eCG'].map($);
    const bandas = Array.from(document.querySelectorAll('.g-banda'));
    const rotulos = Array.from(document.querySelectorAll('.g-rotulo'));
    const colchete = Array.from(document.querySelectorAll('.g-colchete, .g-texto-colchete'));
    const filhosDe = { A: ['B', 'C', 'E'], B: ['D', 'F'], C: ['G'], D: [], E: [], F: [], G: [] };
    const paiDe = { B: 'A', C: 'A', E: 'A', D: 'B', F: 'B', G: 'C' };
    const nivelDe = { A: 1, B: 2, C: 2, E: 2, D: 3, F: 3, G: 3 };
    const aresta = (p, f) => $('e' + p + f);
    let selecionado = 'B';
    let foco = 'raiz';

    const textos = {
      raiz: 'A raiz é o nó de partida da árvore: não tem pai, e todas as demais ligações nascem a partir dela. Aqui, é o A.',
      ramos: 'Os ramos são as ligações entre um nó pai e cada um dos seus filhos. É por eles que se desce da raiz até qualquer outro nó.',
      folhas: 'Folhas são nós sem nenhum filho, as pontas da árvore (também chamadas nós terminais). Aqui: D, F, G e E.',
      niveis: 'Os níveis medem a profundidade: a raiz fica no nível 1, os filhos dela no nível 2 e os netos no nível 3.',
      altura: 'A altura é o número de níveis da árvore. Esta tem 3 níveis, então sua altura é 3 (árvore vazia: 0; só a raiz: 1).'
    };

    function limpar() {
      Object.values(nos).forEach((g) => { g.setAttribute('class', 'g-no'); g.removeAttribute('tabindex'); g.removeAttribute('role'); g.removeAttribute('aria-label'); });
      arestas.forEach((e) => e.setAttribute('class', 'g-aresta'));
      bandas.forEach((b) => b.setAttribute('class', 'g-banda'));
      rotulos.forEach((b) => b.setAttribute('class', 'g-rotulo'));
      colchete.forEach((b) => b.setAttribute('class', b.getAttribute('class').split(' ')[0]));
    }
    const add = (el, c) => el.setAttribute('class', el.getAttribute('class') + ' ' + c);

    function familia() {
      const pai = paiDe[selecionado];
      const filhos = filhosDe[selecionado];
      const irmaos = pai ? filhosDe[pai].filter((l) => l !== selecionado) : [];
      Object.keys(nos).forEach((l) => {
        const g = nos[l]; add(g, 'clicavel'); g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button');
        g.setAttribute('aria-label', 'Escolher o nó ' + l);
        if (l === selecionado) add(g, 'sel');
        else if (l === pai) add(g, 'pai');
        else if (filhos.includes(l)) add(g, 'filho');
        else if (irmaos.includes(l)) add(g, 'irmao');
        else add(g, 'suave');
      });
      arestas.forEach((e) => add(e, 'suave'));
      if (pai) { const e = aresta(pai, selecionado); e.setAttribute('class', 'g-aresta dest'); }
      filhos.forEach((f) => aresta(selecionado, f).setAttribute('class', 'g-aresta dest'));
      const lista = (a) => (a.length ? a.join(', ') : 'nenhum');
      $('gTexto').innerHTML = 'Quem aponta para outros nós é <strong>pai</strong> deles; os apontados são seus <strong>filhos</strong>, e filhos do mesmo pai são <strong>irmãos</strong>. ' +
        'Toque num nó para ver as relações. <br><strong>' + selecionado + '</strong>: pai = ' + (pai || 'nenhum (é a raiz)') +
        '; filhos = ' + lista(filhos) + '; irmãos = ' + lista(irmaos) + '.';
    }

    function aplicar(nome) {
      foco = nome; limpar();
      document.querySelectorAll('#gAbas button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.foco === nome)));
      if (nome === 'familia') { familia(); return; }
      $('gTexto').textContent = textos[nome];
      if (nome === 'raiz') { Object.keys(nos).forEach((l) => add(nos[l], l === 'A' ? 'dest' : 'suave')); arestas.forEach((e) => add(e, 'suave')); }
      if (nome === 'ramos') { arestas.forEach((e) => add(e, 'dest')); Object.values(nos).forEach((g) => add(g, 'suave')); }
      if (nome === 'folhas') { Object.keys(nos).forEach((l) => add(nos[l], filhosDe[l].length ? 'suave' : 'dest')); arestas.forEach((e) => add(e, 'suave')); }
      if (nome === 'niveis' || nome === 'altura') {
        bandas.forEach((b) => add(b, 'dest')); rotulos.forEach((b) => add(b, 'dest'));
        Object.keys(nos).forEach((l) => add(nos[l], 'n' + nivelDe[l]));
      }
      if (nome === 'altura') colchete.forEach((b) => add(b, 'dest'));
    }

    $('gAbas').addEventListener('click', (e) => { const b = e.target.closest('button[data-foco]'); if (b) aplicar(b.dataset.foco); });
    const escolher = (ev) => {
      const g = ev.target.closest('.g-no'); if (!g || foco !== 'familia') return;
      if (ev.type === 'keydown' && ev.key !== 'Enter' && ev.key !== ' ') return;
      ev.preventDefault(); selecionado = g.dataset.letra; familia();
    };
    $('gSvg').addEventListener('click', escolher);
    $('gSvg').addEventListener('keydown', escolher);
    aplicar('raiz');
  })();

  /* ===================================================================
   * 2. LAYOUT E GEOMETRIA (compartilhados pelo desenho animado e estático)
   *    x = índice em-ordem do nó; y = profundidade. Sem sobreposição por construção.
   * =================================================================== */
  const L = { DX: 56, DY: 78, R: 20, MX: 44, MTOP: 86, MBOT: 60, MINW: 360, MINH: 200 };

  function layout(raiz) {
    const pos = new Map(); let i = 0, prof = 0;
    (function visitar(n, d) {
      if (!n) return;
      visitar(n.esq, d + 1);
      pos.set(n.id, { x: i * L.DX, y: d * L.DY, no: n, d: d });
      i++; prof = Math.max(prof, d);
      visitar(n.dir, d + 1);
    })(raiz, 0);
    const largReal = i ? L.MX * 2 + (i - 1) * L.DX : 0;
    const largura = Math.max(L.MINW, largReal);
    const ox = i ? (largura - largReal) / 2 + L.MX : largura / 2;      // centraliza árvores pequenas
    pos.forEach((p) => { p.x += ox; p.y += L.MTOP; });
    const altura = i ? Math.max(L.MINH, L.MTOP + prof * L.DY + L.MBOT) : L.MINH;
    return { pos: pos, n: i, largura: largura, altura: altura, ox: ox };
  }

  // Seta de uma aresta pai -> filho. Devolve o segmento (já sem as pontas) e o triângulo da ponta.
  function geomAresta(px, py, cx, cy) {
    const dx = cx - px, dy = cy - py, d = Math.hypot(dx, dy);
    if (d < 2 * L.R + 12) return null;
    const ux = dx / d, uy = dy / d, nx = -uy, ny = ux;
    const sx = px + ux * L.R, sy = py + uy * L.R;                 // sai da borda do pai
    const tx = cx - ux * (L.R + 3), ty = cy - uy * (L.R + 3);     // ponta, antes da borda do filho
    const bx = tx - ux * 9, by = ty - uy * 9;                     // base da ponta
    return {
      x1: sx, y1: sy, x2: bx, y2: by, len: Math.hypot(bx - sx, by - sy),
      pts: tx + ',' + ty + ' ' + (bx + nx * 5) + ',' + (by + ny * 5) + ' ' + (bx - nx * 5) + ',' + (by - ny * 5)
    };
  }

  // Símbolo de "terra" (ponteiro nulo) sob o nó, no lado vazio. s = -1 (esq) ou +1 (dir).
  function caminhoChao(x, y, s) {
    const sx = x + s * L.R * 0.6, sy = y + L.R * 0.8, ex = x + s * 22, ey = y + L.R + 12;
    return 'M' + sx + ' ' + sy + ' L' + ex + ' ' + ey +
      ' M' + (ex - 9) + ' ' + ey + ' H' + (ex + 9) +
      ' M' + (ex - 6) + ' ' + (ey + 4) + ' H' + (ex + 6) +
      ' M' + (ex - 3) + ' ' + (ey + 8) + ' H' + (ex + 3);
  }

  const el = (nome, attrs, pai) => {
    const e = document.createElementNS(NS, nome);
    if (attrs) Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]));
    if (pai) pai.appendChild(e);
    return e;
  };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);   // easeInOutCubic
  const clamp01 = (t) => Math.max(0, Math.min(1, t));
  const lerp = (a, b, t) => a + (b - a) * t;

  function valorNoSnapshot(snap, id) {
    if (!snap) return null;
    if (snap.id === id) return snap.valor;
    const e = valorNoSnapshot(snap.esq, id);
    return e !== null ? e : valorNoSnapshot(snap.dir, id);
  }

  /* ===================================================================
   * 3. ESTADO DO SIMULADOR (linha do tempo de passos)
   * =================================================================== */
  let arvoreFim = M.arvoreVazia();   // árvore após TODAS as operações já geradas
  let linha = [];                    // [{ passo, opIdx }] — todos os passos, em ordem
  let historico = [];                // [{ tipo, valor, aceita, ini, fim }]
  let pos = 0;                       // 0 = árvore vazia inicial; k = mostrando o passo k-1
  let tocando = false;
  let velocidade = 1;
  let formato = 'slide';
  let destacarFolhas = false;
  let mensagemTemp = null;
  let presetAtivo = 'aula';
  let presetCarregado = null;        // id do preset cujas inserções estão carregadas
  let remocoesFeitas = false;
  let ajustar = true, zoom = 1;

  const PRESETS = {
    aula: { rotulo: 'Exemplo da aula', ins: [20, 27, 10, 51, 21, 7, 12], rem: [27] },
    '1a': { rotulo: '1a · Árvore 1', ins: [10, 17, 7, 9, 19, 11, 2], rem: [9, 2, 19] },
    '1b': { rotulo: '1b · Árvore 2', ins: [10, 12, 13, 11, 5, 7, 6, 8, -5, -8, -11, 4, -9, -12, 2, -3, 3], rem: [4, -3, 12, 13, 11, 2, 3] },
    '1c': { rotulo: '1c · Árvore 3', ins: [12, 51, -7, 21, 70, 18, 24, 69, 72, 7, 10, -5, -12, -10, -24], rem: [69, 72, 70, 51, -24, -10] }
  };

  const snapshotEm = (p) => (p === 0 ? null : linha[p - 1].passo.snapshot || null);

  /* ===================================================================
   * 4. RENDERIZADOR ANIMADO (entidades por id, interpolação por quadro)
   * =================================================================== */
  const svg = $('svgArvore');
  const gNos = $('gNos'), gAresta = $('gAresta'), gChao = $('gChao');
  const gRaizRot = $('gRaizRot'), gCursor = $('gCursor'), gVazio = $('gVazio');
  const cursorTexto = gCursor.querySelector('text');

  // monta o símbolo "Raiz → nulo" da árvore vazia
  (function montarVazio() {
    const t = gVazio.querySelector('text'); t.setAttribute('y', '-48');
    el('line', { x1: 0, y1: -40, x2: 0, y2: -26, stroke: '#2b2b2b', 'stroke-width': 2.5 }, gVazio);
    el('polygon', { points: '0,-16 -5,-27 5,-27', fill: '#2b2b2b' }, gVazio);
    const c = el('g', { class: 'chao neutro' }, gVazio);
    el('path', { d: 'M-12 -8 H12 M-8 -4 H8 M-4 0 H4' }, c);
    el('text', { class: 'vazio-texto', x: 0, y: 26 }, gVazio).textContent = 'nulo';
    gVazio.setAttribute('transform', 'translate(180 150)');
  })();

  const vis = {
    nos: new Map(), arestas: new Map(), chao: new Map(),
    vb: { a: { w: L.MINW, h: L.MINH }, b: { w: L.MINW, h: L.MINH }, c: { w: L.MINW, h: L.MINH } },
    raiz: { a: { x: 180, y: 150, op: 0 }, b: { x: 180, y: 150, op: 0 }, c: { x: 180, y: 150, op: 0 } },
    vazio: { a: { op: 1, x: 180 }, b: { op: 1, x: 180 }, c: { op: 1, x: 180 } },
    cursor: { a: { x: 0, y: 0, op: 0 }, b: { x: 0, y: 0, op: 0 }, c: { x: 0, y: 0, op: 0 } }
  };
  let anim = null;       // { t0, dur }
  let proximoEm = 0;     // instante do próximo passo automático
  let rodando = false;

  function criarNo(id, no) {
    const g = el('g', { class: 'no' }, gNos);
    el('circle', { r: L.R }, g);
    el('text', null, g);
    return { el: g, id: id, a: null, b: null, c: null, saindo: false, novo: false, valor: no.valor };
  }
  function criarAresta(chave, info) {
    const g = el('g', { class: 'aresta ' + info.lado }, gAresta);
    const linha_ = el('line', null, g), seta = el('polygon', null, g);
    return { el: g, linha: linha_, seta: seta, chave: chave, pai: info.pai, filho: info.filho, lado: info.lado, a: null, b: null, c: null, saindo: false, novo: false };
  }
  function criarChao(chave, info) {
    const g = el('g', { class: 'chao ' + info.lado }, gChao);
    const p = el('path', null, g);
    return { el: g, path: p, chave: chave, no: info.no, lado: info.lado, a: null, b: null, c: null, saindo: false, novo: false };
  }

  // Classes de destaque de cada nó no passo atual
  function estadosDoPasso(p, snap) {
    const est = new Map();
    const marca = (id, c) => { if (id === null || id === undefined) return; if (!est.has(id)) est.set(id, []); est.get(id).push(c); };
    if (p > 0) {
      const item = linha[p - 1], passo = item.passo;
      for (let i = p - 2; i >= 0 && linha[i].opIdx === item.opIdx; i--) {
        if (linha[i].passo.tipo === 'comparar') marca(linha[i].passo.idDoNoComparado, 'visitado');
      }
      switch (passo.tipo) {
        case 'comparar': marca(passo.idDoNoComparado, 'comparado'); marca(passo.idSucessor, 'sucessor'); break;
        case 'inserir': marca(passo.idNovo, 'novo'); break;
        case 'marcarRemocao': marca(passo.idRemovido, 'marcado'); marca(passo.idPromovido, 'sucessor'); break;
        case 'substituir': marca(passo.idSucessor, 'sucessor'); break;
        case 'removerFolha': break;
        case 'promoverFilho': marca(passo.idPromovido, 'sucessor'); break;
        case 'aviso': marca(passo.idDoNoComparado, 'aviso'); break;
        default: break;
      }
    }
    if (destacarFolhas && snap) {
      (function f(n) { if (!n) return; if (!n.esq && !n.dir && !n.fantasma) marca(n.id, 'folhaDest'); f(n.esq); f(n.dir); })(snap);
    }
    return est;
  }

  // Define o alvo da transição (frame `pos` atual) a partir do snapshot do passo
  function prepararTransicao() {
    const snap = snapshotEm(pos);
    const lay = layout(snap);
    const est = estadosDoPasso(pos, snap);
    const item = pos > 0 ? linha[pos - 1] : null;

    // viewBox
    vis.vb.a = { w: vis.vb.c.w, h: vis.vb.c.h };
    vis.vb.b = { w: lay.largura, h: lay.altura };

    // nós
    vis.nos.forEach((n) => { n.a = Object.assign({}, n.c); n.saindo = !lay.pos.has(n.id); if (n.saindo) n.b = Object.assign({}, n.c, { op: 0 }); });
    lay.pos.forEach((p, id) => {
      let n = vis.nos.get(id);
      if (!n) {
        n = criarNo(id, p.no); n.a = { x: p.x, y: p.y, op: 0, sc: 0 }; n.c = Object.assign({}, n.a); n.novo = true; vis.nos.set(id, n);
      } else n.novo = false;
      n.saindo = false; n.valor = p.no.valor;
      n.b = { x: p.x, y: p.y, op: 1, sc: 1 };
      n.el.querySelector('text').textContent = p.no.valor;
      const cl = ['no'].concat(est.get(id) || []); if (p.no.fantasma) cl.push('fantasma');
      n.el.setAttribute('class', cl.join(' '));
    });
    vis.nos.forEach((n) => { if (n.saindo) n.el.setAttribute('class', 'no marcado'); });

    // arestas
    const alvoA = new Map();
    lay.pos.forEach((p, id) => {
      if (p.no.esq) alvoA.set(id + '>' + p.no.esq.id, { pai: id, filho: p.no.esq.id, lado: 'esq' });
      if (p.no.dir) alvoA.set(id + '>' + p.no.dir.id, { pai: id, filho: p.no.dir.id, lado: 'dir' });
    });
    vis.arestas.forEach((e, k) => { e.a = Object.assign({}, e.c); if (!alvoA.has(k)) { e.saindo = true; e.b = { pr: e.c.pr, op: 0 }; } });
    alvoA.forEach((info, k) => {
      let e = vis.arestas.get(k);
      if (!e) { e = criarAresta(k, info); e.a = { pr: 0, op: 1 }; e.c = Object.assign({}, e.a); e.novo = true; vis.arestas.set(k, e); } else e.novo = false;
      e.saindo = false; e.b = { pr: 1, op: 1 };
    });

    // ponteiros nulos
    const alvoC = new Map();
    lay.pos.forEach((p, id) => {
      if (!p.no.esq) alvoC.set(id + ':esq', { no: id, lado: 'esq' });
      if (!p.no.dir) alvoC.set(id + ':dir', { no: id, lado: 'dir' });
    });
    vis.chao.forEach((c, k) => { c.a = Object.assign({}, c.c); if (!alvoC.has(k)) { c.saindo = true; c.b = { op: 0 }; } });
    alvoC.forEach((info, k) => {
      let c = vis.chao.get(k);
      if (!c) { c = criarChao(k, info); c.a = { op: 0 }; c.c = { op: 0 }; c.novo = true; vis.chao.set(k, c); } else c.novo = false;
      c.saindo = false; c.b = { op: 1 };
    });

    // rótulo "Raiz" e símbolo da árvore vazia
    const raizPos = snap ? lay.pos.get(snap.id) : null;
    vis.raiz.a = Object.assign({}, vis.raiz.c);
    vis.raiz.b = raizPos ? { x: raizPos.x, y: raizPos.y, op: 1 } : { x: vis.raiz.c.x, y: vis.raiz.c.y, op: 0 };
    if (raizPos && vis.raiz.a.op === 0) vis.raiz.a = { x: raizPos.x, y: raizPos.y, op: 0 };
    vis.vazio.a = Object.assign({}, vis.vazio.c);
    vis.vazio.b = { op: snap ? 0 : 1, x: lay.largura / 2 };
    vis.vazio.a.x = vis.vazio.b.x;

    // cursor: percorre o caminho de comparação
    vis.cursor.a = Object.assign({}, vis.cursor.c);
    const passo = item ? item.passo : null;
    const alvoCursor = passo && (passo.tipo === 'comparar' || (passo.tipo === 'aviso' && passo.idDoNoComparado !== null)) && lay.pos.get(passo.idDoNoComparado);
    if (alvoCursor) {
      const v = historico[item.opIdx].valor, nv = alvoCursor.no.valor;
      cursorTexto.textContent = passo.tipo === 'aviso' ? v + ' = ' + nv : v + (v < nv ? ' < ' : v > nv ? ' > ' : ' = ') + nv;
      vis.cursor.b = { x: alvoCursor.x, y: alvoCursor.y, op: 1 };
      if (vis.cursor.a.op === 0) vis.cursor.a = { x: alvoCursor.x, y: alvoCursor.y, op: 0 };
    } else {
      vis.cursor.b = { x: vis.cursor.c.x, y: vis.cursor.c.y, op: 0 };
    }

    svg.setAttribute('aria-label', 'Árvore binária: ' + (snap ? M.aninhada(snap, formato) : 'vazia (raiz aponta para nulo)'));
  }

  // Desenha o quadro `t` (0..1) da transição atual
  function desenharFrame(t) {
    const te = ease(t);
    const lerpObj = (o, tt) => { const r = {}; Object.keys(o.b).forEach((k) => { r[k] = lerp(o.a[k], o.b[k], tt); }); return r; };

    vis.vb.c = { w: lerp(vis.vb.a.w, vis.vb.b.w, te), h: lerp(vis.vb.a.h, vis.vb.b.h, te) };
    aplicarZoom();

    vis.nos.forEach((n) => {
      const tt = n.novo ? ease(clamp01((t - 0.35) / 0.65)) : te;
      n.c = lerpObj(n, tt);
      n.el.setAttribute('transform', 'translate(' + n.c.x + ' ' + n.c.y + ') scale(' + Math.max(0.001, n.c.sc) + ')');
      n.el.setAttribute('opacity', n.c.op);
    });
    vis.arestas.forEach((e) => {
      const tt = e.novo ? ease(clamp01(t / 0.7)) : te;
      e.c = lerpObj(e, tt);
      const pn = vis.nos.get(e.pai), fn = vis.nos.get(e.filho);
      const g = pn && fn && geomAresta(pn.c.x, pn.c.y, fn.c.x, fn.c.y);
      if (!g) { e.el.setAttribute('opacity', 0); return; }
      e.linha.setAttribute('x1', g.x1); e.linha.setAttribute('y1', g.y1); e.linha.setAttribute('x2', g.x2); e.linha.setAttribute('y2', g.y2);
      e.linha.setAttribute('stroke-dasharray', g.len); e.linha.setAttribute('stroke-dashoffset', g.len * (1 - e.c.pr));
      e.seta.setAttribute('points', g.pts);
      e.seta.setAttribute('opacity', clamp01((e.c.pr - 0.85) / 0.15));
      e.el.setAttribute('opacity', e.c.op);
    });
    vis.chao.forEach((c) => {
      const tt = c.novo ? ease(clamp01((t - 0.3) / 0.7)) : te;
      c.c = lerpObj(c, tt);
      const nn = vis.nos.get(c.no);
      if (nn) c.path.setAttribute('d', caminhoChao(nn.c.x, nn.c.y, c.lado === 'esq' ? -1 : 1));
      c.el.setAttribute('opacity', c.c.op * (nn ? Math.min(1, nn.c.op * 1.2) : 0));
    });
    vis.raiz.c = lerpObj(vis.raiz, te);
    gRaizRot.setAttribute('transform', 'translate(' + vis.raiz.c.x + ' ' + vis.raiz.c.y + ')');
    gRaizRot.setAttribute('opacity', vis.raiz.c.op);
    vis.vazio.c = lerpObj(vis.vazio, te);
    gVazio.setAttribute('transform', 'translate(' + vis.vazio.c.x + ' 150)');
    gVazio.setAttribute('opacity', vis.vazio.c.op);
    vis.cursor.c = lerpObj(vis.cursor, te);
    gCursor.setAttribute('transform', 'translate(' + vis.cursor.c.x + ' ' + vis.cursor.c.y + ')');
    gCursor.setAttribute('opacity', vis.cursor.c.op);
  }

  // Remove do DOM tudo o que já saiu de cena
  function finalizarAnim() {
    [vis.nos, vis.arestas, vis.chao].forEach((mapa) => {
      Array.from(mapa.keys()).forEach((k) => { const e = mapa.get(k); if (e.saindo) { e.el.remove(); mapa.delete(k); } });
    });
  }

  function concluirAnim() {
    if (!anim) return;
    desenharFrame(1); finalizarAnim(); anim = null;
  }

  function aplicarZoom() {
    const w = vis.vb.c.w, h = vis.vb.c.h;
    if (ajustar) zoom = Math.max(0.35, Math.min(1, ($('palco').clientWidth - 4) / w));
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = (w * zoom) + 'px';
    svg.style.height = (h * zoom) + 'px';
    $('zInfo').textContent = Math.round(zoom * 100) + '%';
  }

  /* ---------- laço de animação / player ---------- */
  function acordar() { if (!rodando) { rodando = true; requestAnimationFrame(tick); } }
  function tick(ts) {
    if (anim) {
      const t = anim.dur <= 0 ? 1 : clamp01((ts - anim.t0) / anim.dur);
      desenharFrame(t);
      if (t >= 1) { finalizarAnim(); anim = null; agendarProximo(ts); }
    } else if (tocando && proximoEm && ts >= proximoEm) {
      proximoEm = 0;
      if (pos < linha.length) ir(pos + 1); else { tocando = false; atualizarControles(); }
    }
    if (anim || (tocando && proximoEm)) requestAnimationFrame(tick); else rodando = false;
  }
  function agendarProximo(ts) {
    if (!tocando) return;
    if (pos >= linha.length) { tocando = false; proximoEm = 0; atualizarControles(); return; }
    proximoEm = (ts || performance.now()) + 520 / velocidade;
    acordar();
  }

  // Vai para o passo `novo`, animando a transição a partir do que está na tela
  function ir(novo, opcoes) {
    opcoes = opcoes || {};
    concluirAnim();
    novo = Math.max(0, Math.min(linha.length, novo));
    const salto = Math.abs(novo - pos);
    pos = novo; proximoEm = 0; mensagemTemp = null;
    prepararTransicao();
    const dur = (opcoes.instantaneo || reduzirMovimento()) ? 0 : (salto === 1 ? 700 : 380) / velocidade;
    if (dur === 0) { desenharFrame(1); finalizarAnim(); anim = null; agendarProximo(performance.now()); }
    else { anim = { t0: performance.now(), dur: dur }; acordar(); }
    atualizarPaineis(); atualizarControles();
  }

  /* ===================================================================
   * 5. OPERAÇÕES (motor -> passos -> linha do tempo)
   * =================================================================== */
  function adicionarOperacao(tipo, valor) {
    const r = tipo === 'inserir' ? M.inserir(arvoreFim, valor) : M.remover(arvoreFim, valor);
    const ini = linha.length, opIdx = historico.length;
    r.passos.forEach((p) => linha.push({ passo: p, opIdx: opIdx }));
    historico.push({ tipo: tipo, valor: valor, aceita: r.aceita, ini: ini, fim: linha.length });
    arvoreFim = r.arvore;
    return ini;
  }

  function lerValor() {
    const bruto = $('campoValor').value.trim();
    if (!/^-?\d+$/.test(bruto)) return null;
    const n = Number(bruto);
    return Number.isSafeInteger(n) ? n : null;
  }

  function operar(tipo) {
    const v = lerValor();
    if (v === null) {
      mensagemTemp = 'Digite um número inteiro no campo Valor (negativos são aceitos).';
      atualizarPaineis(); $('campoValor').focus(); return;
    }
    concluirAnim();
    if (pos !== linha.length) ir(linha.length, { instantaneo: true });
    const ini = adicionarOperacao(tipo, v);
    presetCarregado = null;
    tocando = true;
    ir(ini + 1);
    $('campoValor').select();
  }

  function limpar() {
    concluirAnim();
    arvoreFim = M.arvoreVazia(); linha = []; historico = [];
    presetCarregado = null; remocoesFeitas = false; tocando = false; mensagemTemp = null;
    ir(0);
  }

  function carregarInsercoes() {
    const p = PRESETS[presetAtivo], passoAPasso = modoPreset() === 'passo';
    concluirAnim();
    arvoreFim = M.arvoreVazia(); linha = []; historico = [];       // todo preset parte da árvore vazia
    p.ins.forEach((v) => adicionarOperacao('inserir', v));
    presetCarregado = presetAtivo; remocoesFeitas = false;
    pos = Math.min(pos, 0);
    if (passoAPasso) { tocando = false; ir(0); } else { tocando = true; ir(1); }
  }

  function executarRemocoes() {
    if (presetCarregado !== presetAtivo || remocoesFeitas) return;
    const p = PRESETS[presetAtivo], passoAPasso = modoPreset() === 'passo';
    concluirAnim();
    p.rem.forEach((v) => adicionarOperacao('remover', v));
    remocoesFeitas = true;
    if (passoAPasso) { tocando = false; atualizarPaineis(); atualizarControles(); }
    else { tocando = true; if (pos < linha.length) ir(pos + 1); }
  }

  const modoPreset = () => document.querySelector('input[name=modoPreset]:checked').value;

  /* ===================================================================
   * 6. PAINÉIS AO VIVO E CONTROLES
   * =================================================================== */
  function atualizarPaineis() {
    const snap = snapshotEm(pos);
    const item = pos > 0 ? linha[pos - 1] : null;

    // legenda do passo
    const leg = $('legenda');
    if (mensagemTemp) { leg.className = 'legenda aviso'; leg.textContent = mensagemTemp; }
    else if (!item) { leg.className = 'legenda'; leg.textContent = 'Árvore vazia: a raiz aponta para nulo. Insira um valor ou carregue um exemplo.'; }
    else {
      const h = historico[item.opIdx];
      const nPassos = h.fim - h.ini, k = pos - h.ini;
      leg.className = 'legenda' + (item.passo.tipo === 'aviso' ? ' aviso' : '');
      leg.innerHTML = '<small></small><span></span>';
      leg.querySelector('small').textContent = (h.tipo === 'inserir' ? 'Inserir ' : 'Remover ') + h.valor + ' · passo ' + k + ' de ' + nPassos;
      leg.querySelector('span').textContent = item.passo.legenda;
    }

    // folhas, altura, aninhada
    const folhas = M.folhas(snap);
    $('chipsFolhas').innerHTML = folhas.length ? folhas.map((v) => '<span class="chip">' + v + '</span>').join('') : '<span class="nota">nenhuma (árvore vazia)</span>';
    $('alturaNum').textContent = M.altura(snap);
    $('aninhadaSaida').textContent = M.aninhada(snap, formato);
    const ambiguo = formato === 'slide' && temNoComUmFilho(snap);
    $('avisoAmbiguo').classList.toggle('ativo', ambiguo);

    // histórico
    const ul = $('historico');
    ul.innerHTML = '';
    const atual = item ? item.opIdx : -1;
    historico.forEach((h, i) => {
      const li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; if (i === atual) b.setAttribute('aria-current', 'true');
      b.innerHTML = '<span class="n"></span><span></span>';
      b.children[0].textContent = (i + 1) + '.';
      b.children[1].textContent = (h.tipo === 'inserir' ? 'Inserir ' : 'Remover ') + h.valor + (h.aceita ? '' : '  (recusado)');
      b.addEventListener('click', () => { tocando = false; ir(h.ini + 1); });
      li.appendChild(b); ul.appendChild(li);
    });
    $('historicoVazio').hidden = historico.length > 0;
    const ativo = ul.querySelector('[aria-current]');
    if (ativo) ativo.scrollIntoView({ block: 'nearest' });
  }

  function temNoComUmFilho(n) {
    if (!n) return false;
    if ((!n.esq) !== (!n.dir)) return true;
    return temNoComUmFilho(n.esq) || temNoComUmFilho(n.dir);
  }

  function atualizarControles() {
    const n = linha.length;
    $('btnAnterior').disabled = pos <= 0;
    $('btnProximo').disabled = pos >= n;
    $('btnFim').disabled = pos >= n;
    $('btnPlay').disabled = n === 0;
    $('btnPlay').textContent = tocando ? '⏸ Pausar' : '▶ Play';
    const barra = $('barraProgresso');
    barra.max = n; barra.value = pos; barra.disabled = n === 0;
    $('estadoPasso').textContent = 'Passo ' + pos + ' de ' + n;
    $('btnCarregar').disabled = false;
    $('btnExecRem').disabled = !(presetCarregado === presetAtivo && !remocoesFeitas);
    $('btnExecRem').title = $('btnExecRem').disabled ? 'Carregue as inserções do exemplo primeiro (e as remoções só rodam uma vez por carga).' : '';
  }

  function tocarOuPausar() {
    if (tocando) { tocando = false; proximoEm = 0; atualizarControles(); return; }
    if (linha.length === 0) return;
    tocando = true;
    if (pos >= linha.length) {                    // no fim: repete a última operação
      const h = historico[historico.length - 1]; ir(h.ini + 1);
    } else if (!anim) ir(pos + 1);
    else { agendarProximo(performance.now()); }
    atualizarControles();
  }

  // ---- eventos ----
  $('btnInserir').addEventListener('click', () => operar('inserir'));
  $('btnRemover').addEventListener('click', () => operar('remover'));
  $('btnLimpar').addEventListener('click', limpar);
  $('campoValor').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); operar('inserir'); } });
  $('btnAnterior').addEventListener('click', () => { tocando = false; ir(pos - 1); });
  $('btnProximo').addEventListener('click', () => { tocando = false; ir(pos + 1); });
  $('btnFim').addEventListener('click', () => { tocando = false; ir(linha.length, { instantaneo: false }); });
  $('btnPlay').addEventListener('click', tocarOuPausar);
  $('selVelocidade').addEventListener('change', (e) => { velocidade = Number(e.target.value); });
  $('barraProgresso').addEventListener('input', (e) => { tocando = false; ir(Number(e.target.value)); });
  $('btnDestacar').addEventListener('click', () => {
    destacarFolhas = !destacarFolhas; $('btnDestacar').setAttribute('aria-pressed', String(destacarFolhas));
    concluirAnim(); prepararTransicao(); desenharFrame(1); finalizarAnim();
  });
  $('btnCarregar').addEventListener('click', carregarInsercoes);
  $('btnExecRem').addEventListener('click', executarRemocoes);
  function mudarFormato(v) {
    formato = v; $('selFormato').value = v; $('selFormatoMs').value = v;
    atualizarPaineis(); svg.setAttribute('aria-label', 'Árvore binária: ' + (snapshotEm(pos) ? M.aninhada(snapshotEm(pos), formato) : 'vazia'));
    gerarManuscrito();
  }
  $('selFormato').addEventListener('change', (e) => mudarFormato(e.target.value));
  $('selFormatoMs').addEventListener('change', (e) => mudarFormato(e.target.value));

  // zoom
  $('zMais').addEventListener('click', () => { ajustar = false; $('zAjustar').setAttribute('aria-pressed', 'false'); zoom = Math.min(2, zoom + 0.15); aplicarZoom(); });
  $('zMenos').addEventListener('click', () => { ajustar = false; $('zAjustar').setAttribute('aria-pressed', 'false'); zoom = Math.max(0.3, zoom - 0.15); aplicarZoom(); });
  $('zAjustar').addEventListener('click', () => { ajustar = !ajustar; $('zAjustar').setAttribute('aria-pressed', String(ajustar)); if (!ajustar) zoom = 1; aplicarZoom(); });
  window.addEventListener('resize', aplicarZoom);

  // presets
  (function montarPresets() {
    const cont = $('presets');
    Object.keys(PRESETS).forEach((id) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = PRESETS[id].rotulo; b.dataset.id = id;
      b.setAttribute('aria-pressed', String(id === presetAtivo));
      b.addEventListener('click', () => { presetAtivo = id; mostrarPreset(); atualizarControles(); });
      cont.appendChild(b);
    });
  })();
  function mostrarPreset() {
    document.querySelectorAll('#presets button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === presetAtivo)));
    const p = PRESETS[presetAtivo];
    $('presetInfo').innerHTML = '<div><strong>Inserir:</strong> <span class="mono"></span></div><div><strong>Remover:</strong> <span class="mono"></span></div>';
    $('presetInfo').querySelectorAll('.mono')[0].textContent = '[' + p.ins.join(', ') + ']';
    $('presetInfo').querySelectorAll('.mono')[1].textContent = '[' + p.rem.join(', ') + ']';
  }

  // abas Simulador / Manuscrito
  function abrirAba(qual) {
    const ms = qual === 'ms';
    $('painelSimulador').hidden = ms; $('painelManuscrito').hidden = !ms;
    $('abaSim').setAttribute('aria-selected', String(!ms)); $('abaMs').setAttribute('aria-selected', String(ms));
    if (ms) { tocando = false; atualizarControles(); } else { aplicarZoom(); }
  }
  $('abaSim').addEventListener('click', () => abrirAba('sim'));
  $('abaMs').addEventListener('click', () => abrirAba('ms'));

  /* ===================================================================
   * 7. MODO MANUSCRITO — snapshot estático de CADA operação
   * =================================================================== */
  function svgEstatico(snap) {
    const lay = layout(snap);
    const partes = [];
    lay.pos.forEach((p, id) => {
      [['esq', p.no.esq], ['dir', p.no.dir]].forEach((par) => {
        if (!par[1]) return;
        const f = lay.pos.get(par[1].id), g = geomAresta(p.x, p.y, f.x, f.y);
        if (g) partes.push('<g class="aresta ' + par[0] + '"><line x1="' + g.x1 + '" y1="' + g.y1 + '" x2="' + g.x2 + '" y2="' + g.y2 + '"/><polygon points="' + g.pts + '"/></g>');
      });
    });
    lay.pos.forEach((p) => {
      ['esq', 'dir'].forEach((l) => { if (!p.no[l]) partes.push('<g class="chao ' + l + '"><path d="' + caminhoChao(p.x, p.y, l === 'esq' ? -1 : 1) + '"/></g>'); });
    });
    lay.pos.forEach((p) => {
      partes.push('<g class="no' + (p.no.fantasma ? ' fantasma' : '') + '" transform="translate(' + p.x + ' ' + p.y + ')"><circle r="' + L.R + '"/><text>' + p.no.valor + '</text></g>');
    });
    if (snap) {
      const r = lay.pos.get(snap.id);
      partes.push('<g class="rotulo-raiz" transform="translate(' + r.x + ' ' + r.y + ')"><text x="0" y="-58">Raiz</text><line x1="0" y1="-50" x2="0" y2="-38"/><polygon points="0,-29 -5,-39 5,-39"/></g>');
    } else {
      partes.push('<g class="rotulo-raiz" transform="translate(' + lay.largura / 2 + ' 150)"><text x="0" y="-48">Raiz</text><line x1="0" y1="-40" x2="0" y2="-26"/><polygon points="0,-16 -5,-27 5,-27"/></g>' +
        '<g class="chao neutro" transform="translate(' + lay.largura / 2 + ' 150)"><path d="M-12 -8 H12 M-8 -4 H8 M-4 0 H4"/></g>' +
        '<text class="vazio-texto" x="' + lay.largura / 2 + '" y="176">nulo</text>');
    }
    return { html: '<svg viewBox="0 0 ' + lay.largura + ' ' + lay.altura + '" role="img" aria-label="Desenho da árvore: ' + esc(M.aninhada(snap, formato)) + '">' + partes.join('') + '</svg>', n: lay.n };
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function quadroHTML(rotulo, titulo, snap, extra) {
    const s = svgEstatico(snap);
    return '<figure class="quadro' + (s.n > 8 ? ' largo' : '') + '"><figcaption><b>' + rotulo + '</b> ' + esc(titulo) +
      (extra ? '<span class="cam">' + esc(extra) + '</span>' : '') + '</figcaption>' + s.html +
      '<div class="quadro-aninhada mono">' + esc(M.aninhada(snap, formato)) + '</div></figure>';
  }
  const listaTxt = (a) => (a.length ? a.join(', ') : '— (árvore vazia)');
  const resumoHTML = (titulo, snap, comAninhada) =>
    '<div class="resumo-ms"><p><strong>' + titulo + '</strong></p><p>Folhas: ' + esc(listaTxt(M.folhas(snap))) + '</p><p>Altura: ' + M.altura(snap) + '</p>' +
    (comAninhada ? '<p>Aninhada: <span class="mono">' + esc(M.aninhada(snap, formato)) + '</span></p>' : '') + '</div>';

  function blocoManuscrito(id) {
    const p = PRESETS[id];
    let arv = M.arvoreVazia(), n = 0;
    let html = '<section class="bloco-ms"><h3>' + esc(p.rotulo) + '</h3><h4>i. Inserções</h4><div class="grade-ms">';
    p.ins.forEach((v) => {
      const r = M.inserir(arv, v); arv = r.arvore; n++;
      const caminho = r.passos.filter((x) => x.tipo === 'comparar').map((x) => valorNoSnapshot(x.snapshot, x.idDoNoComparado));
      html += quadroHTML(n + '.', 'Inserir ' + v, arv.raiz, caminho.length ? 'Comparou com: ' + caminho.join(' → ') : 'Árvore vazia: vira a raiz.');
    });
    html += '</div>' + resumoHTML('ii, iii e iv · Ao fim das inserções', arv.raiz, true);
    html += '<h4>v. Remoções</h4><div class="grade-ms">';
    n = 0;
    p.rem.forEach((v) => {
      const r = M.remover(arv, v); arv = r.arvore; n++;
      const inter = r.passos.find((x) => x.tipo === 'substituir');
      if (inter) {
        html += quadroHTML(n + 'a.', 'Remover ' + v + ' · substituição', inter.snapshot, inter.legenda);
        html += quadroHTML(n + 'b.', 'Remover ' + v + ' · resultado', arv.raiz, r.passos[r.passos.length - 1].legenda);
      } else {
        html += quadroHTML(n + '.', 'Remover ' + v, arv.raiz, r.passos[r.passos.length - 1].legenda);
      }
    });
    html += '</div>' + resumoHTML('Ao fim das remoções', arv.raiz, true) + '</section>';
    return html;
  }

  function gerarManuscrito() {
    const q = $('selMs').value;
    const ids = q === 'lista1' ? ['1a', '1b', '1c'] : [q];
    $('saidaManuscrito').innerHTML = ids.map(blocoManuscrito).join('');
  }
  $('selMs').addEventListener('change', gerarManuscrito);
  $('btnImprimir').addEventListener('click', () => window.print());

  /* ===================================================================
   * 8. INICIALIZAÇÃO
   * =================================================================== */
  mostrarPreset();
  prepararTransicao();
  desenharFrame(1);
  atualizarPaineis();
  atualizarControles();
  gerarManuscrito();
})();
