import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1600;
const H = 1130;
const docsDir = path.dirname(fileURLToPath(import.meta.url));
const outputRoot = path.join(docsDir, '..', 'assets', 'img');

const palette = {
  paper: '#fbfcff',
  white: '#ffffff',
  ink: '#172331',
  muted: '#5b6b7b',
  line: '#d8e1ea',
  rose: '#c94f45',
  amber: '#d8891f'
};

const themes = [
  {
    directory: 'fila',
    section: 'FILA ENCADEADA',
    accent: '#168c7a',
    soft: '#e9f7f4',
    pages: [
      {
        file: '01-inicio-fim-e-nos.svg',
        kicker: 'ESTRUTURA FIFO',
        title: 'Início, fim e nós encadeados',
        subtitle: 'Dois ponteiros de controle mantêm a entrada e a saída da fila em tempo constante.',
        diagram: 'queue-structure',
        cards: [
          { title: 'Início', body: 'Aponta para o primeiro nó, que será o próximo elemento removido.' },
          { title: 'Fim', body: 'Aponta para o último nó e permite inserir sem percorrer a fila.' }
        ],
        footer: 'Cada nó guarda um valor e uma referência para o próximo.'
      },
      {
        file: '02-enfileirar-no-fim.svg',
        kicker: 'OPERAÇÃO ENQUEUE',
        title: 'Enfileirar: inserir no fim',
        subtitle: 'O novo nó entra depois do fim atual e se torna o novo ponteiro fim.',
        diagram: 'queue-enqueue',
        cards: [
          { title: '1. Encadear', body: 'O campo prox do antigo fim passa a apontar para o novo nó.' },
          { title: '2. Atualizar', body: 'O ponteiro fim recebe o novo nó. A operação custa O(1).' }
        ],
        footer: 'Quem chega por último espera atrás dos elementos que já estavam na fila.'
      },
      {
        file: '03-desenfileirar-no-inicio.svg',
        kicker: 'OPERAÇÃO DEQUEUE',
        title: 'Desenfileirar: remover no início',
        subtitle: 'O primeiro nó sai e início avança para o próximo elemento da sequência.',
        diagram: 'queue-dequeue',
        cards: [
          { title: '1. Guardar', body: 'Uma variável auxiliar recebe o nó apontado por início.' },
          { title: '2. Avançar', body: 'Início recebe inicio.prox. Se esvaziar, fim também vira null.' }
        ],
        footer: 'A remoção respeita FIFO e custa O(1).'
      },
      {
        file: '04-percurso-da-fila.svg',
        kicker: 'LEITURA SEQUENCIAL',
        title: 'Percurso: do início até null',
        subtitle: 'Uma referência auxiliar visita cada nó sem alterar início ou fim.',
        diagram: 'queue-traverse',
        cards: [
          { title: 'Consulta', body: 'Compara o valor procurado com cada nó até encontrar ou chegar a null.' },
          { title: 'Complexidade', body: 'No pior caso todos os n elementos são visitados: custo O(n).' }
        ],
        footer: 'Ordem de leitura: 12, depois 45, depois 89.'
      }
    ]
  },
  {
    directory: 'fila-prioridade',
    section: 'FILA DE PRIORIDADES',
    accent: '#6957a8',
    soft: '#f1edfb',
    pages: [
      {
        file: '01-ordem-por-prioridade.svg',
        kicker: 'ESTRUTURA ORDENADA',
        title: 'Maior prioridade vem primeiro',
        subtitle: 'A lista permanece ordenada para que o próximo atendimento esteja sempre no início.',
        diagram: 'priority-structure',
        cards: [
          { title: 'P1: emergência', body: 'Permanece à frente de P2 e P3, mesmo quando chegou depois.' },
          { title: 'Remoção rápida', body: 'Como o mais urgente está no início, desenfileirar custa O(1).' }
        ],
        footer: 'Ordem de atendimento: P1, depois P2 e por último P3.'
      },
      {
        file: '02-insercao-ordenada.svg',
        kicker: 'INSERÇÃO O(N)',
        title: 'Encontrar a posição correta',
        subtitle: 'O algoritmo percorre a fila e encaixa o novo nó antes das prioridades menores.',
        diagram: 'priority-insert',
        cards: [
          { title: 'Novo P2', body: 'O nó não vai simplesmente para o fim: ele entra entre P1 e P3.' },
          { title: 'Custo', body: 'Pode ser necessário percorrer toda a cadeia; pior caso O(n).' }
        ],
        footer: 'A inserção faz o trabalho de ordenação para simplificar a remoção.'
      },
      {
        file: '03-empate-preserva-fifo.svg',
        kicker: 'ESTABILIDADE',
        title: 'Empate de prioridade preserva FIFO',
        subtitle: 'Entre elementos com a mesma prioridade, quem chegou primeiro continua na frente.',
        diagram: 'priority-tie',
        cards: [
          { title: 'Mesma prioridade', body: 'Ana e Bruno são P1, mas Ana entrou antes na fila.' },
          { title: 'Regra de inserção', body: 'O novo nó passa depois de todas as prioridades iguais.' }
        ],
        footer: 'Prioridade decide o grupo; a ordem de chegada decide dentro do grupo.'
      },
      {
        file: '04-triagem-hospitalar.svg',
        kicker: 'APLICAÇÃO PRÁTICA',
        title: 'Triagem transforma urgência em ordem',
        subtitle: 'A classificação de risco define a sequência de atendimento sem ignorar a chegada.',
        diagram: 'priority-triage',
        cards: [
          { title: 'Outros usos', body: 'Escalonamento de CPU, pacotes de rede, impressão e algoritmos de caminhos.' },
          { title: 'Ideia central', body: 'O dado e a prioridade viajam juntos dentro de cada nó.' }
        ],
        footer: 'Fila de prioridades não significa atendimento aleatório: existe um critério explícito.'
      }
    ]
  },
  {
    directory: 'pilha',
    section: 'PILHA ENCADEADA',
    accent: '#1d5d94',
    soft: '#eaf3fb',
    pages: [
      {
        file: '01-topo-e-nos.svg',
        kicker: 'ESTRUTURA LIFO',
        title: 'Um único ponto de acesso: o topo',
        subtitle: 'Cada nó aponta para o elemento que estava abaixo dele na pilha.',
        diagram: 'stack-structure',
        cards: [
          { title: 'Topo', body: 'Aponta para o último elemento empilhado e concentra push e pop.' },
          { title: 'Base', body: 'O último nó da cadeia aponta para null e marca o fim da pilha.' }
        ],
        footer: 'Leitura a partir do topo: 90, depois 45, depois 10.'
      },
      {
        file: '02-push-no-topo.svg',
        kicker: 'OPERAÇÃO PUSH',
        title: 'Empilhar: novo nó no topo',
        subtitle: 'O novo nó aponta para o topo antigo antes de assumir o controle da pilha.',
        diagram: 'stack-push',
        cards: [
          { title: '1. Ligar', body: 'novo.prox recebe o topo atual para não perder a cadeia existente.' },
          { title: '2. Atualizar', body: 'topo recebe novo. Apenas dois ponteiros mudam: custo O(1).' }
        ],
        footer: 'O elemento 90 foi o último a entrar e agora está no topo.'
      },
      {
        file: '03-pop-no-topo.svg',
        kicker: 'OPERAÇÃO POP',
        title: 'Desempilhar: remover do topo',
        subtitle: 'O topo atual é guardado e o ponteiro avança para o nó que estava logo abaixo.',
        diagram: 'stack-pop',
        cards: [
          { title: 'Nó removido', body: 'A referência auxiliar permite retornar o valor que saiu da pilha.' },
          { title: 'Novo topo', body: 'topo recebe topo.prox. A operação também custa O(1).' }
        ],
        footer: 'LIFO: o último elemento que entrou é o primeiro que sai.'
      },
      {
        file: '04-pilha-de-chamadas.svg',
        kicker: 'APLICAÇÃO PRÁTICA',
        title: 'A pilha de chamadas de um programa',
        subtitle: 'Cada função ativa ocupa o topo; ao terminar, ela devolve o controle para quem a chamou.',
        diagram: 'stack-calls',
        cards: [
          { title: 'Chamadas', body: 'Main chama calcular, que chama validar. Cada nova chamada é empilhada.' },
          { title: 'Retornos', body: 'validar termina primeiro, depois calcular e por último Main.' }
        ],
        footer: 'Chamadas entram em uma ordem e retornam na ordem inversa.'
      }
    ]
  }
];

