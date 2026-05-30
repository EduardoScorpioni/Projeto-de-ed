<?php require_once '../includes/sessao.php'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TAD | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/tad.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="../index.php" aria-label="Início">
      <span class="brand-mark">ED</span>
      <span>Grupo 6</span>
    </a>

    <nav class="main-nav" aria-label="Navegação principal">
      <a href="../index.php">Início</a>
      <a href="tad.php" aria-current="page">TAD</a>
      <a href="lista-simples.php">Lista simples</a>
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
        <p class="eyebrow">Módulo 01</p>
        <h1>Tipo Abstrato de Dados</h1>
        <p>
          Um TAD define quais operações uma estrutura oferece, sem obrigar o
          usuário a conhecer todos os detalhes internos da implementação.
        </p>
      </div>
      <img src="../docs/imagens-pdfs/tad-struct-explicativo/01-tad-e-struct-em-c.svg" alt="Resumo visual sobre TAD e struct em C#">
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Ideia principal</h2>
        <p>
          Pense em um TAD como um contrato. Ele diz o que pode ser feito:
          inserir, remover, buscar, percorrer ou verificar se está vazio. O modo
          como isso acontece fica escondido dentro da implementação.
        </p>
        <p>
          Essa separação facilita a manutenção. Uma lista pode trocar a forma de
          armazenar dados internamente sem mudar a maneira como o restante do
          programa usa suas operações.
        </p>
      </article>

      <aside class="side-note">
        <h2>Para colocar no trabalho</h2>
        <ul>
          <li>Definição de TAD.</li>
          <li>Importância da abstração.</li>
          <li>Exemplo de TAD Lista.</li>
          <li>Comparação entre interface e implementação.</li>
        </ul>
      </aside>
    </section>

    <section class="section compact">
      <div class="section-heading">
        <p class="eyebrow">Exemplo em C#</p>
        <h2>Um contrato simples para lista</h2>
      </div>

      <pre class="code-block"><code>public interface ILista
{
    bool EstaVazia();
    void InserirInicio(int valor);
    void InserirFim(int valor);
    bool Buscar(int chave);
    void Percorrer();
}</code></pre>
    </section>

    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Material visual</p>
        <h2>TAD e struct em imagens</h2>
        <p>As imagens abaixo acompanham os pontos principais da explicação: conceito de TAD, uso de struct, exemplo de cliente, código e roteiro de modelagem.</p>
      </div>

      <div class="visual-grid">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/02-tipo-abstrato-de-dados.svg" alt="Explicação visual de Tipo Abstrato de Dados" loading="lazy">
          <figcaption><strong>Tipo Abstrato de Dados</strong>Mostra a relação entre dados, operações e abstração.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/03-o-que-e-uma-struct.svg" alt="Explicação visual sobre struct em C#" loading="lazy">
          <figcaption><strong>Struct em C#</strong>Resume quando a struct faz sentido e quais cuidados tomar.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/04-tad-cliente.svg" alt="Modelo visual de um TAD Cliente" loading="lazy">
          <figcaption><strong>TAD Cliente</strong>Organiza dados e operação principal em um exemplo prático.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/05-fluxo-basico-em-c.svg" alt="Código em C# para struct Cliente" loading="lazy">
          <figcaption><strong>Fluxo em C#</strong>Mostra declarar, preencher e executar um método do TAD.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/06-como-pensar-antes-de-programar.svg" alt="Roteiro para pensar antes de programar" loading="lazy">
          <figcaption><strong>Roteiro de modelagem</strong>Ajuda a transformar dados e operações em código.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Exercícios</p>
        <h2>Struct como TAD</h2>
        <p>Este bloco entra como apoio de prática: cada imagem representa um exercício de modelagem com campos, métodos e contexto.</p>
      </div>

      <div class="visual-grid">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/01-struct-como-tad.svg" alt="Resumo dos exercícios de struct como TAD" loading="lazy">
          <figcaption><strong>Resumo da lista</strong>Apresenta objetivo, entrega e forma de estudar os exercícios.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/02-jogadorfutebol.svg" alt="Exercício JogadorFutebol com dados e operações" loading="lazy">
          <figcaption><strong>JogadorFutebol</strong>Modelo com cartões, clube e vínculo do jogador.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/03-equipeesports.svg" alt="Exercício EquipeEsports com dados e operações" loading="lazy">
          <figcaption><strong>EquipeEsports</strong>Modelo com campeonatos, premiações e ano de estreia.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/04-produto.svg" alt="Exercício Produto com dados e operações" loading="lazy">
          <figcaption><strong>Produto</strong>Modelo com preço, estoque, disponibilidade e desconto.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/05-professor.svg" alt="Exercício Professor com dados e operações" loading="lazy">
          <figcaption><strong>Professor</strong>Modelo com salário, faltas e carga horária.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/06-como-resolver-cada-exercicio.svg" alt="Roteiro para resolver cada exercício de struct" loading="lazy">
          <figcaption><strong>Como resolver</strong>Roteiro com campos, métodos, testes e commits.</figcaption>
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
