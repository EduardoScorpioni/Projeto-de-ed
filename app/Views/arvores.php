<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Árvores | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/arvores.css">
</head>
<body>
  <?php $paginaAtual = 'arvores'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main class="arv">
    <section class="arv-hero nao-imprimir">
      <div>
        <p class="eyebrow">Módulo 05 &middot; Aula 8</p>
        <h1 data-typed="Árvores: genérica e binária">Árvores: genérica e binária</h1>
        <p>
          Entenda como uma árvore organiza os dados em hierarquia e acompanhe, passo a passo,
          a inserção e a remoção em uma árvore binária, com simulador animado e um modo
          manuscrito para imprimir os exercícios.
        </p>
        <div class="arv-hero__acoes">
          <a class="button primary" href="#generica">Árvore genérica</a>
          <a class="button secondary" href="#binaria">Árvore binária e simulador</a>
        </div>
      </div>
    </section>

    <div class="arv-conteudo">
    <!-- ===================================================================
         SEÇÃO 1 — ÁRVORE GENÉRICA (só conceito)
         =================================================================== -->
    <section id="generica" class="secao nao-imprimir" aria-labelledby="tituloGenerica">
      <h2 id="tituloGenerica">1 · Árvore genérica</h2>
      <p>Nas estruturas <strong>lineares</strong> (lista, fila, pilha) os elementos se alinham em sequência, um atrás do outro.
         Uma árvore é <strong>não linear</strong> e hierárquica: há elementos que ficam acima, outros abaixo e outros no mesmo patamar.
         Escolha um conceito para vê-lo destacado na árvore.</p>

      <div class="g-layout">
        <div>
          <svg id="gSvg" class="g-svg" viewBox="0 0 700 310" role="img"
               aria-label="Árvore genérica com raiz A; filhos de A: B, C e E; filhos de B: D e F; filho de C: G.">
            <!-- faixas dos níveis (aparecem em Níveis e Altura) -->
            <rect class="g-banda" x="0" y="5"   width="700" height="90"/>
            <rect class="g-banda" x="0" y="105" width="700" height="90"/>
            <rect class="g-banda" x="0" y="205" width="700" height="90"/>
            <text class="g-rotulo" x="12" y="24">Nível 1</text>
            <text class="g-rotulo" x="12" y="124">Nível 2</text>
            <text class="g-rotulo" x="12" y="224">Nível 3</text>
            <!-- ramos -->
            <line class="g-aresta" id="eAB" x1="330" y1="50"  x2="180" y2="150"/>
            <line class="g-aresta" id="eAC" x1="330" y1="50"  x2="330" y2="150"/>
            <line class="g-aresta" id="eAE" x1="330" y1="50"  x2="480" y2="150"/>
            <line class="g-aresta" id="eBD" x1="180" y1="150" x2="120" y2="250"/>
            <line class="g-aresta" id="eBF" x1="180" y1="150" x2="240" y2="250"/>
            <line class="g-aresta" id="eCG" x1="330" y1="150" x2="330" y2="250"/>
            <!-- nós -->
            <g class="g-no" id="nA" transform="translate(330 50)"  data-letra="A"><circle r="22"/><text>A</text></g>
            <g class="g-no" id="nB" transform="translate(180 150)" data-letra="B"><circle r="22"/><text>B</text></g>
            <g class="g-no" id="nC" transform="translate(330 150)" data-letra="C"><circle r="22"/><text>C</text></g>
            <g class="g-no" id="nE" transform="translate(480 150)" data-letra="E"><circle r="22"/><text>E</text></g>
            <g class="g-no" id="nD" transform="translate(120 250)" data-letra="D"><circle r="22"/><text>D</text></g>
            <g class="g-no" id="nF" transform="translate(240 250)" data-letra="F"><circle r="22"/><text>F</text></g>
            <g class="g-no" id="nG" transform="translate(330 250)" data-letra="G"><circle r="22"/><text>G</text></g>
            <!-- colchete da altura -->
            <path class="g-colchete" d="M 640 8 H 652 V 292 H 640"/>
            <text class="g-texto-colchete" x="658" y="146">altura</text>
            <text class="g-texto-colchete" x="658" y="166">= 3</text>
          </svg>
        </div>
        <div>
          <div class="abas" role="tablist" aria-label="Conceitos da árvore genérica" id="gAbas">
            <button role="tab" type="button" data-foco="raiz" aria-selected="true">Raiz</button>
            <button role="tab" type="button" data-foco="ramos" aria-selected="false">Ramos</button>
            <button role="tab" type="button" data-foco="folhas" aria-selected="false">Folhas</button>
            <button role="tab" type="button" data-foco="familia" aria-selected="false">Pais / Filhos / Irmãos</button>
            <button role="tab" type="button" data-foco="niveis" aria-selected="false">Níveis</button>
            <button role="tab" type="button" data-foco="altura" aria-selected="false">Altura</button>
          </div>
          <div class="cartao g-explica" role="tabpanel" aria-live="polite" id="gTexto"></div>
          <div class="cartao">
            <h3>Representação aninhada</h3>
            <div class="g-aninhada mono" aria-label="Representação aninhada da árvore">(A (B (D)(F)) (C (G)) (E))</div>
            <p class="nota" style="margin-top:8px">Cada par de parênteses é um nó. Depois do valor, vêm entre parênteses os filhos dele; uma folha aparece sozinha, como <span class="mono">(E)</span>.</p>
          </div>
        </div>
      </div>
      <p class="transicao">Na árvore binária, cada nó tem no máximo 2 filhos: um à esquerda e um à direita.</p>
    </section>

    <!-- ===================================================================
         SEÇÃO 2 — ÁRVORE BINÁRIA (simulador + modo manuscrito)
         =================================================================== -->
    <section id="binaria" class="secao" aria-labelledby="tituloBinaria">
      <h2 id="tituloBinaria" class="nao-imprimir">2 · Árvore binária</h2>

      <div class="nao-imprimir">
        <div class="cartao">
          <h3>O que é</h3>
          <p>A árvore binária parte de um <strong>nó raiz</strong> que guarda dois ponteiros: um para o filho da esquerda e outro para o filho da direita.
             Cada filho é, por sua vez, a raiz de uma <strong>subárvore</strong> com a mesma forma. Por isso o raciocínio é recursivo.</p>
          <h3>Como inserir um valor</h3>
          <ol style="margin:0 0 .5em 1.2em; padding:0">
            <li>Árvore vazia: o primeiro valor vira a raiz.</li>
            <li>Senão, compare o valor com o nó atual, começando pela raiz. Menor: segue para a esquerda. Maior: segue para a direita (regra usada nos exemplos da aula).</li>
            <li>Repita até encontrar um ponteiro nulo. É ali que o novo nó entra.</li>
          </ol>
          <div class="chave" aria-label="Legenda do desenho">
            <span><i class="e"></i> seta vermelha = filho esquerdo</span>
            <span><i class="d"></i> seta azul = filho direito</span>
            <span>
              <svg width="30" height="26" viewBox="0 0 30 26" aria-hidden="true"><path d="M15 0 V12 M5 12 H25 M9 17 H21 M13 22 H17" stroke="#555" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>
              = ponteiro nulo (sem filho)
            </span>
          </div>
          <p class="nota" style="margin-top:8px">Altura = número de níveis (raiz no nível 1; árvore vazia = 0; só a raiz = 1). Nó folha = nó sem filhos.</p>
        </div>
      </div>

      <div class="abas nao-imprimir" role="tablist" aria-label="Modo da seção binária">
        <button type="button" role="tab" id="abaSim" aria-selected="true" aria-controls="painelSimulador">Simulador</button>
        <button type="button" role="tab" id="abaMs" aria-selected="false" aria-controls="painelManuscrito">Modo manuscrito (lista de exercícios)</button>
      </div>

      <!-- ============================ SIMULADOR ============================ -->
      <div id="painelSimulador" role="tabpanel" aria-labelledby="abaSim" class="nao-imprimir">
        <div class="sim-grade">

          <div><!-- coluna esquerda: palco + controles -->
            <div class="cartao palco-cartao c-palco">
              <div class="palco" id="palco">
                <svg id="svgArvore" role="img" aria-label="Árvore binária vazia">
                  <g id="gAresta"></g>
                  <g id="gChao"></g>
                  <g id="gNos"></g>
                  <g id="gVazio" opacity="0">
                    <g class="rotulo-raiz"><text x="0" y="0">Raiz</text></g>
                  </g>
                  <g id="gRaizRot" class="rotulo-raiz" opacity="0">
                    <text x="0" y="-58">Raiz</text>
                    <line x1="0" y1="-50" x2="0" y2="-38"/>
                    <polygon points="0,-29 -5,-39 5,-39"/>
                  </g>
                  <g id="gCursor" opacity="0">
                    <circle class="cursor-anel" r="28"/>
                    <g class="cursor-pilula"><rect x="30" y="-30" width="64" height="20" rx="10"/><text x="62" y="-20"></text></g>
                  </g>
                </svg>
              </div>
              <div class="zoom">
                <button type="button" id="zMenos" aria-label="Diminuir o zoom">−</button>
                <button type="button" id="zMais" aria-label="Aumentar o zoom">+</button>
                <button type="button" id="zAjustar" aria-pressed="true">Ajustar à largura</button>
                <span class="nota" id="zInfo"></span>
              </div>
            </div>

            <div class="cartao c-ctrl">
              <div class="linha-op">
                <label for="campoValor">Valor</label>
                <input id="campoValor" type="number" step="1" inputmode="numeric" placeholder="ex.: 27 ou -5" autocomplete="off">
                <button type="button" id="btnInserir" class="primario">Inserir</button>
                <button type="button" id="btnRemover">Remover</button>
                <button type="button" id="btnLimpar" class="perigo">Limpar</button>
              </div>
              <p class="nota" style="margin:6px 0 0">Enter insere. Aceita números negativos; valores repetidos são recusados.
                <strong>Convenção do simulador:</strong> a regra de remoção abaixo não faz parte dos slides (eles não ensinam remoção na binária); ela vem da lista de exercícios, item v.</p>

              <div class="player" role="group" aria-label="Controle da animação">
                <button type="button" id="btnAnterior">◀ Anterior</button>
                <button type="button" id="btnPlay" class="primario">▶ Play</button>
                <button type="button" id="btnProximo">Próximo ▶</button>
                <button type="button" id="btnFim" aria-label="Ir ao último passo">Ir ao fim ⏭</button>
                <label for="selVelocidade">Velocidade</label>
                <select id="selVelocidade">
                  <option value="0.5">0,5x</option><option value="1" selected>1x</option><option value="1.5">1,5x</option>
                  <option value="2">2x</option><option value="3">3x</option>
                </select>
              </div>
              <div class="player">
                <div class="barra">
                  <label for="barraProgresso" class="nota">Progresso (clique ou arraste para ir a um passo)</label>
                  <input type="range" id="barraProgresso" min="0" max="0" value="0" step="1">
                </div>
                <span class="estado-passo" id="estadoPasso">Passo 0 de 0</span>
              </div>
            </div>

            <div class="cartao c-presets">
              <h3>Exemplos prontos <span class="selo">sempre partem da árvore vazia</span></h3>
              <div class="presets" role="group" aria-label="Escolha do exemplo" id="presets"></div>
              <div class="preset-info" id="presetInfo"></div>
              <div class="opcoes-linha" role="radiogroup" aria-label="Modo de execução">
                <span>Execução:</span>
                <label><input type="radio" name="modoPreset" value="auto" checked> rodar tudo (automático)</label>
                <label><input type="radio" name="modoPreset" value="passo"> passo a passo</label>
              </div>
              <div class="linha-op">
                <button type="button" id="btnCarregar" class="primario">Carregar inserções</button>
                <button type="button" id="btnExecRem">Executar remoções</button>
              </div>
            </div>
          </div>

          <div><!-- coluna direita: painéis ao vivo -->
            <div class="cartao c-legenda">
              <h3>Legenda do passo</h3>
              <div class="legenda" id="legenda" role="status" aria-live="polite" aria-atomic="true"></div>
            </div>
            <div class="cartao c-folhas">
              <h3>Nós folhas</h3>
              <div class="chips" id="chipsFolhas" aria-label="Valores das folhas"></div>
              <button type="button" id="btnDestacar" aria-pressed="false">Destacar folhas na árvore</button>
              <h3 style="margin-top:14px">Altura</h3>
              <div><span class="altura-num" id="alturaNum">0</span> <span class="nota">níveis</span></div>
            </div>
            <div class="cartao c-ani">
              <h3>Representação aninhada</h3>
              <div class="linha-op" style="margin-bottom:6px">
                <label for="selFormato">Formato</label>
                <select id="selFormato">
                  <option value="slide">Formato do slide (padrão)</option>
                  <option value="alternativo">Formato com lado vazio marcado</option>
                </select>
              </div>
              <div class="aninhada-saida mono" id="aninhadaSaida">()</div>
              <p class="aviso-ambiguo" id="avisoAmbiguo">
                Atenção: no formato do slide, um nó com um só filho não mostra o lado: <span class="mono">(4 (2))</span> serve tanto para filho esquerdo quanto para direito.
                No formato alternativo o lado vazio aparece como <span class="mono">()</span>: <span class="mono">(4 (2) ())</span> ou <span class="mono">(4 () (2))</span>.
              </p>
            </div>
            <div class="cartao c-hist">
              <h3>Histórico de operações</h3>
              <ol class="historico" id="historico" aria-label="Histórico de operações"></ol>
              <p class="nota" id="historicoVazio">Nenhuma operação ainda.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================ MODO MANUSCRITO ============================ -->
      <div id="painelManuscrito" role="tabpanel" aria-labelledby="abaMs" hidden>
        <div class="ms-barra nao-imprimir">
          <label for="selMs">Exercício</label>
          <select id="selMs">
            <option value="lista1">Lista 1 completa (1a + 1b + 1c)</option>
            <option value="aula">Exemplo da aula</option>
            <option value="1a">1a · Árvore 1</option>
            <option value="1b">1b · Árvore 2</option>
            <option value="1c">1c · Árvore 3</option>
          </select>
          <label for="selFormatoMs">Aninhada</label>
          <select id="selFormatoMs">
            <option value="slide">Formato do slide</option>
            <option value="alternativo">Lado vazio marcado</option>
          </select>
          <button type="button" id="btnImprimir" class="primario">Imprimir / Exportar PDF</button>
        </div>
        <p class="nota nao-imprimir">Cada quadro mostra a árvore logo depois de uma operação, como se pede no desenho manuscrito. Na impressão, a aresta esquerda sai contínua e a direita tracejada, para não depender de cor.
          A regra de remoção é convenção do simulador (sucessor em-ordem).</p>
        <div id="saidaManuscrito"></div>
      </div>

    </section>
    </div>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a página inicial</a></p>
  </footer>

  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/arvores-motor.js"></script>
  <script src="../assets/js/arvores.js"></script>
</body>
</html>
