<?php require_once '../includes/sessao.php'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista Simplesmente Encadeada | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/lista-simples.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="../index.php" aria-label="Início">
      <span class="brand-mark">ED</span>
      <span>Grupo 6</span>
    </a>

    <nav class="main-nav" aria-label="Navegação principal">
      <a href="../index.php">Início</a>
      <a href="tad.php">TAD</a>
      <a href="lista-simples.php" aria-current="page">Lista simples</a>
      <a href="lista-dupla.php">Lista dupla</a>
      <?php if (estaLogado()): ?>
        <a href="dashboard.php">Dashboard</a>
        <a href="logout.php">Sair</a>
      <?php else: ?>
        <a href="login.php">Login</a>
        <a href="cadastro.php">Cadastro</a>
      <?php endif; ?>
    </nav>
  </header>

  <main>
    <section class="page-hero">
      <div>
        <p class="eyebrow">Módulo 02</p>
        <h1>Lista Simplesmente Encadeada</h1>
        <p>
          Estrutura formada por nós. Cada nó guarda um valor e uma referência
          para o próximo nó da sequência.
        </p>
      </div>
      <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/01-lista-encadeada-simples.svg" alt="Resumo visual sobre lista encadeada simples">
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Como funciona</h2>
        <p>
          A lista não precisa guardar seus elementos em posições contínuas da
          memória. Cada elemento conhece apenas o próximo. Por isso, para buscar
          um valor, o percurso normalmente começa no início e avança no sentido
          dos ponteiros.
        </p>
        <p>
          A inserção no início costuma ser rápida: o novo nó aponta para o antigo
          início e, depois disso, ele passa a ser o novo primeiro elemento.
        </p>
      </article>

      <aside class="side-note">
        <h2>Operações essenciais</h2>
        <ul>
          <li>Inserir no início.</li>
          <li>Inserir no fim.</li>
          <li>Buscar um valor.</li>
          <li>Percorrer todos os nós.</li>
          <li>Remover um nó.</li>
        </ul>
      </aside>
    </section>

    <section class="section compact">
      <div class="section-heading">
        <p class="eyebrow">Exemplo da aula</p>
        <h2>Classe No em C#</h2>
      </div>

      <pre class="code-block"><code>public class No
{
    public int valor;
    public No prox;

    public No(int valor)
    {
        this.valor = valor;
        this.prox = null;
    }
}</code></pre>
    </section>

    <section class="section compact alt-section">
      <div class="section-heading">
        <p class="eyebrow">Implementação inicial</p>
        <h2>Inserir no início</h2>
      </div>

      <pre class="code-block"><code>public void InserirInicio(int valor)
{
    No novoNo = new No(valor);

    if (EstaVazia())
    {
        inicio = novoNo;
        fim = novoNo;
    }
    else
    {
        novoNo.prox = inicio;
        inicio = novoNo;
    }
}</code></pre>
    </section>

    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Material visual</p>
        <h2>Conceitos da lista simples</h2>
        <p>Estas imagens acompanham os segmentos teóricos: nó da lista, percurso, inserção no início, inserção no fim, remoção e código base.</p>
      </div>

      <div class="visual-grid">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/02-valor-proximo.svg" alt="Nó da lista simples com valor e próximo" loading="lazy">
          <figcaption><strong>Valor + próximo</strong>Mostra como cada nó guarda um valor e aponta para o próximo.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/03-como-a-lista-e-lida.svg" alt="Percurso em uma lista simplesmente encadeada" loading="lazy">
          <figcaption><strong>Percurso</strong>Explica a leitura sequencial usando uma variável auxiliar.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/04-operacao-rapida.svg" alt="Inserção no início de uma lista simplesmente encadeada" loading="lazy">
          <figcaption><strong>Inserção no início</strong>Mostra por que a operação é rápida quando altera o início.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/05-precisa-chegar-ao-ultimo.svg" alt="Inserção no fim de uma lista simplesmente encadeada" loading="lazy">
          <figcaption><strong>Inserção no fim</strong>Compara o uso com e sem ponteiro fim.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/06-religar-para-nao-perder-a-lista.svg" alt="Remoção em uma lista simplesmente encadeada" loading="lazy">
          <figcaption><strong>Remoção</strong>Mostra a religação necessária para remover um nó do meio.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-explicativo/07-classe-no-e-inserir-no-inicio.svg" alt="Código da classe No e inserção no início em C#" loading="lazy">
          <figcaption><strong>Código em C#</strong>Une a classe No com a operação de inserir no início.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Programação</p>
        <h2>Inserção e busca em imagens</h2>
        <p>Este guia visual detalha os requisitos de programação: base do código, inserções no início, meio e fim, busca e análise de custo.</p>
      </div>

      <div class="visual-grid">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/01-lista-encadeada-requisitos-de-programacao.svg" alt="Resumo dos requisitos de programação da lista encadeada" loading="lazy">
          <figcaption><strong>Requisitos</strong>Resumo da estrutura base e das operações exigidas.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/02-no-inicio-fim-e-tamanho.svg" alt="Base do código com No, início, fim e tamanho" loading="lazy">
          <figcaption><strong>Base do código</strong>Mostra a classe No e as referências de controle da lista.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/03-novo-no-vira-o-primeiro.svg" alt="Inserir no início em lista encadeada" loading="lazy">
          <figcaption><strong>Inserir no início</strong>Mostra o novo nó assumindo a primeira posição.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/04-precisa-parar-no-no-anterior.svg" alt="Inserir no meio em lista encadeada" loading="lazy">
          <figcaption><strong>Inserir no meio</strong>Explica por que é preciso parar no nó anterior.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/05-novo-no-vira-o-ultimo.svg" alt="Inserir no fim em lista encadeada" loading="lazy">
          <figcaption><strong>Inserir no fim</strong>Mostra o novo nó virando o último elemento.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/06-uma-funcao-resolve-inicio-meio-e-fim.svg" alt="Função de busca em lista encadeada" loading="lazy">
          <figcaption><strong>Buscar valor</strong>Apresenta a função que percorre a lista até encontrar ou chegar em null.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/07-melhor-caso.svg" alt="Busca no início da lista encadeada" loading="lazy">
          <figcaption><strong>Busca no início</strong>Mostra o melhor caso, quando o valor está no primeiro nó.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/08-percurso-parcial.svg" alt="Busca no meio da lista encadeada" loading="lazy">
          <figcaption><strong>Busca no meio</strong>Mostra o percurso parcial até encontrar o valor.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/09-pior-caso-com-valor-existente.svg" alt="Busca no fim da lista encadeada" loading="lazy">
          <figcaption><strong>Busca no fim</strong>Mostra o pior caso com valor existente.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-encadeada-requisitos-programacao/10-o-que-muda-entre-inicio-meio-e-fim.svg" alt="Resumo das diferenças entre início, meio e fim" loading="lazy">
          <figcaption><strong>Resumo prático</strong>Compara início, meio e fim nas operações da lista.</figcaption>
        </figure>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a página inicial</a></p>
  </footer>
  <script src="../assets/js/image-lightbox.js"></script>
</body>
</html>
