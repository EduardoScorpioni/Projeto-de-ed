(() => {
  const lab = document.querySelector("[data-tree-lab]");
  if (!lab) return;
  const mode = lab.dataset.treeLab;
  const input = lab.querySelector("[data-tree-input]");
  const viewport = lab.querySelector("[data-tree-view]");
  const status = lab.querySelector("[data-tree-status]");
  const words = new Set((lab.dataset.initial || "").split(",").map((word) => word.trim()).filter(Boolean));
  let matchedPrefixes = new Set();

  const normalize = (value) => value.trim().toLocaleLowerCase("pt-BR").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "");

  function plainTrie() {
    const root = { label: "raiz", end: false, children: new Map(), prefix: "" };
    [...words].sort().forEach((word) => {
      let node = root;
      let prefix = "";
      [...word].forEach((character) => {
        prefix += character;
        if (!node.children.has(character)) node.children.set(character, { label: character, end: false, children: new Map(), prefix });
        node = node.children.get(character);
      });
      node.end = true;
    });
    return root;
  }

  function compress(node, isRoot = true) {
    const result = { label: isRoot ? "raiz" : node.label, edge: isRoot ? "" : node.label, end: node.end, prefix: node.prefix, children: [] };
    [...node.children.values()].sort((a, b) => a.label.localeCompare(b.label)).forEach((child) => {
      let current = child;
      let edge = child.label;
      while (!current.end && current.children.size === 1) {
        current = [...current.children.values()][0];
        edge += current.label;
      }
      const compressed = compress(current, false);
      compressed.label = edge;
      compressed.edge = edge;
      result.children.push(compressed);
    });
    return result;
  }

  function asRenderable(node) {
    return { label: node.label, edge: node.label === "raiz" ? "" : node.label, end: node.end, prefix: node.prefix,
      children: [...node.children.values()].sort((a, b) => a.label.localeCompare(b.label)).map(asRenderable) };
  }

  function makeNode(node, isRoot = false) {
    const li = document.createElement("li");
    const badge = document.createElement("span");
    badge.className = "tree-node";
    if (isRoot) badge.classList.add("tree-node--root");
    if (node.end) badge.classList.add("tree-node--word");
    if (matchedPrefixes.has(node.prefix)) badge.classList.add("tree-node--match");
    badge.textContent = isRoot ? "raiz" : node.label;
    badge.title = node.end ? "Fim de uma palavra" : "Prefixo";
    li.appendChild(badge);
    if (!isRoot && node.edge) {
      const edge = document.createElement("span");
      edge.className = "tree-node__edge";
      edge.textContent = node.edge;
      li.appendChild(edge);
    }
    if (node.children.length) {
      const ul = document.createElement("ul");
      node.children.forEach((child) => ul.appendChild(makeNode(child)));
      li.appendChild(ul);
    }
    return li;
  }

  function render() {
    viewport.replaceChildren();
    const source = plainTrie();
    const root = mode === "patricia" ? compress(source) : asRenderable(source);
    const ul = document.createElement("ul");
    ul.className = "prefix-tree";
    ul.appendChild(makeNode(root, true));
    viewport.appendChild(ul);
  }

  function setStatus(message, kind = "") {
    status.textContent = message;
    status.dataset.kind = kind;
  }

  function prefixesFor(word) {
    const source = plainTrie();
    const found = new Set();
    let node = source;
    let prefix = "";
    for (const character of word) {
      if (!node.children.has(character)) break;
      node = node.children.get(character);
      prefix += character;
      found.add(prefix);
    }
    return { found, complete: prefix === word && node.end };
  }

  function add() {
    const word = normalize(input.value);
    if (!word) { setStatus("Digite uma palavra usando letras, números ou hífen.", "error"); input.focus(); return; }
    if (words.has(word)) { setStatus("“" + word + "” já está armazenada.", "error"); return; }
    words.add(word);
    matchedPrefixes = prefixesFor(word).found;
    render();
    setStatus("“" + word + "” foi inserida. Os caminhos compartilhados foram reaproveitados.", "success");
    input.select();
  }

  function search() {
    const word = normalize(input.value);
    if (!word) { setStatus("Digite a palavra que deseja buscar.", "error"); input.focus(); return; }
    const result = prefixesFor(word);
    matchedPrefixes = result.found;
    render();
    setStatus(result.complete ? "“" + word + "” foi encontrada." : "“" + word + "” não está completa na árvore; observe até onde o prefixo coincide.", result.complete ? "success" : "error");
  }

  function remove() {
    const word = normalize(input.value);
    if (!words.has(word)) {
      matchedPrefixes = word ? prefixesFor(word).found : new Set();
      render();
      setStatus(word ? "“" + word + "” não está armazenada." : "Digite a palavra que deseja remover.", "error");
      return;
    }
    words.delete(word);
    matchedPrefixes = new Set();
    render();
    setStatus("“" + word + "” foi removida; nós usados por outras palavras foram preservados.", "success");
    input.select();
  }

  lab.querySelector("[data-action=insert]").addEventListener("click", add);
  lab.querySelector("[data-action=search]").addEventListener("click", search);
  lab.querySelector("[data-action=remove]").addEventListener("click", remove);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") add(); });
  render();
})();
