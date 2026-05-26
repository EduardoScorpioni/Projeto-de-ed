<?php

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grupo 6 | Estrutura de Dados</title>
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/index.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.php" aria-label="Inicio">
      <span class="brand-mark">ED</span>
      <span>Grupo 6</span>
    </a>

    <nav class="main-nav" aria-label="Navegação principal">
      <a href="index.php" aria-current="page">Login</a>
      <a href="index.php" aria-current="page">Início</a>
      <a href="pages/tad.php">TAD</a>
      <a href="pages/lista-simples.php">Lista simples</a>
      <a href="pages/lista-dupla.php">Lista dupla</a>
    </nav>
  </header>

  <main>

    <!-- ===== Hero ===== -->
    <section class="intro-band">
      <div class="intro-copy">
        <p class="eyebrow">Trabalho Prático 2 | Ambiente de ensino</p>
        <h1>
          <span id="typed-title"></span><span class="typed-cursor" aria-hidden="true">|</span>
        </h1>
        <p>
          Base inicial do sistema web do Grupo 6 para apresentar conceitos de
          TAD, listas simplesmente encadeadas, listas duplamente encadeadas,
          diagramas e exemplos em C#.
        </p>
        <div class="intro-actions" aria-label="Acoes principais">
          <a class="button primary" href="pages/lista-simples.php">Ver lista simples</a>
          <a class="button secondary" href="docs/resumo-requisitos.md">Resumo do enunciado</a>
        </div>
      </div>

      <figure class="intro-visual">
         <iframe
          width="500"
          height="320"
          src="https://www.youtube.com/embed/EfF1M7myAyY?start=16"
          title="Estruturas de Dados"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </figure>
      </figure>
    </section>

    <!-- ===== Integrantes ===== -->
    <section class="team-strip" aria-label="Integrantes do grupo">
      <span>Grupo 6</span>
      <strong>Eduardo Viccino Scorpioni</strong>
      <strong>Pedro Brandi Maris</strong>
      <strong>João Pedro de Souza Santos</strong>
    </section>

    <!-- ===== Introdução a ED ===== -->
    <section id="sobre-ed" class="section">
      <div class="section-heading">
        <p class="eyebrow">O que é</p>
        <h2>Estruturas de Dados</h2>
      </div>

      <div class="ed-intro">
        <p>
          Estrutura de Dados é a área da computação que estuda formas de organizar,
          armazenar e gerenciar informações na memória de um computador. A escolha
          certa de estrutura impacta diretamente o desempenho de um programa: ela
          determina quão rápido é possível inserir, buscar e remover dados.
        </p>
        <p>
          Neste site, apresentamos três estruturas fundamentais — TAD, lista
          simplesmente encadeada e lista duplamente encadeada — com explicações,
          diagramas e exemplos de código em C#.
        </p>
      </div>
    </section>

    <!-- ===== Navegação interna ===== -->
    <nav class="anchor-nav" aria-label="Ir para seção">
      <span class="anchor-nav-label">Ir para:</span>
      <a href="#sobre-ed">O que é ED</a>
      <a href="#explicacoes">Explicações</a>
      <a href="#visualizacoes">Visualizações</a>
      <a href="#codigos">Códigos C#</a>
    </nav>

    <!-- ===== Tópicos — cards como links ===== -->
    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Objetivo</p>
        <h2>Tópicos</h2>
      </div>

      <div class="feature-grid">
        <a class="feature-card" href="#explicacoes">
          <span class="card-index">01</span>
          <h3>Explicação clara</h3>
          <p>
            Resumo do que é cada estrutura de dados, por que ela existe e
            em quais situações ela costuma ser utilizada.
          </p>
        </a>

        <a class="feature-card" href="#visualizacoes">
          <span class="card-index">02</span>
          <h3>Visualização</h3>
          <p>
            Diagramas e imagens mostrando a estrutura interna dos nós
            e a relação entre os ponteiros.
          </p>
        </a>

        <a class="feature-card" href="#codigos">
          <span class="card-index">03</span>
          <h3>Código em C#</h3>
          <p>
            Exemplos de implementação em C# para cada estrutura,
            do modelo básico às operações principais.
          </p>
        </a>
      </div>
    </section>

    <!-- ===== 01 — Explicações ===== -->
    <section id="explicacoes" class="section">
      <div class="section-heading">
        <p class="eyebrow">01 — Explicação clara</p>
        <h2>Resumo das estruturas</h2>
      </div>

      <div class="overview-grid">
        <article class="overview-card">
          <h3>TAD — Tipo Abstrato de Dados</h3>
          <p>
            Um TAD define o que uma estrutura pode fazer — suas operações —
            sem revelar como isso é feito internamente. É a separação entre
            contrato e implementação: quem usa não precisa conhecer os detalhes.
          </p>
          <a class="link-more" href="pages/tad.php">Ver página completa &rarr;</a>
        </article>

        <article class="overview-card">
          <h3>Lista simplesmente encadeada</h3>
          <p>
            Sequência de nós onde cada um aponta apenas para o próximo.
            Inserção no início é O(1); busca por valor exige percurso
            linear O(n) a partir do início da lista.
          </p>
          <a class="link-more" href="pages/lista-simples.php">Ver página completa &rarr;</a>
        </article>

        <article class="overview-card">
          <h3>Lista duplamente encadeada</h3>
          <p>
            Cada nó carrega dois ponteiros: próximo e anterior. Permite
            navegação nos dois sentidos e simplifica remoções, pois o nó
            já conhece o seu antecessor.
          </p>
          <a class="link-more" href="pages/lista-dupla.php">Ver página completa &rarr;</a>
        </article>
      </div>
    </section>

    <!-- ===== 02 — Visualizações ===== -->
    <section id="visualizacoes" class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">02 — Visualização</p>
        <h2>Diagramas das estruturas</h2>
      </div>

      <div class="diagram-grid">
        <figure class="diagram-card">
          <img src="assets/img/tad.svg"
               loading="lazy"
               alt="Diagrama de TAD: interface separada da implementação">
          <figcaption>TAD — Interface vs. Implementação</figcaption>
        </figure>

        <figure class="diagram-card">
          <img src="assets/img/lista-simples.svg"
               loading="lazy"
               alt="Nós ligados em sequência, cada um apontando para o próximo">
          <figcaption>Lista simples — nós com ponteiro único</figcaption>
        </figure>

        <figure class="diagram-card">
          <img src="assets/img/lista-dupla.svg"
               loading="lazy"
               alt="Nós com setas bidirecionais, apontando para o próximo e para o anterior">
          <figcaption>Lista dupla — nós com dois ponteiros</figcaption>
        </figure>
      </div>
    </section>

    <!-- ===== 03 — Códigos C# ===== -->
    <section id="codigos" class="section">
      <div class="section-heading">
        <p class="eyebrow">03 — Código em C#</p>
        <h2>Exemplos por estrutura</h2>
      </div>

      <div class="code-examples">
        <details>
          <summary>TAD — Interface ILista</summary>
          <pre class="code-block"><code>public interface ILista
{
    bool EstaVazia();
    void InserirInicio(int valor);
    void InserirFim(int valor);
    bool Buscar(int chave);
    void Percorrer();
}</code></pre>
        </details>

        <details>
          <summary>Lista simples — Classe Nó e inserção no início</summary>
          <pre class="code-block"><code>public class No
{
    public int valor;
    public No prox;
    public No(int valor) { this.valor = valor; this.prox = null; }
}