function xml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrap(value, maxChars) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word;
    if (attempt.length <= maxChars) {
      current = attempt;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function textBlock(value, x, y, width, size, options = {}) {
  const maxChars = Math.max(12, Math.floor(width / (size * 0.54)));
  const lines = wrap(value, maxChars);
  const fill = options.fill || palette.ink;
  const weight = options.weight || 400;
  const anchor = options.anchor || 'start';
  const lineHeight = options.lineHeight || size * 1.28;
  const family = options.mono ? 'Consolas, Menlo, monospace' : 'Segoe UI, Arial, sans-serif';

  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${xml(line)}</tspan>`).join('')}</text>`;
}

function oneLine(value, x, y, size, options = {}) {
  return textBlock(value, x, y, 2400, size, options);
}

function arrow(x1, y1, x2, y2, marker = 'accent', dash = '') {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${marker === 'accent' ? 'var(--accent)' : marker === 'rose' ? palette.rose : marker === 'amber' ? palette.amber : palette.muted}" stroke-width="5" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} marker-end="url(#arrow-${marker})"/>`;
}

function node(x, y, value, options = {}) {
  const width = options.width || 170;
  const height = options.height || 98;
  const accent = options.accent || 'var(--accent)';
  const fill = options.highlight ? 'var(--soft)' : palette.white;
  const pointerWidth = options.pointer === false ? 0 : 54;
  const valueX = x + (width - pointerWidth) / 2;
  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="${fill}" stroke="${accent}" stroke-width="3"/>
    ${pointerWidth ? `<line x1="${x + width - pointerWidth}" y1="${y + 14}" x2="${x + width - pointerWidth}" y2="${y + height - 14}" stroke="${palette.line}" stroke-width="2"/>` : ''}
    ${options.badge ? `<rect x="${x + 12}" y="${y + 12}" width="${width - pointerWidth - 24}" height="26" rx="10" fill="${accent}" opacity=".14"/>${oneLine(options.badge, valueX, y + 32, 15, { fill: accent, weight: 800, anchor: 'middle' })}` : ''}
    ${oneLine(value, valueX, y + (options.badge ? 75 : 62), options.valueSize || 34, { weight: 900, anchor: 'middle' })}
    ${pointerWidth ? oneLine('prox', x + width - pointerWidth / 2, y + 59, 16, { fill: palette.muted, weight: 700, anchor: 'middle' }) : ''}
  </g>`;
}

function stackNode(x, y, value, options = {}) {
  const accent = options.accent || 'var(--accent)';
  return `<g>
    <rect x="${x}" y="${y}" width="310" height="92" rx="18" fill="${options.highlight ? 'var(--soft)' : palette.white}" stroke="${accent}" stroke-width="3"/>
    <line x1="${x + 230}" y1="${y + 14}" x2="${x + 230}" y2="${y + 78}" stroke="${palette.line}" stroke-width="2"/>
    ${oneLine(value, x + 115, y + 59, options.valueSize || 34, { weight: 900, anchor: 'middle' })}
    ${oneLine('prox', x + 270, y + 57, 17, { fill: palette.muted, weight: 700, anchor: 'middle' })}
  </g>`;
}

function card(theme, item, y) {
  return `<g class="card">
    <rect x="1160" y="${y}" width="350" height="230" rx="18" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
    <rect x="1160" y="${y}" width="12" height="230" rx="6" fill="${theme.accent}"/>
    ${textBlock(item.title, 1196, y + 58, 270, 28, { weight: 800 })}
    ${textBlock(item.body, 1196, y + 118, 270, 21, { fill: palette.muted })}
  </g>`;
}

function diagramFrame(content) {
  return `<g class="card">
    <rect x="90" y="300" width="1000" height="620" rx="22" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
    ${content}
  </g>`;
}

function horizontalQueue(values, y, options = {}) {
  const startX = options.startX || 165;
  const step = options.step || 245;
  return values.map((value, index) => {
    const x = startX + index * step;
    const highlighted = options.highlight === index;
    const accent = options.accents ? options.accents[index] : undefined;
    return `${node(x, y, value, { highlight: highlighted, accent, badge: options.badges ? options.badges[index] : undefined, valueSize: options.valueSize })}
      ${index < values.length - 1 ? arrow(x + 170, y + 49, x + step - 18, y + 49, options.arrowMarker || 'accent') : ''}`;
  }).join('');
}

function renderDiagram(name) {
  switch (name) {
    case 'queue-structure':
      return diagramFrame(`<g style="--accent:#168c7a;--soft:#e9f7f4">
        ${oneLine('INÍCIO', 190, 410, 22, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${arrow(190, 425, 215, 482)}
        ${oneLine('FIM', 735, 410, 22, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${arrow(735, 425, 705, 482)}
        ${horizontalQueue(['12', '45', '89'], 495)}
        ${arrow(825, 544, 925, 544, 'muted')}
        ${oneLine('null', 955, 555, 28, { fill: palette.muted, weight: 800 })}
        ${oneLine('1º a sair', 250, 650, 22, { fill: palette.rose, weight: 800, anchor: 'middle' })}
        ${oneLine('último inserido', 740, 650, 22, { fill: '#168c7a', weight: 800, anchor: 'middle' })}
        ${oneLine('saída', 250, 742, 24, { fill: palette.rose, weight: 800, anchor: 'middle' })}
        ${arrow(250, 705, 250, 670, 'rose')}
        ${oneLine('entrada', 740, 742, 24, { fill: '#168c7a', weight: 800, anchor: 'middle' })}
        ${arrow(740, 705, 740, 670)}
      </g>`);

    case 'queue-enqueue':
      return diagramFrame(`<g style="--accent:#168c7a;--soft:#e9f7f4">
        ${oneLine('ANTES', 140, 365, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['12', '45'], 390, { startX: 240, step: 245 })}
        ${oneLine('fim', 570, 375, 20, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${oneLine('NOVO NÓ', 860, 365, 20, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${node(775, 390, '60', { highlight: true })}
        <line x1="130" y1="555" x2="1040" y2="555" stroke="${palette.line}" stroke-width="2" stroke-dasharray="8 10"/>
        ${oneLine('DEPOIS', 140, 615, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['12', '45', '60'], 640, { highlight: 2 })}
        ${oneLine('novo fim', 740, 785, 21, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${arrow(740, 770, 740, 748)}
      </g>`);

    case 'queue-dequeue':
      return diagramFrame(`<g style="--accent:#168c7a;--soft:#e9f7f4">
        ${oneLine('ANTES', 140, 365, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['12', '45', '89'], 390, { highlight: 0 })}
        ${oneLine('remover', 250, 370, 20, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${arrow(250, 375, 250, 390, 'rose')}
        <line x1="130" y1="555" x2="1040" y2="555" stroke="${palette.line}" stroke-width="2" stroke-dasharray="8 10"/>
        ${oneLine('DEPOIS', 140, 615, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['45', '89'], 640, { startX: 285, step: 245, highlight: 0 })}
        ${oneLine('novo início', 370, 785, 21, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${arrow(370, 770, 370, 748)}
        <g opacity=".42">${node(805, 640, '12', { accent: palette.rose })}</g>
        ${oneLine('retornado', 890, 785, 20, { fill: palette.rose, weight: 800, anchor: 'middle' })}
      </g>`);

    case 'queue-traverse':
      return diagramFrame(`<g style="--accent:#168c7a;--soft:#e9f7f4">
        ${oneLine('aux', 250, 410, 22, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${arrow(250, 425, 250, 488)}
        ${horizontalQueue(['12', '45', '89'], 500, { highlight: 0 })}
        ${arrow(825, 549, 925, 549, 'muted')}
        ${oneLine('null', 950, 560, 27, { fill: palette.muted, weight: 800 })}
        ${arrow(335, 690, 500, 690, 'accent', '10 10')}
        ${arrow(580, 690, 745, 690, 'accent', '10 10')}
        ${oneLine('1', 250, 750, 34, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${oneLine('2', 495, 750, 34, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${oneLine('3', 740, 750, 34, { fill: '#168c7a', weight: 900, anchor: 'middle' })}
        ${oneLine('aux = aux.prox até chegar a null', 575, 840, 25, { fill: palette.muted, weight: 700, anchor: 'middle' })}
      </g>`);

    case 'priority-structure':
      return diagramFrame(`<g style="--accent:#6957a8;--soft:#f1edfb">
        ${oneLine('INÍCIO', 210, 405, 21, { fill: '#6957a8', weight: 900, anchor: 'middle' })}
        ${arrow(210, 420, 230, 487)}
        ${horizontalQueue(['Ana', 'Bia', 'Caio'], 500, {
          startX: 155,
          step: 270,
          badges: ['P1 • ALTA', 'P2 • MÉDIA', 'P3 • NORMAL'],
          accents: [palette.rose, palette.amber, '#1d5d94'],
          valueSize: 28
        })}
        ${arrow(865, 549, 955, 549, 'muted')}
        ${oneLine('null', 980, 560, 27, { fill: palette.muted, weight: 800 })}
        ${oneLine('1º', 240, 690, 30, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('2º', 510, 690, 30, { fill: palette.amber, weight: 900, anchor: 'middle' })}
        ${oneLine('3º', 780, 690, 30, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        ${oneLine('A prioridade organiza a cadeia antes do atendimento', 575, 820, 26, { fill: palette.muted, weight: 700, anchor: 'middle' })}
      </g>`);

    case 'priority-insert':
      return diagramFrame(`<g style="--accent:#6957a8;--soft:#f1edfb">
        ${oneLine('FILA ATUAL', 140, 365, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['Ana', 'Caio'], 390, { startX: 190, step: 300, badges: ['P1', 'P3'], accents: [palette.rose, '#1d5d94'], valueSize: 28 })}
        ${oneLine('NOVO', 880, 365, 20, { fill: '#6957a8', weight: 900, anchor: 'middle' })}
        ${node(795, 390, 'Bia', { badge: 'P2', accent: palette.amber, highlight: true, valueSize: 28 })}
        <line x1="130" y1="555" x2="1040" y2="555" stroke="${palette.line}" stroke-width="2" stroke-dasharray="8 10"/>
        ${oneLine('RESULTADO ORDENADO', 140, 615, 20, { fill: palette.muted, weight: 900 })}
        ${horizontalQueue(['Ana', 'Bia', 'Caio'], 640, {
          startX: 155,
          step: 270,
          badges: ['P1', 'P2', 'P3'],
          accents: [palette.rose, palette.amber, '#1d5d94'],
          valueSize: 28,
          highlight: 1
        })}
        ${oneLine('Bia entra entre P1 e P3', 575, 840, 25, { fill: '#6957a8', weight: 800, anchor: 'middle' })}
      </g>`);

    case 'priority-tie':
      return diagramFrame(`<g style="--accent:#6957a8;--soft:#f1edfb">
        ${oneLine('ORDEM DE CHEGADA', 140, 380, 21, { fill: palette.muted, weight: 900 })}
        ${oneLine('1º', 275, 440, 26, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${node(190, 465, 'Ana', { badge: 'P1', accent: palette.rose, valueSize: 28 })}
        ${oneLine('2º', 610, 440, 26, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${node(525, 465, 'Bruno', { badge: 'P1', accent: palette.rose, valueSize: 25, highlight: true })}
        ${arrow(360, 514, 505, 514, 'rose')}
        ${oneLine('mesma prioridade', 445, 585, 20, { fill: palette.rose, weight: 800, anchor: 'middle' })}
        ${arrow(695, 514, 845, 514, 'accent')}
        ${node(865, 465, 'Caio', { badge: 'P2', accent: palette.amber, valueSize: 28 })}
        ${oneLine('ATENDIMENTO', 140, 690, 21, { fill: palette.muted, weight: 900 })}
        <rect x="190" y="725" width="820" height="82" rx="18" fill="#f7f5fc" stroke="${palette.line}" stroke-width="2"/>
        ${oneLine('Ana', 310, 778, 28, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${arrow(380, 765, 505, 765, 'rose')}
        ${oneLine('Bruno', 600, 778, 28, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${arrow(690, 765, 810, 765, 'accent')}
        ${oneLine('Caio', 900, 778, 28, { fill: palette.amber, weight: 900, anchor: 'middle' })}
      </g>`);

    case 'priority-triage':
      return diagramFrame(`<g style="--accent:#6957a8;--soft:#f1edfb">
        <rect x="155" y="390" width="245" height="330" rx="24" fill="#f7f5fc" stroke="${palette.line}" stroke-width="2"/>
        ${oneLine('TRIAGEM', 278, 445, 26, { fill: '#6957a8', weight: 900, anchor: 'middle' })}
        ${oneLine('avalia', 278, 520, 23, { fill: palette.muted, weight: 700, anchor: 'middle' })}
        ${oneLine('risco', 278, 555, 23, { fill: palette.muted, weight: 700, anchor: 'middle' })}
        ${oneLine('e urgência', 278, 590, 23, { fill: palette.muted, weight: 700, anchor: 'middle' })}
        <circle cx="278" cy="655" r="34" fill="#6957a8"/>
        ${oneLine('✓', 278, 668, 34, { fill: palette.white, weight: 900, anchor: 'middle' })}
        ${arrow(410, 555, 535, 555, 'accent')}
        ${node(555, 350, 'Emergência', { badge: 'P1', accent: palette.rose, valueSize: 22 })}
        ${node(555, 510, 'Urgência', { badge: 'P2', accent: palette.amber, valueSize: 25 })}
        ${node(555, 670, 'Normal', { badge: 'P3', accent: '#1d5d94', valueSize: 26 })}
        ${arrow(725, 399, 865, 485, 'rose')}
        ${arrow(725, 559, 865, 555, 'amber')}
        ${arrow(725, 719, 865, 625, 'muted')}
        <rect x="875" y="450" width="150" height="220" rx="24" fill="#ffffff" stroke="#6957a8" stroke-width="3"/>
        ${oneLine('ORDEM', 950, 500, 22, { fill: '#6957a8', weight: 900, anchor: 'middle' })}
        ${oneLine('1. P1', 950, 555, 24, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('2. P2', 950, 600, 24, { fill: palette.amber, weight: 900, anchor: 'middle' })}
        ${oneLine('3. P3', 950, 645, 24, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
      </g>`);

    case 'stack-structure':
      return diagramFrame(`<g style="--accent:#1d5d94;--soft:#eaf3fb">
        ${oneLine('TOPO', 240, 385, 22, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        ${arrow(255, 400, 385, 447)}
        ${stackNode(425, 400, '90', { highlight: true })}
        ${arrow(580, 492, 580, 535)}
        ${stackNode(425, 550, '45')}
        ${arrow(580, 642, 580, 685)}
        ${stackNode(425, 700, '10')}
        ${arrow(580, 792, 580, 850, 'muted')}
        ${oneLine('null', 580, 882, 26, { fill: palette.muted, weight: 800, anchor: 'middle' })}
        ${oneLine('último a entrar', 830, 455, 21, { fill: '#1d5d94', weight: 800 })}
        ${oneLine('primeiro a sair', 830, 490, 21, { fill: palette.rose, weight: 800 })}
        ${oneLine('base', 830, 760, 21, { fill: palette.muted, weight: 800 })}
      </g>`);

    case 'stack-push':
      return diagramFrame(`<g style="--accent:#1d5d94;--soft:#eaf3fb">
        ${oneLine('ANTES', 180, 365, 20, { fill: palette.muted, weight: 900, anchor: 'middle' })}
        ${stackNode(150, 395, '45')}
        ${arrow(305, 487, 305, 525)}
        ${stackNode(150, 540, '10')}
        ${oneLine('NOVO', 785, 365, 20, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        ${stackNode(630, 395, '90', { highlight: true })}
        ${arrow(470, 500, 605, 500, 'accent')}
        ${oneLine('push(90)', 540, 475, 22, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        ${arrow(785, 487, 785, 525)}
        ${stackNode(630, 540, '45')}
        ${arrow(785, 632, 785, 670)}
        ${stackNode(630, 685, '10')}
        ${oneLine('topo antigo', 305, 690, 20, { fill: palette.muted, weight: 800, anchor: 'middle' })}
        ${oneLine('novo topo', 785, 820, 20, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
      </g>`);

    case 'stack-pop':
      return diagramFrame(`<g style="--accent:#1d5d94;--soft:#eaf3fb">
        ${oneLine('ANTES', 180, 365, 20, { fill: palette.muted, weight: 900, anchor: 'middle' })}
        ${stackNode(150, 395, '90', { highlight: true })}
        ${arrow(305, 487, 305, 525)}
        ${stackNode(150, 540, '45')}
        ${arrow(305, 632, 305, 670)}
        ${stackNode(150, 685, '10')}
        ${arrow(470, 500, 605, 500, 'rose')}
        ${oneLine('pop()', 540, 475, 22, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('DEPOIS', 785, 365, 20, { fill: palette.muted, weight: 900, anchor: 'middle' })}
        <g opacity=".42">${stackNode(630, 395, '90', { accent: palette.rose })}</g>
        ${oneLine('removido', 1010, 455, 20, { fill: palette.rose, weight: 800 })}
        ${stackNode(630, 540, '45', { highlight: true })}
        ${arrow(785, 632, 785, 670)}
        ${stackNode(630, 685, '10')}
        ${oneLine('novo topo', 1010, 595, 20, { fill: '#1d5d94', weight: 900 })}
      </g>`);

    case 'stack-calls':
      return diagramFrame(`<g style="--accent:#1d5d94;--soft:#eaf3fb">
        ${oneLine('CHAMADAS', 300, 365, 21, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        <rect x="145" y="400" width="310" height="88" rx="18" fill="#eaf3fb" stroke="#1d5d94" stroke-width="3"/>
        ${oneLine('validar()', 300, 455, 28, { fill: '#1d5d94', weight: 900, anchor: 'middle' })}
        <rect x="145" y="510" width="310" height="88" rx="18" fill="#ffffff" stroke="#1d5d94" stroke-width="3"/>
        ${oneLine('calcular()', 300, 565, 28, { weight: 900, anchor: 'middle' })}
        <rect x="145" y="620" width="310" height="88" rx="18" fill="#ffffff" stroke="#1d5d94" stroke-width="3"/>
        ${oneLine('Main()', 300, 675, 28, { weight: 900, anchor: 'middle' })}
        ${arrow(470, 665, 610, 665, 'accent')}
        ${oneLine('RETORNOS', 815, 365, 21, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        <rect x="650" y="410" width="330" height="298" rx="22" fill="#fff8f7" stroke="${palette.line}" stroke-width="2"/>
        ${oneLine('1', 710, 475, 32, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('validar()', 790, 475, 25, { weight: 800 })}
        ${oneLine('2', 710, 555, 32, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('calcular()', 790, 555, 25, { weight: 800 })}
        ${oneLine('3', 710, 635, 32, { fill: palette.rose, weight: 900, anchor: 'middle' })}
        ${oneLine('Main()', 790, 635, 25, { weight: 800 })}
        ${oneLine('A função no topo termina primeiro', 575, 820, 25, { fill: palette.muted, weight: 700, anchor: 'middle' })}
      </g>`);

    default:
      throw new Error(`Diagrama desconhecido: ${name}`);
  }
}

function renderPage(theme, page, index) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">
  <title id="title">${xml(page.title)}</title>
  <desc id="desc">${xml(page.subtitle)}</desc>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#102033" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${theme.accent}"/></marker>
    <marker id="arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.muted}"/></marker>
    <marker id="arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.rose}"/></marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.amber}"/></marker>
    <style>.card { filter: url(#shadow); }</style>
  </defs>
  <rect width="${W}" height="${H}" fill="${palette.paper}"/>
  <rect width="${W}" height="16" fill="${theme.accent}"/>
  <rect y="1112" width="${W}" height="18" fill="${theme.accent}"/>
  ${oneLine(page.kicker, 90, 72, 24, { fill: theme.accent, weight: 800 })}
  ${oneLine('Grupo 6 | Estrutura de Dados', 1370, 72, 22, { fill: palette.muted, anchor: 'end' })}
  ${textBlock(page.title, 90, 142, 1380, page.title.length > 48 ? 50 : 58, { weight: 900 })}
  ${textBlock(page.subtitle, 94, 222, 1370, 27, { fill: palette.muted })}
  ${renderDiagram(page.diagram)}
  ${card(theme, page.cards[0], 330)}
  ${card(theme, page.cards[1], 620)}
  <line x1="90" y1="1044" x2="1510" y2="1044" stroke="${palette.line}" stroke-width="2"/>
  ${textBlock(page.footer, 90, 1082, 1120, 21, { fill: palette.muted })}
  ${oneLine(`${String(index + 1).padStart(2, '0')} / ${String(theme.pages.length).padStart(2, '0')}`, 1510, 1082, 21, { fill: palette.muted, anchor: 'end' })}
</svg>`;
}

for (const theme of themes) {
  const directory = path.join(outputRoot, theme.directory);
  fs.mkdirSync(directory, { recursive: true });

  theme.pages.forEach((page, index) => {
    fs.writeFileSync(path.join(directory, page.file), renderPage(theme, page, index), 'utf8');
  });
}

const total = themes.reduce((sum, theme) => sum + theme.pages.length, 0);
console.log(`${total} imagens SVG geradas em ${outputRoot}`);
