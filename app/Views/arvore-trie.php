<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Árvore Trie | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/arvore.css">
</head>
<body>
  <?php $paginaAtual = 'arvore-trie'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main>
    <section class="tree-hero">
      <div>
        <p class="eyebrow">Módulo 06 · Árvore de prefixos</p>
        <h1 data-typed="Árvore Trie">Árvore Trie</h1>
        <p>
          A Trie organiza palavras caractere por caractere. Palavras com o mesmo
          prefixo percorrem o mesmo caminho, tornando buscas e sugestões previsíveis
          em função do tamanho da chave.
        </p>
      </div>
      <img src="../assets/img/arvore-trie.svg" alt="Diagrama de uma Trie compartilhando os prefixos das palavras casa, caso e carro">
    </section>

    <section class="tree-content">
      <article>
        <h2>Como a estrutura funciona</h2>
        <p>
          A raiz não representa uma letra. Cada aresta conduz a um caractere e cada
          caminho forma um prefixo. Ao inserir <strong>casa</strong> e <strong>caso</strong>,
          os nós <strong>c-a-s</strong> são compartilhados; apenas a última letra cria
          uma ramificação.
        </p>
        <p>
          Um marcador de fim é indispensável: ele diferencia uma palavra completa de
          um prefixo. Assim, <strong>mar</strong> pode coexistir com <strong>marte</strong>
          sem ambiguidade.
        </p>
        <h2>Onde é usada</h2>
        <ul>
          <li>Autocompletar e busca por prefixo.</li>
          <li>Dicionários, corretores e filtros de palavras.</li>
          <li>Roteamento por sequências e indexação textual.</li>
        </ul>
      </article>
      <aside class="tree-note">
        <h2>Complexidade</h2>
        <ul>
          <li><strong>Inserção:</strong> O(m)</li>
          <li><strong>Busca:</strong> O(m)</li>
          <li><strong>Remoção:</strong> O(m)</li>
          <li><strong>m:</strong> quantidade de caracteres da palavra.</li>
        </ul>
        <p>O custo independe diretamente da quantidade total de palavras, mas o consumo de memória pode ser alto.</p>
      </aside>
    </section>

    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Laboratório interativo</p>
        <h2>Monte e explore uma Trie</h2>
        <p>Insira, busque ou remova palavras. Nós verdes marcam palavras completas; o contorno âmbar mostra o caminho pesquisado.</p>
      </div>
      <div class="tree-lab" data-tree-lab="trie" data-initial="casa,caso,carro,gato">
        <div class="tree-lab__toolbar">
          <label>
            <span class="eyebrow">Palavra</span>
            <input class="tree-lab__input" data-tree-input value="casa" maxlength="18" autocomplete="off" aria-label="Palavra para operar na Trie">
          </label>
          <button class="tree-lab__button tree-lab__button--primary" data-action="insert" type="button">Inserir</button>
          <button class="tree-lab__button" data-action="search" type="button">Buscar</button>
          <button class="tree-lab__button" data-action="remove" type="button">Remover</button>
        </div>
        <p class="tree-lab__status" data-tree-status aria-live="polite">A Trie começa com casa, caso, carro e gato.</p>
        <div class="tree-lab__viewport" data-tree-view aria-label="Visualização da Árvore Trie"></div>
        <div class="tree-lab__legend"><span>Nó de prefixo</span><span class="is-word">Fim de palavra</span><span class="is-match">Caminho consultado</span></div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="eyebrow">Passo a passo</p>
        <h2>Operações essenciais</h2>
      </div>
      <div class="comparison-grid">
        <div class="comparison-card"><strong>1. Inserir</strong><p>Percorra os caracteres e crie somente os filhos que ainda não existem. Marque o último nó.</p></div>
        <div class="comparison-card"><strong>2. Buscar</strong><p>Siga um filho por caractere. A palavra existe apenas se o caminho terminar em um nó marcado.</p></div>
        <div class="comparison-card"><strong>3. Remover</strong><p>Desmarque o fim e elimine de baixo para cima apenas os nós que não atendem outra palavra.</p></div>
      </div>
    </section>

    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Implementação em C#</p>
        <h2>Nó e operações da Trie</h2>
        <p>O dicionário associa cada caractere ao próximo nó. O marcador informa se o caminho forma uma palavra completa.</p>
      </div>
      <div class="code-card" data-src="src-trie">
        <div class="code-card__bar"><span class="code-card__lang">C#</span><span class="code-card__name">ArvoreTrie.cs</span><button class="code-card__copy" type="button"><span class="code-card__copy-label">Copiar</span></button></div>
        <pre class="code-block"><code></code></pre>
      </div>
    </section>

    <section class="gamification-cta">
      <div class="gamification-cta__inner">
        <div><p class="eyebrow">BrunoCoins</p><h2>Teste seus conhecimentos sobre Trie</h2><p>Revise prefixos, fim de palavra e complexidade no modo gamificado.</p>
          <div class="gamification-cta__actions"><a class="button primary" href="gamificacao.php">Ir para gameficação</a><a class="button secondary" href="arvore-patricia.php">Comparar com Patricia</a></div>
        </div><span class="gamification-cta__coins">BC</span>
      </div>
    </section>
  </main>

  <footer class="footer"><p><a href="../index.php">Voltar para a página inicial</a></p></footer>

  <script type="text/plain" id="src-trie">
using System.Collections.Generic;

public class NoTrie
{
    public Dictionary<char, NoTrie> Filhos { get; } = new();
    public bool FimDaPalavra { get; set; }
}

public class ArvoreTrie
{
    private readonly NoTrie raiz = new();

    public void Inserir(string palavra)
    {
        NoTrie atual = raiz;
        foreach (char caractere in palavra.ToLower())
        {
            if (!atual.Filhos.ContainsKey(caractere))
                atual.Filhos[caractere] = new NoTrie();

            atual = atual.Filhos[caractere];
        }
        atual.FimDaPalavra = true;
    }

    public bool Buscar(string palavra)
    {
        NoTrie atual = raiz;
        foreach (char caractere in palavra.ToLower())
        {
            if (!atual.Filhos.TryGetValue(caractere, out NoTrie proximo))
                return false;
            atual = proximo;
        }
        return atual.FimDaPalavra;
    }

    public bool ComecaCom(string prefixo)
    {
        NoTrie atual = raiz;
        foreach (char caractere in prefixo.ToLower())
        {
            if (!atual.Filhos.TryGetValue(caractere, out NoTrie proximo))
                return false;
            atual = proximo;
        }
        return true;
    }
}
  </script>
  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
  <script src="../assets/js/arvore-interativa.js"></script>
</body>
</html>