public void InserirInicio(int valor)
{
    No novo = new No(valor);
    novo.prox = inicio;
    inicio = novo;
}</code></pre>
        </details>

        <details>
          <summary>Lista dupla — Classe NoDuplo e inserção no início</summary>
          <pre class="code-block"><code>public class NoDuplo
{
    public int valor;
    public NoDuplo anterior;
    public NoDuplo proximo;
    public NoDuplo(int valor) { this.valor = valor; anterior = null; proximo = null; }
}

public void InserirInicio(int valor)
{
    NoDuplo novo = new NoDuplo(valor);
    novo.proximo = inicio;
    if (inicio != null) inicio.anterior = novo;
    inicio = novo;
}</code></pre>
        </details>
      </div>
    </section>

    <!-- ===== Módulos — páginas completas ===== -->
    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Módulos</p>
        <h2>Páginas completas</h2>
      </div>

      <div class="module-grid">
        <a class="module-card" href="pages/tad.php">
          <span>TAD</span>
          <h3>Tipo Abstrato de Dados</h3>
          <p>Separação entre comportamento e implementação.</p>
        </a>

        <a class="module-card" href="pages/lista-simples.php">
          <span>Lista 01</span>
          <h3>Simplesmente encadeada</h3>
          <p>Nós ligados por um único ponteiro para o próximo elemento.</p>
        </a>

        <a class="module-card" href="pages/lista-dupla.php">
          <span>Lista 02</span>
          <h3>Duplamente encadeada</h3>
          <p>Nós com referências para o anterior e para o próximo.</p>
        </a>
      </div>
    </section>

  </main>

  <footer class="footer">
    <p>Base web criada para o Trabalho Prático 2 de Estrutura de Dados.</p>
  </footer>

  <script>
    (function () {
      const el = document.getElementById('typed-title');
      const cursor = document.querySelector('.typed-cursor');
      const text = 'Estrutura de Dados';
      let i = 0;

      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i++);
          setTimeout(type, 85);
        } else {
          cursor.classList.add('typed-cursor--done');
        }
      }

      type();
    })();
  </script>
</body>
</html>
