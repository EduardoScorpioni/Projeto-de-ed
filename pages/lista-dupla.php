<?php require_once '../includes/sessao.php'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista Duplamente Encadeada | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/lista-dupla.css">
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
      <a href="lista-simples.php">Lista simples</a>
      <a href="lista-dupla.php" aria-current="page">Lista dupla</a>
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
        <p class="eyebrow">Módulo 03</p>
        <h1 data-typed="Lista Duplamente Encadeada">Lista Duplamente Encadeada</h1>
        <p>
          Cada nó possui duas referências: uma para o próximo elemento e outra
          para o elemento anterior.
        </p>
      </div>
      <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/01-lista-duplamente-encadeada.svg" alt="Resumo visual sobre lista duplamente encadeada">
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Diferença para a lista simples</h2>
        <p>
          Na lista simples o percurso natural acontece apenas para frente. Na
          lista dupla, a presença do ponteiro anterior permite andar nos dois
          sentidos, o que ajuda em remoções e navegações mais flexíveis.
        </p>
        <p>
          O custo dessa flexibilidade é o cuidado extra com os ponteiros. Ao
          inserir ou remover um nó, é necessário atualizar tanto a ligação do
          próximo quanto a ligação do anterior.
        </p>
      </article>

      <aside class="side-note">
        <h2>Pontos para demonstrar</h2>
        <ul>
          <li>Ponteiro anterior.</li>
          <li>Ponteiro próximo.</li>
          <li>Inserção no início e no fim.</li>
          <li>Remoção mantendo a cadeia correta.</li>
        </ul>
      </aside>
    </section>

    <section class="section compact">
      <div class="section-heading">
        <p class="eyebrow">Exemplo em C#</p>
        <h2>Modelo de nó duplo</h2>
      </div>

      <pre class="code-block"><code>public class NoDuplo
{
    public int valor;
    public NoDuplo anterior;
    public NoDuplo proximo;

    public NoDuplo(int valor)
    {
        this.valor = valor;
        this.anterior = null;
        this.proximo = null;
    }
}</code></pre>
    </section>

    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Material visual</p>
        <h2>Lista dupla em imagens</h2>
        <p>As imagens abaixo acompanham cada segmento da matéria: composição do nó, percurso, inserção, remoção, código e resumo.</p>
      </div>

      <div class="visual-grid">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/02-anterior-valor-proximo.svg" alt="Nó duplo com anterior, valor e próximo" loading="lazy">
          <figcaption><strong>Nó duplo</strong>Mostra anterior, valor e próximo dentro do mesmo nó.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/03-a-lista-anda-nos-dois-sentidos.svg" alt="Percurso nos dois sentidos em lista duplamente encadeada" loading="lazy">
          <figcaption><strong>Percurso</strong>Explica como a lista anda do início ao fim e do fim ao início.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/04-como-inserir-um-novo-no.svg" alt="Inserção em lista duplamente encadeada" loading="lazy">
          <figcaption><strong>Inserção</strong>Mostra a atualização dos ponteiros do novo nó e dos vizinhos.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/05-como-remover-sem-quebrar-a-lista.svg" alt="Remoção em lista duplamente encadeada" loading="lazy">
          <figcaption><strong>Remoção</strong>Explica como religar os vizinhos sem quebrar a lista.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/06-modelo-de-no-duplo-em-c.svg" alt="Código em C# para nó duplo" loading="lazy">
          <figcaption><strong>Código em C#</strong>Apresenta a classe NoDuplo com anterior e próximo.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/lista-duplamente-encadeada-explicativo/07-vantagens-e-cuidados.svg" alt="Vantagens e cuidados da lista duplamente encadeada" loading="lazy">
          <figcaption><strong>Vantagens e cuidados</strong>Resume benefícios, memória extra e erros comuns.</figcaption>
        </figure>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a página inicial</a></p>
  </footer>
  <script src="../assets/js/image-lightbox.js"></script>
  <script src="../assets/js/typed-title.js"></script>
</body>
</html>
