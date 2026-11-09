'use strict';
/* =====================================================================
 * CAMADAS 1 e 2 — MOTOR PURO + GERADOR DE PASSOS (sem DOM)
 *
 * Árvore Binária de busca usada na disciplina de Estruturas de Dados.
 * Regras (convenções do simulador):
 *   - menor -> esquerda, maior -> direita;
 *   - valor duplicado é rejeitado (a árvore não muda);
 *   - remoção: folha / um filho / dois filhos (sucessor em-ordem).
 *
 * Estado da árvore: { raiz, proxId }  (objeto congelado, imutável).
 * Nó: { id, valor, esq, dir }  — `id` é estável e crescente; é por ele que o
 * renderizador anima o deslizamento dos nós. O sucessor MANTÉM o seu id ao
 * assumir o lugar do nó removido; o id do nó removido deixa de existir.
 * Nó "fantasma" ({ fantasma: true }): só existe no quadro intermediário da
 * remoção com dois filhos — é a cópia que o aluno desenha à mão na posição
 * antiga do sucessor, antes de ela ser removida.
 *
 * Cada operação devolve { arvore, passos, aceita }.
 * Passo: { tipo, idDoNoComparado, direcao, legenda, snapshot, ...extras }
 * tipos: comparar | inserir | marcarRemocao | substituir | removerFolha |
 *        promoverFilho | aviso
 * ===================================================================== */
