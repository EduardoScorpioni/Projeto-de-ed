import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { documents } from './generate-pdfs.mjs';

const docsDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(docsDir, 'imagens-pdfs');
const W = 1600;
const H = 1130;

const palette = {
  paper: '#fbfcff',
  ink: '#172331',
  muted: '#5b6b7b',
  line: '#d8e1ea',
  white: '#ffffff',
  codeBg: '#18222f',
  codeLine: '#263445',
  codeText: '#eef6ff',
  rose: '#c94f45',
  amber: '#d8891f'
};

function xml(value) {
  return `${value}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slug(value) {
  return `${value}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function wrap(text, maxChars) {
  const words = `${text}`.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const attempt = line ? `${line} ${word}` : word;
    if (attempt.length <= maxChars) {
      line = attempt;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  return lines;
}

function textBlock(text, x, y, width, size, options = {}) {
  const chars = Math.max(16, Math.floor(width / (size * 0.52)));
  const lines = wrap(text, chars);
  const weight = options.weight ? ` font-weight="${options.weight}"` : '';
  const fill = options.fill || palette.ink;
  const anchor = options.anchor ? ` text-anchor="${options.anchor}"` : '';
  const family = options.mono ? 'Consolas, Menlo, monospace' : 'Segoe UI, Arial, sans-serif';
  const lineHeight = options.lineHeight || size * 1.28;
  return [
    `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="${fill}"${weight}${anchor}>`,
    ...lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${xml(line)}</tspan>`),
    '</text>'
  ].join('');
}

function oneLine(text, x, y, size, options = {}) {
  return textBlock(text, x, y, 2000, size, { ...options, lineHeight: size * 1.2 });
}

function svgShell(doc, page, pageNumber, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${xml(page.title)}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#102033" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${doc.accent}"/>
    </marker>
    <marker id="arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.muted}"/>
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${palette.amber}"/>
    </marker>
    <style>
      .card { filter: url(#shadow); }
      .small-caps { letter-spacing: .08em; text-transform: uppercase; }
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="${palette.paper}"/>
  <rect width="${W}" height="16" fill="${doc.accent}"/>
  <rect y="${H - 18}" width="${W}" height="18" fill="${doc.accent}"/>
  ${body}
</svg>`;
}

function pageHeader(doc, page) {
  return `
    ${oneLine(page.kicker || doc.section, 90, 72, 24, { fill: doc.accent, weight: 700 })}
    ${oneLine('Grupo 6 | Estrutura de Dados', W - 90, 72, 22, { fill: palette.muted, anchor: 'end' })}
    ${textBlock(page.title, 90, 142, 1160, page.title.length > 46 ? 52 : 60, { weight: 800 })}
    ${textBlock(page.subtitle || '', 94, 222, 1300, 27, { fill: palette.muted })}
  `;
}

function pageFooter(doc, page, pageNumber, totalPages) {
  return `
    <line x1="90" y1="${H - 86}" x2="${W - 90}" y2="${H - 86}" stroke="${palette.line}" stroke-width="2"/>
    ${oneLine(page.footer || doc.section, 90, H - 48, 21, { fill: palette.muted })}
    ${oneLine(`${String(pageNumber).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`, W - 90, H - 48, 21, { fill: palette.muted, anchor: 'end' })}
  `;
}

function card(doc, item, x, y, width, height, options = {}) {
  const titleSize = options.titleSize || 30;
  const bodySize = options.bodySize || 24;
  const marker = options.marker
    ? `<circle cx="${x + width - 54}" cy="${y + 48}" r="24" fill="${doc.soft}" stroke="${doc.accent}" stroke-width="2"/>
       ${oneLine(options.marker, x + width - 54, y + 57, 22, { fill: doc.accent, weight: 800, anchor: 'middle' })}`
    : '';
  return `
    <g class="card">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="12" height="${height}" rx="6" fill="${doc.accent}"/>
      ${marker}
      ${textBlock(item.title, x + 36, y + 54, width - 76, titleSize, { weight: 800 })}
      ${textBlock(item.body, x + 36, y + 112, width - 70, bodySize, { fill: palette.muted })}
    </g>
  `;
}

function listCard(doc, title, items, x, y, width, height) {
  return `
    <g class="card">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="20" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
      ${oneLine(title, x + 38, y + 62, 34, { weight: 800 })}
      <line x1="${x + 38}" y1="${y + 96}" x2="${x + width - 38}" y2="${y + 96}" stroke="${palette.line}" stroke-width="2"/>
      ${items.map((item, index) => {
        const yy = y + 148 + index * 46;
        return `<circle cx="${x + 50}" cy="${yy - 7}" r="10" fill="${doc.soft}" stroke="${doc.accent}" stroke-width="2"/>
          ${oneLine(item, x + 80, yy, 24, { fill: palette.muted })}`;
      }).join('')}
    </g>
  `;
}

function codeBlock(doc, title, code, x, y, width, height) {
  const lines = code.split('\n');
  const fontSize = lines.length > 20 ? 19 : lines.length > 16 ? 21 : 23;
  const lineHeight = fontSize * 1.45;
  return `
    <g class="card">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="20" fill="${palette.codeBg}"/>
      <rect x="${x}" y="${y}" width="${width}" height="76" rx="20" fill="${doc.accent}"/>
      <rect x="${x}" y="${y + 46}" width="${width}" height="30" fill="${doc.accent}"/>
      ${oneLine(title, x + 34, y + 48, 27, { fill: palette.white, weight: 800 })}
      ${lines.map((line, index) => {
        const yy = y + 116 + index * lineHeight;
        if (yy > y + height - 34) return '';
        const band = index % 2 === 0
          ? `<rect x="${x + 24}" y="${yy - fontSize}" width="${width - 48}" height="${lineHeight + 4}" rx="6" fill="${palette.codeLine}" opacity=".72"/>`
          : '';
        return `${band}${oneLine(line, x + 38, yy, fontSize, { fill: palette.codeText, mono: true })}`;
      }).join('')}
    </g>
  `;
}

function cover(doc, page) {
  const chips = page.chips || [];
  return `
    <rect x="0" y="16" width="470" height="${H - 34}" fill="${doc.soft}"/>
    <rect x="0" y="16" width="36" height="${H - 34}" fill="${doc.accent}"/>
    <rect x="90" y="82" width="280" height="58" rx="18" fill="${palette.white}" stroke="${doc.accent}" stroke-width="2"/>
    ${oneLine(page.module, 120, 119, 26, { fill: doc.accent, weight: 800 })}
    ${textBlock(page.title, 90, 250, 930, 68, { weight: 900 })}
    ${textBlock(page.subtitle, 94, 386, 880, 31, { fill: palette.muted })}
    ${chips.map((chip, index) => `<rect x="${94 + index * 168}" y="520" width="138" height="48" rx="14" fill="${palette.white}" stroke="${doc.accent}" stroke-width="2"/>
      ${oneLine(chip, 163 + index * 168, 552, 22, { fill: doc.accent, weight: 800, anchor: 'middle' })}`).join('')}
    ${topicDiagram(doc, 1130, 150, 330, 330, chips)}
    ${(page.cards || []).map((item, index) => card(doc, item, 90 + index * 485, 720, 430, 220, { titleSize: 29, bodySize: 23 })).join('')}
  `;
}

function renderCards(doc, page) {
  return page.cards.map((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    return card(doc, item, 90 + col * 720, 340 + row * 265, 650, 225);
  }).join('');
}

function renderSteps(doc, page) {
  const steps = page.steps || [];
  const width = (W - 180 - 40 * (steps.length - 1)) / steps.length;
  return steps.map((item, index) => card(doc, item, 90 + index * (width + 40), 390, width, 360, {
    marker: String(index + 1),
    titleSize: 30,
    bodySize: 23
  })).join('');
}

function renderExercise(doc, page) {
  return `
    <rect x="90" y="320" width="420" height="115" rx="20" fill="${doc.soft}" stroke="${doc.accent}" stroke-width="2"/>
    ${oneLine('Contexto', 128, 360, 24, { fill: doc.accent, weight: 800 })}
    ${oneLine(page.context, 128, 410, 42, { weight: 900 })}
    ${listCard(doc, 'Dados possíveis', page.data, 90, 500, 650, 420)}
    ${listCard(doc, 'Operações', page.operations, 810, 500, 700, 420)}
  `;
}

function renderCode(doc, page) {
  if (page.diagram) {
    return `
      ${codeBlock(doc, page.codeTitle || 'Código', page.code, 90, 315, 860, 625)}
      <g class="card">
        <rect x="1010" y="315" width="500" height="250" rx="20" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
        ${diagram(doc, page.diagram, 1045, 355, 430, 170)}
      </g>
      ${(page.cards || []).map((item, index) => card(doc, item, 1010, 610 + index * 160, 500, 130, { titleSize: 25, bodySize: 20 })).join('')}
    `;
  }
  return `
    ${codeBlock(doc, page.codeTitle || 'Código', page.code, 90, 315, 950, 625)}
    ${(page.cards || []).map((item, index) => card(doc, item, 1110, 345 + index * 265, 400, 220, { titleSize: 28, bodySize: 22 })).join('')}
  `;
}

function renderDiagram(doc, page) {
  return `
    <g class="card">
      <rect x="90" y="320" width="1000" height="520" rx="20" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
      ${diagram(doc, page.diagram, 145, 390, 890, 380)}
    </g>
    ${(page.cards || []).map((item, index) => card(doc, item, 1160, 340 + index * 250, 350, 210, { titleSize: 27, bodySize: 21 })).join('')}
  `;
}

function topicDiagram(doc, x, y, width, height, labels) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const nodes = [
    [x + 35, y + 42, labels[0] || 'dados'],
    [x + width - 155, y + 42, labels[1] || 'operações'],
    [x + 35, y + height - 94, labels[2] || 'código'],
    [x + width - 155, y + height - 94, labels[3] || 'modelo']
  ];
  return `
    <g class="card">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="34" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
      ${nodes.map(([nx, ny]) => `<line x1="${cx}" y1="${cy}" x2="${nx + 60}" y2="${ny + 28}" stroke="${doc.accent}" stroke-width="3" opacity=".55"/>`).join('')}
      <rect x="${cx - 76}" y="${cy - 52}" width="152" height="104" rx="24" fill="${doc.accent}"/>
      ${oneLine('ED', cx, cy + 16, 48, { fill: palette.white, weight: 900, anchor: 'middle' })}
      ${nodes.map(([nx, ny, label]) => `<rect x="${nx}" y="${ny}" width="120" height="56" rx="16" fill="${doc.soft}" stroke="${doc.accent}" stroke-width="2"/>
        ${oneLine(label, nx + 60, ny + 36, 19, { fill: doc.accent, weight: 800, anchor: 'middle' })}`).join('')}
    </g>
  `;
}

function node(doc, x, y, label, options = {}) {
  const width = options.width || 145;
  const height = options.height || 96;
  const fill = options.highlight ? doc.soft : palette.white;
  const stroke = options.highlight ? doc.accent : palette.line;
  const pointer = options.pointer
    ? `<line x1="${x + width - 45}" y1="${y + 16}" x2="${x + width - 45}" y2="${y + height - 16}" stroke="${palette.line}" stroke-width="2"/>
       ${oneLine(options.pointer, x + width - 22, y + 58, 16, { fill: palette.muted, anchor: 'middle' })}`
    : '';
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
    ${oneLine(label, x + width / 2 - 16, y + 60, 40, { weight: 900, anchor: 'middle' })}
    ${pointer}`;
}

function arrow(x1, y1, x2, y2, marker = 'accent', color = null) {
  const stroke = color || (marker === 'accent' ? 'var(--accent)' : palette.muted);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="5" stroke-linecap="round" marker-end="url(#arrow-${marker})"/>`;
}

function diagram(doc, item, x, y, width, height) {
  if (!item) return '';
  const body = {
    'simple-list': () => simpleList(doc, x, y, width, height, item.values),
    'insert-start': () => insertStart(doc, x, y, width, height, item.values, item.newValue),
    'remove-middle': () => removeMiddle(doc, x, y, width, height, item.values),
    'double-list': () => doubleList(doc, x, y, width, height, item.values),
    'remove-double': () => removeDouble(doc, x, y, width, height, item.values),
    search: () => searchDiagram(doc, x, y, width, height, item.values, item.highlight)
  }[item.type]?.() || '';
  return `<g style="--accent:${doc.accent}">${body}</g>`;
}

function simpleList(doc, x, y, width, height, values) {
  const yy = y + height / 2 - 48;
  return `
    ${oneLine('início', x + 10, yy - 45, 23, { fill: doc.accent, weight: 800 })}
    ${values.map((value, index) => {
      const nx = x + 70 + index * 230;
      return `${node(doc, nx, yy, value, { pointer: 'prox' })}
        ${index < values.length - 1 ? arrow(nx + 145, yy + 48, nx + 210, yy + 48, 'accent') : ''}`;
    }).join('')}
    ${arrow(x + 70 + (values.length - 1) * 230 + 145, yy + 48, x + 70 + values.length * 230 - 15, yy + 48, 'muted')}
    ${oneLine('null', x + 70 + values.length * 230 + 10, yy + 60, 30, { fill: palette.muted, weight: 800 })}
    ${oneLine('fim', x + 70 + (values.length - 1) * 230 + 70, yy + 132, 23, { fill: doc.accent, weight: 800, anchor: 'middle' })}
  `;
}

function insertStart(doc, x, y, width, height, values, newValue) {
  const yy = y + height / 2 - 48;
  return `
    ${oneLine('novo', x + 80, yy - 45, 23, { fill: doc.accent, weight: 800, anchor: 'middle' })}
    ${node(doc, x + 10, yy, newValue, { pointer: 'prox', highlight: true })}
    ${arrow(x + 155, yy + 48, x + 220, yy + 48, 'accent')}
    ${values.map((value, index) => {
      const nx = x + 235 + index * 215;
      return `${node(doc, nx, yy, value, { pointer: 'prox' })}
        ${index < values.length - 1 ? arrow(nx + 145, yy + 48, nx + 198, yy + 48, 'muted') : ''}`;
    }).join('')}
    ${oneLine('novo.Prox recebe o antigo início', x + 20, yy + 160, 27, { fill: palette.muted })}
  `;
}

function removeMiddle(doc, x, y, width, height, values) {
  const yy = y + height / 2 - 48;
  return `
    ${values.map((value, index) => {
      const nx = x + 70 + index * 230;
      return `${node(doc, nx, yy, value, { pointer: 'prox', highlight: index === 1 })}
        ${index < values.length - 1 ? arrow(nx + 145, yy + 48, nx + 210, yy + 48, index === 0 ? 'accent' : 'muted') : ''}`;
    }).join('')}
    ${oneLine('remover B', x + 70 + 230 + 72, yy - 48, 24, { fill: palette.rose, weight: 900, anchor: 'middle' })}
    ${arrow(x + 145, yy + 170, x + 500, yy + 170, 'accent')}
    ${oneLine('A.Prox aponta para C', x + 322, yy + 212, 24, { fill: doc.accent, weight: 800, anchor: 'middle' })}
  `;
}

function doubleList(doc, x, y, width, height, values) {
  const yy = y + height / 2 - 48;
  return `
    ${values.map((value, index) => {
      const nx = x + 50 + index * 245;
      return `${node(doc, nx, yy, value, { pointer: 'ant | prox', width: 160 })}
        ${index < values.length - 1 ? `${arrow(nx + 160, yy + 34, nx + 228, yy + 34, 'accent')}
        ${arrow(nx + 228, yy + 64, nx + 160, yy + 64, 'amber')}` : ''}`;
    }).join('')}
    ${oneLine('próximo', x + 330, yy - 42, 23, { fill: doc.accent, weight: 800, anchor: 'middle' })}
    ${oneLine('anterior', x + 330, yy + 145, 23, { fill: palette.amber, weight: 800, anchor: 'middle' })}
  `;
}

function removeDouble(doc, x, y, width, height, values) {
  const yy = y + height / 2 - 48;
  return `
    ${doubleList(doc, x, y, width, height, values)}
    ${oneLine('remover B', x + 50 + 245 + 80, yy - 58, 24, { fill: palette.rose, weight: 900, anchor: 'middle' })}
    ${arrow(x + 210, yy + 180, x + 545, yy + 180, 'accent')}
    ${arrow(x + 545, yy + 218, x + 210, yy + 218, 'amber')}
  `;
}

function searchDiagram(doc, x, y, width, height, values, highlight) {
  const yy = y + height / 2 - 48;
  return `
    ${oneLine('atual percorre a lista', x + width / 2, yy - 48, 26, { fill: doc.accent, weight: 900, anchor: 'middle' })}
    ${values.map((value, index) => {
      const nx = x + 70 + index * 230;
      return `${node(doc, nx, yy, value, { pointer: 'prox', highlight: index === highlight })}
        ${index < values.length - 1 ? arrow(nx + 145, yy + 48, nx + 210, yy + 48, 'muted') : ''}
        ${oneLine(index === highlight ? 'encontrou' : 'compara', nx + 72, yy + 142, 22, { fill: index === highlight ? doc.accent : palette.muted, weight: 800, anchor: 'middle' })}`;
    }).join('')}
  `;
}

function renderPage(doc, page, pageNumber) {
  const body = page.layout === 'cover'
    ? cover(doc, page)
    : `${pageHeader(doc, page)}
       ${page.layout === 'cards' ? renderCards(doc, page) : ''}
       ${page.layout === 'diagram' ? renderDiagram(doc, page) : ''}
       ${page.layout === 'code' ? renderCode(doc, page) : ''}
       ${page.layout === 'steps' ? renderSteps(doc, page) : ''}
       ${page.layout === 'exercise' ? renderExercise(doc, page) : ''}
       ${pageFooter(doc, page, pageNumber, doc.pages.length)}`;
  return svgShell(doc, page, pageNumber, body);
}

function gallery(files) {
  const cards = files.map((file) => {
    const rel = path.relative(outputDir, file.path).replaceAll(path.sep, '/');
    return `<article>
      <a href="${rel}" download><img src="${rel}" alt="${xml(file.title)}"></a>
      <p>${xml(file.group)} - ${String(file.page).padStart(2, '0')} - ${xml(file.title)}</p>
    </article>`;
  }).join('\n');
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Imagens dos PDFs - Grupo 6</title>
  <style>
    body { margin: 0; font-family: Segoe UI, Arial, sans-serif; background: #eef3f7; color: #172331; }
    header { padding: 32px 5vw 18px; background: #fff; border-bottom: 1px solid #d8e1ea; }
    h1 { margin: 0 0 8px; font-size: clamp(28px, 4vw, 44px); }
    p { margin: 0; color: #5b6b7b; }
    main { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; padding: 28px 5vw 48px; }
    article { background: #fff; border: 1px solid #d8e1ea; border-radius: 12px; overflow: hidden; }
    img { display: block; width: 100%; height: auto; background: #fbfcff; }
    article p { padding: 12px 14px 16px; font-size: 14px; }
    a { display: block; }
  </style>
</head>
<body>
  <header>
    <h1>Imagens explicativas dos PDFs</h1>
    <p>Clique em uma imagem para abrir ou baixar. Cada SVG corresponde a uma página dos PDFs revisados.</p>
  </header>
  <main>
    ${cards}
  </main>
</body>
</html>`;
}

export function generateImages() {
  fs.mkdirSync(outputDir, { recursive: true });
  const files = [];

  for (const doc of documents) {
    const group = doc.file.replace(/\.pdf$/i, '');
    const groupDir = path.join(outputDir, group);
    fs.mkdirSync(groupDir, { recursive: true });

    doc.pages.forEach((page, index) => {
      const pageNumber = index + 1;
      const name = `${String(pageNumber).padStart(2, '0')}-${slug(page.title)}.svg`;
      const filePath = path.join(groupDir, name);
      fs.writeFileSync(filePath, renderPage(doc, page, pageNumber), 'utf8');
      files.push({ path: filePath, group, page: pageNumber, title: page.title });
    });
  }

  fs.writeFileSync(path.join(outputDir, 'index.html'), gallery(files), 'utf8');
  return files.map((file) => file.path);
}

generateImages();
