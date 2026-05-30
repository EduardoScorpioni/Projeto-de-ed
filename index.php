<?php require_once 'includes/sessao.php'; ?>
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
      <a href="index.php" aria-current="page">Início</a>
      <a href="pages/tad.php">TAD</a>
      <a href="pages/lista-simples.php">Lista simples</a>
      <a href="pages/lista-dupla.php">Lista dupla</a>
      <?php if (estaLogado()): ?>
        <a href="pages/dashboard.php">Dashboard</a>
        <a href="pages/logout.php">Sair</a>
      <?php else: ?>
        <a href="pages/login.php">Login</a>
        <a href="pages/cadastro.php">Cadastro</a>
      <?php endif; ?>
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
          <a class="button secondary" href="https://youtu.be/K_3Bq_ZfJmo?si=aXbat6x9ArW5jODM">Como utilizar a linguagem C#</a>
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
          Formas de organizar e gerenciar dados na memória. A estrutura certa
          define o desempenho de inserir, buscar e remover.
        </p>
      </div>
    </section>

    <!-- ===== Navegação interna ===== -->
    <nav class="anchor-nav" aria-label="Ir para seção">
      <span class="anchor-nav-label">Ir para:</span>
      <a href="#tad">TAD</a>
      <a href="#struct">Struct</a>
      <a href="#lista-simples">Lista simples</a>
      <a href="#lista-dupla">Lista dupla</a>
    </nav>

    <!-- ===== TAD ===== -->
    <section id="tad" class="section topic alt-section">
      <figure class="topic-media">
        <img src="docs/imagens-pdfs/tad-struct-explicativo/04-tad-cliente.svg" loading="lazy" alt="Modelo visual de um TAD Cliente">
      </figure>
      <div class="topic-body">
        <p class="eyebrow">Módulo 01 — TAD</p>
        <h2>Tipo Abstrato de Dados</h2>
        <p>Um contrato: define o que a estrutura faz, sem revelar como faz por dentro.</p>
        <pre class="code-block"><code>public struct Cliente
{
    // Dados
    public string Nome;
    public string Email;

     // Operação do TAD
    public void Imprimir()
    {
        Console.WriteLine("Nome: " + this.Nome);
        Console.WriteLine("E-mail: " + this.Email);
    }
}</code></pre>
        <a class="link-more" href="pages/tad.php">Ver página completa &rarr;</a>
      </div>
    </section>

    <!-- ===== Struct ===== -->
    <section id="struct" class="section topic topic--reverse">
      <figure class="topic-media">
        <img src="docs/imagens-pdfs/exercicios-struct-explicativo/01-struct-como-tad.svg" loading="lazy" alt="Resumo dos exercícios de struct como TAD">
      </figure>
      <div class="topic-body">
        <p class="eyebrow">Módulo 01 — Struct</p>
        <h2>Struct em C#</h2>
        <p>Agrupa dados relacionados em um único tipo. É armazenada na stack.</p>
        <pre class="code-block"><code>public struct Ponto
{
    public int X;
    public int Y;
}

Ponto p = new();
p.X = 10;
p.Y = 5;</code></pre>
        <a class="link-more" href="pages/tad.php">Ver página completa &rarr;</a>
      </div>
    </section>

    <!-- ===== Lista Simples ===== -->
    <section id="lista-simples" class="section topic alt-section">
      <figure class="topic-media">
        <img src="docs/imagens-pdfs/lista-encadeada-explicativo/01-lista-encadeada-simples.svg" loading="lazy" alt="Resumo visual sobre lista simplesmente encadeada">
      </figure>
      <div class="topic-body">
        <p class="eyebrow">Módulo 02</p>
        <h2>Lista Simplesmente Encadeada</h2>
        <p>Nós em sequência: cada um aponta para o próximo. Inserir no início é O(1).</p>
        <pre class="code-block"><code>public class No
{
    public int valor;
    public No prox;
    public No(int valor) { this.valor = valor; this.prox = null; }
}</code></pre>
        <a class="link-more" href="pages/lista-simples.php">Ver página completa &rarr;</a>
      </div>
    </section>

    <!-- ===== Lista Duplamente Encadeada ===== -->
    <section id="lista-dupla" class="section topic topic--reverse">
      <figure class="topic-media">
        <img src="docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/01-lista-duplamente-encadeada.svg" loading="lazy" alt="Resumo visual sobre lista duplamente encadeada">
      </figure>
      <div class="topic-body">
        <p class="eyebrow">Módulo 03</p>
        <h2>Lista Duplamente Encadeada</h2>
        <p>Cada nó conhece o próximo e o anterior. Navega nos dois sentidos.</p>
        <pre class="code-block"><code>public class NoDuplo
{
    public int valor;
    public NoDuplo anterior;
    public NoDuplo proximo;
}

public void InserirInicio(int valor)
{
    NoDuplo novo = new NoDuplo(valor);
    novo.proximo = inicio;
    if (inicio != null) inicio.anterior = novo;
    inicio = novo;
}</code></pre>
        <a class="link-more" href="pages/lista-dupla.php">Ver página completa &rarr;</a>
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

  <script src="assets/js/image-lightbox.js"></script>
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