(function (global) {

  /* ---------- utilitários de nó e snapshot (cópia profunda, imutável) ---------- */

  function criarNo(id, valor, esq, dir) {
    return { id: id, valor: valor, esq: esq || null, dir: dir || null };
  }

  function clonar(no) {
    if (!no) return null;
    const c = { id: no.id, valor: no.valor, esq: clonar(no.esq), dir: clonar(no.dir) };
    if (no.fantasma) c.fantasma = true;
    return c;
  }

  function congelar(no) {
    if (no) { congelar(no.esq); congelar(no.dir); Object.freeze(no); }
    return no;
  }

  // Snapshot imutável: permite voltar/avançar passos sem recalcular nada.
  function foto(raiz) { return congelar(clonar(raiz)); }

  function novaArvore(raizTrabalho, proxId) {
    return Object.freeze({ raiz: foto(raizTrabalho), proxId: proxId });
  }

  function arvoreVazia() { return Object.freeze({ raiz: null, proxId: 1 }); }

  function passo(tipo, idDoNoComparado, direcao, legenda, snapshot, extras) {
    return Object.assign(
      { tipo: tipo, idDoNoComparado: idDoNoComparado, direcao: direcao, legenda: legenda, snapshot: snapshot },
      extras || {}
    );
  }

  const nomeLado = { esq: 'esquerda', dir: 'direita' };
  const nomeFilho = { esq: 'esquerdo', dir: 'direito' };

  /* ---------- consultas puras ---------- */

  // Nós folha (sem filhos), em ordem crescente de valor.
  function folhas(raiz) {
    const r = [];
    (function visitar(n) {
      if (!n) return;
      visitar(n.esq);
      if (!n.esq && !n.dir) r.push(n.valor);
      visitar(n.dir);
    })(raiz);
    return r;
  }

  // Altura = número de níveis (vazia = 0; só a raiz = 1). Slides 14 e 15.
  function altura(raiz) {
    return raiz ? 1 + Math.max(altura(raiz.esq), altura(raiz.dir)) : 0;
  }

  function ehFolha(n) { return !!n && !n.esq && !n.dir; }

  /* Representação aninhada.
   *  formato 'slide'       : (A (B (D)(F)) (C (G)) (E))  — um filho só: (X (L)) — lado ambíguo.
   *  formato 'alternativo' : lado vazio marcado:  (4 (2 (-3)(3)) ())
   * Separador entre dois irmãos: nada se ambos são folhas reais "(x)(y)";
   * um espaço nos demais casos — padrão dos exemplos dos slides e do enunciado. */
  function aninhada(raiz, formato) {
    const alt = formato === 'alternativo';
    function f(n) {
      if (!n) return '()';
      if (ehFolha(n)) return '(' + n.valor + ')';
      const partes = [];
      if (alt) {
        partes.push(f(n.esq), f(n.dir));
        const sep = ehFolha(n.esq) && ehFolha(n.dir) ? '' : ' ';
        return '(' + n.valor + ' ' + partes[0] + sep + partes[1] + ')';
      }
      const filhos = [n.esq, n.dir].filter(Boolean);
      const sep = filhos.length === 2 && ehFolha(filhos[0]) && ehFolha(filhos[1]) ? '' : ' ';
      return '(' + n.valor + ' ' + filhos.map(f).join(sep) + ')';
    }
    return f(raiz);
  }

  /* ---------- INSERÇÃO ---------- */

  function inserir(arvore, valor) {
    if (!Number.isInteger(valor)) {
      return { arvore: arvore, aceita: false,
        passos: [passo('aviso', null, null, 'Digite um número inteiro (negativos são aceitos).', arvore.raiz)] };
    }
    const passos = [];

    if (!arvore.raiz) {
      const no = criarNo(arvore.proxId, valor);
      const nova = novaArvore(no, arvore.proxId + 1);
      passos.push(passo('inserir', no.id, null,
        'Árvore vazia, então o ' + valor + ' se torna a raiz.', nova.raiz, { idNovo: no.id }));
      return { arvore: nova, passos: passos, aceita: true };
    }

    const trab = clonar(arvore.raiz);
    const antes = arvore.raiz;            // snapshot imutável já existente
    let atual = trab;
    for (;;) {
      if (valor === atual.valor) {
        passos.push(passo('aviso', atual.id, null,
          valor + ' já existe na árvore. Valores duplicados são rejeitados e a árvore não muda.', antes));
        return { arvore: arvore, passos: passos, aceita: false };
      }
      const dir = valor > atual.valor ? 'dir' : 'esq';
      const rel = valor > atual.valor ? '>' : '<';
      const prox = atual[dir];
      if (prox) {
        passos.push(passo('comparar', atual.id, dir,
          valor + ' ' + rel + ' ' + atual.valor + ', então vai para a ' + nomeLado[dir] + ' de ' + atual.valor + '.', antes));
        atual = prox;
      } else {
        passos.push(passo('comparar', atual.id, dir,
          valor + ' ' + rel + ' ' + atual.valor + ' e a ' + nomeLado[dir] + ' de ' + atual.valor + ' está vazia (ponteiro nulo).', antes));
        const no = criarNo(arvore.proxId, valor);
        atual[dir] = no;
        const nova = novaArvore(trab, arvore.proxId + 1);
        passos.push(passo('inserir', no.id, dir,
          'Então insere o ' + valor + ' como filho ' + nomeFilho[dir] + ' de ' + atual.valor + '.', nova.raiz,
          { idNovo: no.id, idPai: atual.id }));
        return { arvore: nova, passos: passos, aceita: true };
      }
    }
  }

  /* ---------- REMOÇÃO (convenção do simulador: sucessor em-ordem) ---------- */

  function remover(arvore, valor) {
    if (!Number.isInteger(valor)) {
      return { arvore: arvore, aceita: false,
        passos: [passo('aviso', null, null, 'Digite um número inteiro (negativos são aceitos).', arvore.raiz)] };
    }
    if (!arvore.raiz) {
      return { arvore: arvore, aceita: false,
        passos: [passo('aviso', null, null, 'A árvore está vazia: não há o que remover.', null)] };
    }

    const passos = [];
    const antes = arvore.raiz;
    const ctx = { raiz: clonar(arvore.raiz) };

    // 1) localizar o nó (guardando o pai e o lado)
    let pai = null, lado = null, atual = ctx.raiz;
    while (atual && atual.valor !== valor) {
      const dir = valor > atual.valor ? 'dir' : 'esq';
      const rel = valor > atual.valor ? '>' : '<';
      if (atual[dir]) {
        passos.push(passo('comparar', atual.id, dir,
          valor + ' ' + rel + ' ' + atual.valor + ', então procura na ' + nomeLado[dir] + ' de ' + atual.valor + '.', antes));
        pai = atual; lado = dir; atual = atual[dir];
      } else {
        passos.push(passo('comparar', atual.id, dir,
          valor + ' ' + rel + ' ' + atual.valor + ' e a ' + nomeLado[dir] + ' de ' + atual.valor + ' está vazia.', antes));
        passos.push(passo('aviso', null, null,
          'O valor ' + valor + ' não existe na árvore. Nada foi removido.', antes));
        return { arvore: arvore, passos: passos, aceita: false };
      }
    }
    passos.push(passo('comparar', atual.id, null, valor + ' = ' + atual.valor + ': nó encontrado.', antes));

    // coloca `novo` no lugar do nó removido (na raiz ou no ponteiro do pai)
    function colocar(novo) {
      if (!pai) ctx.raiz = novo; else pai[lado] = novo;
    }
    const X = atual;
    const proxId = arvore.proxId;
    const final = function () { return novaArvore(ctx.raiz, proxId); };

    // CASO 1 — folha
    if (ehFolha(X)) {
      passos.push(passo('marcarRemocao', X.id, null,
        'Caso 1: o ' + valor + ' é folha (não tem filhos). Basta removê-lo.', antes, { idRemovido: X.id }));
      colocar(null);
      const nova = final();
      passos.push(passo('removerFolha', X.id, null, 'Folha ' + valor + ' removida.', nova.raiz, { idRemovido: X.id }));
      return { arvore: nova, passos: passos, aceita: true };
    }

    // CASO 2 — um filho
    if (!X.esq || !X.dir) {
      const lf = X.esq ? 'esq' : 'dir';
      const filho = X[lf];
      passos.push(passo('marcarRemocao', X.id, null,
        'Caso 2: o ' + valor + ' tem um só filho (' + filho.valor + '). Esse filho, com sua subárvore, assume o lugar dele.',
        antes, { idRemovido: X.id, idPromovido: filho.id }));
      colocar(filho);
      const nova = final();
      passos.push(passo('promoverFilho', filho.id, null,
        'O ' + filho.valor + ' (com sua subárvore) subiu para o lugar do ' + valor + '.', nova.raiz,
        { idRemovido: X.id, idPromovido: filho.id }));
      return { arvore: nova, passos: passos, aceita: true };
    }

    // CASO 3 — dois filhos: sucessor em-ordem = menor valor da subárvore direita
    passos.push(passo('marcarRemocao', X.id, null,
      'Caso 3: o ' + valor + ' tem dois filhos (' + X.esq.valor + ' e ' + X.dir.valor +
      '). Quem assume o lugar dele é o sucessor em-ordem: o menor valor da subárvore direita.',
      antes, { idRemovido: X.id }));

    let paiS = X, S = X.dir;
    for (;;) {
      if (S.esq) {
        passos.push(passo('comparar', S.id, 'esq',
          'Procurando o sucessor: ' + S.valor + ' ainda tem filho esquerdo, então desce pela esquerda.', antes));
        paiS = S; S = S.esq;
      } else {
        passos.push(passo('comparar', S.id, null,
          S.valor + ' não tem filho esquerdo: é o menor da subárvore direita, o sucessor.', antes, { idSucessor: S.id }));
        break;
      }
    }

    // quadro intermediário: S sobe (mantém o id); o lugar antigo vira "fantasma"
    const fantasma = { id: 'f' + S.id, valor: S.valor, esq: null, dir: S.dir, fantasma: true };
    const sNovo = { id: S.id, valor: S.valor, esq: X.esq, dir: X.dir };
    let paiFantasma, ladoFantasma;
    if (paiS === X) { sNovo.dir = fantasma; paiFantasma = sNovo; ladoFantasma = 'dir'; }
    else { paiS.esq = fantasma; paiFantasma = paiS; ladoFantasma = 'esq'; }
    colocar(sNovo);
    const inter = foto(ctx.raiz);
    passos.push(passo('substituir', S.id, null,
      'O sucessor ' + S.valor + ' assume o lugar do ' + valor + '. A posição antiga dele (tracejada) ainda precisa ser removida.',
      inter, { idRemovido: X.id, idSucessor: S.id, idFantasma: fantasma.id }));

    // remove o nó que cedeu o valor (cai no caso 1 ou 2)
    if (fantasma.dir) {
      paiFantasma[ladoFantasma] = fantasma.dir;
      const nova = final();
      passos.push(passo('promoverFilho', fantasma.dir.id, null,
        'A posição antiga do ' + S.valor + ' tem um filho (' + fantasma.dir.valor + '): caso 2, o filho assume o lugar.',
        nova.raiz, { idFantasma: fantasma.id, idPromovido: fantasma.dir.id }));
      return { arvore: nova, passos: passos, aceita: true };
    }
    paiFantasma[ladoFantasma] = null;
    const nova = final();
    passos.push(passo('removerFolha', fantasma.id, null,
      'A posição antiga do ' + S.valor + ' é folha: caso 1, é só removê-la.', nova.raiz, { idFantasma: fantasma.id }));
    return { arvore: nova, passos: passos, aceita: true };
  }

  /* ---------- execução em lote (usada pelos presets e pelo modo manuscrito) ---------- */

  // Aplica uma sequência; devolve a árvore final e, por operação, os passos e o estado.
  function executar(arvore, operacoes) {
    const registro = [];
    let atual = arvore;
    operacoes.forEach(function (op) {
      const r = op.tipo === 'inserir' ? inserir(atual, op.valor) : remover(atual, op.valor);
      registro.push({ op: op, passos: r.passos, aceita: r.aceita, arvore: r.arvore });
      atual = r.arvore;
    });
    return { arvore: atual, registro: registro };
  }

  const MotorArvore = {
    arvoreVazia: arvoreVazia, inserir: inserir, remover: remover,
    folhas: folhas, altura: altura, aninhada: aninhada, executar: executar, foto: foto
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = MotorArvore;
  else global.MotorArvore = MotorArvore;

})(typeof window !== 'undefined' ? window : globalThis);
