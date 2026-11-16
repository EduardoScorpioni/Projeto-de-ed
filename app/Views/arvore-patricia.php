<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Árvore Patricia | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/arvore.css">
</head>
<body>
  <?php $paginaAtual = 'arvore-patricia'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main>
    <section class="tree-hero">
      <div>
        <p class="eyebrow">Módulo 07 · Trie compactada</p>
        <h1 data-typed="Árvore Patricia">Árvore Patricia</h1>
        <p>
          A Patricia (Practical Algorithm To Retrieve Information Coded In Alphanumeric)
          comprime sequências de nós que possuem um único filho. Cada aresta pode guardar
          um trecho inteiro da chave, reduzindo nós intermediários.
        </p>
      </div>
      <img src="../assets/img/arvore-patricia.svg" alt="Diagrama de uma Árvore Patricia com os caminhos ca e rro compactados">
    </section>

    <section class="tree-content">
      <article>
        <h2>Compressão de caminhos</h2>
        <p>
          Em uma Trie comum, <strong>carro</strong> ocupa um nó por caractere. Se não existe
          ramificação entre <strong>r-r-o</strong>, a Patricia substitui essa cadeia por uma
          única aresta rotulada <strong>rro</strong>. As divisões aparecem somente onde as
          chaves realmente divergem ou onde uma palavra termina.
        </p>
        <p>
          A busca compara trechos, não apenas caracteres isolados. Quando uma nova palavra
          coincide parcialmente com um rótulo, o nó é dividido no maior prefixo comum.
        </p>
        <h2>Aplicações</h2>
        <ul>
          <li>Tabelas de roteamento e endereços IP.</li>
          <li>Índices compactos para chaves textuais ou binárias.</li>
          <li>Dicionários grandes com muitos prefixos sem ramificação.</li>
        </ul>
      </article>
      <aside class="tree-note">
        <h2>Trie × Patricia</h2>
        <ul>
          <li><strong>Trie:</strong> um caractere por ligação.</li>
          <li><strong>Patricia:</strong> um trecho por ligação.</li>
          <li><strong>Vantagem:</strong> menos nós e menor profundidade.</li>
          <li><strong>Cuidado:</strong> inserção e remoção precisam dividir e unir rótulos.</li>
        </ul>
      </aside>
    </section>

    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Laboratório interativo</p>
        <h2>Observe a compactação acontecer</h2>
        <p>Experimente inserir “casinha” ou remover “casa”. Caminhos sem ramificação são unidos novamente.</p>
      </div>
      <div class="tree-lab" data-tree-lab="patricia" data-initial="casa,caso,carro,gato">
        <div class="tree-lab__toolbar">
          <label>
            <span class="eyebrow">Palavra</span>
            <input class="tree-lab__input" data-tree-input value="carro" maxlength="18" autocomplete="off" aria-label="Palavra para operar na Patricia">
          </label>
          <button class="tree-lab__button tree-lab__button--primary" data-action="insert" type="button">Inserir</button>
          <button class="tree-lab__button" data-action="search" type="button">Buscar</button>
          <button class="tree-lab__button" data-action="remove" type="button">Remover</button>
        </div>
        <p class="tree-lab__status" data-tree-status aria-live="polite">A Patricia começa com casa, caso, carro e gato.</p>
        <div class="tree-lab__viewport" data-tree-view aria-label="Visualização da Árvore Patricia"></div>
        <div class="tree-lab__legend"><span>Nó de decisão</span><span class="is-word">Fim de palavra</span><span class="is-match">Caminho consultado</span></div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="eyebrow">Como adaptar a Trie</p>
        <h2>Operações com rótulos compactados</h2>
      </div>
      <div class="comparison-grid">
        <div class="comparison-card"><strong>1. Compare</strong><p>Encontre o maior prefixo comum entre a chave restante e o rótulo da aresta.</p></div>
        <div class="comparison-card"><strong>2. Divida</strong><p>Se a coincidência for parcial, crie um nó de decisão e separe os dois sufixos.</p></div>
        <div class="comparison-card"><strong>3. Recomprima</strong><p>Após remover, una um nó não terminal que ficou com apenas um filho.</p></div>
      </div>
    </section>

    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Implementação em C#</p>
        <h2>Busca por segmentos</h2>
        <p>O exemplo destaca a ideia central: comparar o prefixo comum e avançar pelo tamanho do rótulo armazenado.</p>
      </div>
      <div class="code-card" data-src="src-patricia">
        <div class="code-card__bar"><span class="code-card__lang">C#</span><span class="code-card__name">ArvorePatricia.cs</span><button class="code-card__copy" type="button"><span class="code-card__copy-label">Copiar</span></button></div>
        <pre class="code-block"><code></code></pre>
      </div>
    </section>

    <section class="gamification-cta">
      <div class="gamification-cta__inner">
        <div><p class="eyebrow">BrunoCoins</p><h2>Domine a compactação de prefixos</h2><p>Responda aos desafios de Trie e Patricia e fortaleça seu personagem.</p>
          <div class="gamification-cta__actions"><a class="button primary" href="gamificacao.php">Ir para gameficação</a><a class="button secondary" href="arvore-trie.php">Rever Trie</a></div>
        </div><span class="gamification-cta__coins">BC</span>
      </div>
    </section>
  </main>

  <footer class="footer"><p><a href="../index.php">Voltar para a página inicial</a></p></footer>

  <script type="text/plain" id="src-patricia">
using System;
using System.Collections.Generic;

public class NoPatricia
{
    public bool FimDaPalavra { get; set; }
    public Dictionary<char, ArestaPatricia> Filhos { get; } = new();
}

public class ArestaPatricia
{
    public string Rotulo { get; set; }
    public NoPatricia Destino { get; set; }

    public ArestaPatricia(string rotulo, NoPatricia destino)
    {
        Rotulo = rotulo;
        Destino = destino;
    }
}

public class ArvorePatricia
{
    private readonly NoPatricia raiz = new();

    public bool Buscar(string palavra)
    {
        palavra = palavra.ToLower();
        NoPatricia atual = raiz;
        int indice = 0;

        while (indice < palavra.Length)
        {
            char inicial = palavra[indice];
            if (!atual.Filhos.TryGetValue(inicial, out ArestaPatricia aresta))
                return false;

            if (!palavra.AsSpan(indice).StartsWith(aresta.Rotulo))
                return false;

            indice += aresta.Rotulo.Length;
            atual = aresta.Destino;
        }

        return atual.FimDaPalavra;
    }

    private int TamanhoPrefixoComum(string a, string b)
    {
        int limite = Math.Min(a.Length, b.Length);
        int i = 0;
        while (i < limite && a[i] == b[i]) i++;
        return i;
    }

    // Na inserção, uma coincidência parcial divide a aresta:
    // prefixo comum vira o pai e os dois sufixos viram filhos.
}
  </script>
  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
  <script src="../assets/js/arvore-interativa.js"></script>
</body>
</html>
