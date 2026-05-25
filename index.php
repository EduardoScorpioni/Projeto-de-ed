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
        <h1>Estrutura de Dados explicada para estudar, visualizar e codificar.</h1>
        <p>
          Base inicial do sistema web do Grupo 6 para apresentar conceitos de
          TAD, listas simplesmente encadeadas, listas duplamente encadeadas, diagramas e exemplos em C#.
        </p>
        <div class="intro-actions" aria-label="Acoes principais">
          <a class="button primary" href="pages/lista-simples.php">Ver lista simples</a>
          <a class="button secondary" href="docs/resumo-requisitos.md">Resumo do enunciado</a>
        </div>
      </div>

      <figure class="intro-visual">
        <video autoplay loop muted playsinline>
          <source src="assets/video/intro.mp4" type="video/mp4">
          <!-- fallback caso o navegador não suporte video -->
          <img src="assets/img/estrutura-dados.svg"
               loading="lazy"
               alt="Mapa visual das estruturas de dados estudadas: TAD, lista simples, lista dupla">
        </video>
      </figure>
    </section>

    <!-- ===== Integrantes ===== -->
    <section class="team-strip" aria-label="Integrantes do grupo">
      <span>Grupo 6</span>
      <strong>Eduardo Viccino Scorpioni</strong>
      <strong>Pedro Brandi Maris</strong>
      <strong>João Pedro de Souza Santos</strong>
    </section>

    <!-- ===== Navegação interna por âncoras ===== -->
    <nav class="anchor-nav" aria-label="Ir para seção">
      <span class="anchor-nav-label">Ir para:</span>
      <a href="#tad">TAD</a>
      <a href="#lista-simples">Lista simples</a>
      <a href="#lista-dupla">Lista dupla</a>
    </nav>

    <!-- ===== Objetivo ===== -->
    <section class="section">
      <div class="section-heading">
        <p class="eyebrow">Objetivo</p>
        <h2>O que este site precisa entregar</h2>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <span class="card-index">01</span>
          <h3>Explicação clara</h3>
          <p>
            Apresentar o que é cada estrutura de dados, por que ela existe e
            em quais situações ela costuma ser utilizada.
          </p>
        </article>

        <article class="feature-card">
          <span class="card-index">02</span>
          <h3>Visualização</h3>
          <p>
            Usar diagramas, imagens, gifs ou vídeos para mostrar a movimentação
            dos nós e a relação entre os ponteiros.
          </p>
        </article>

        <article class="feature-card">
          <span class="card-index">03</span>
          <h3>Código em C#</h3>
          <p>
            Incluir exemplos implementados em C#, seguindo a linguagem pedida
            no enunciado do trabalho.
          </p>
        </article>
      </div>
    </section>

    <!-- ===== TAD ===== -->
    <section id="tad" class="section alt-section">
      <article>
        <div class="section-heading">
          <p class="eyebrow">Módulo 01</p>
          <h2>Tipo Abstrato de Dados (TAD)</h2>
        </div>

        <div class="structure-layout">
          <div class="structure-text">
            <p>
              Um Tipo Abstrato de Dados — mais conhecido pela sigla TAD — é uma forma de
              descrever uma estrutura de dados a partir do que ela faz, e não de como ela
              faz. A ideia central é separar a interface pública (o contrato) da implementação
              interna (os detalhes escondidos).
            </p>

            <blockquote>
              Um TAD define um conjunto de valores e um conjunto de operações que podem
              ser realizadas sobre esses valores — independentemente de como eles são
              armazenados na memória.
            </blockquote>

            <p>
              Na prática, isso significa que quem usa uma lista não precisa saber se ela é
              implementada com vetor ou com ponteiros. O TAD garante que as operações
              disponíveis — como inserir, remover e buscar — vão existir e se comportar de
              forma previsível. Esse princípio é a base de conceitos como encapsulamento e
              abstração na programação orientada a objetos.
            </p>
            <p>
              Em C#, a palavra-chave <code>interface</code> é a ferramenta mais direta para
              representar um TAD: ela declara os métodos sem implementá-los, delegando essa
              responsabilidade à classe concreta que a implementa.
            </p>
          </div>

          <figure class="structure-figure">
            <img src="assets/img/tad.svg"
                 loading="lazy"
                 alt="Diagrama mostrando a separação entre a interface pública (TAD) e a implementação interna da lista">
            <figcaption>
              A interface define o contrato do TAD; a classe concreta esconde os detalhes internos.
            </figcaption>
          </figure>
        </div>

        <!-- [VÍDEO: animação mostrando a diferença entre TAD e implementação concreta] -->

        <div class="code-examples">
          <details>
            <summary>Exemplo básico — Contrato ILista em C#</summary>
            <pre class="code-block"><code>// O TAD Lista: apenas define o que pode ser feito, sem dizer como.
public interface ILista
{
    bool EstaVazia();
    void InserirInicio(int valor);
    void InserirFim(int valor);
    bool Buscar(int chave);
    void Percorrer();
}</code></pre>
          </details>

          <details>
            <summary>Exemplo com operação real — Implementação concreta do TAD</summary>
            <pre class="code-block"><code>// Implementação concreta do TAD usando lista ligada como estrutura interna.
public class ListaLigada : ILista
{
    private No inicio;

    public ListaLigada() { inicio = null; }

    public bool EstaVazia() => inicio == null;

    public void InserirInicio(int valor)
    {
        No novo = new No(valor);
        novo.prox = inicio;
        inicio = novo;
    }

    public void InserirFim(int valor)
    {
        No novo = new No(valor);
        if (EstaVazia()) { inicio = novo; return; }
        No atual = inicio;
        while (atual.prox != null) atual = atual.prox;
        atual.prox = novo;
    }

    public bool Buscar(int chave)
    {
        No atual = inicio;
        while (atual != null)
        {
            if (atual.valor == chave) return true;
            atual = atual.prox;
        }
        return false;
    }

    public void Percorrer()
    {
        No atual = inicio;
        while (atual != null)
        {
            Console.Write(atual.valor + " -> ");
            atual = atual.prox;
        }
        Console.WriteLine("null");
    }
}</code></pre>
          </details>
        </div>
      </article>
    </section>

    <!-- ===== LISTA SIMPLES ===== -->
    <section id="lista-simples" class="section">
      <article>
        <div class="section-heading">
          <p class="eyebrow">Módulo 02</p>
          <h2>Lista Simplesmente Encadeada</h2>
        </div>

        <div class="structure-layout">
          <div class="structure-text">
            <p>
              A lista simplesmente encadeada é uma estrutura dinâmica composta por nós.
              Cada nó armazena um dado — chamado de valor ou chave — e um ponteiro que
              aponta para o próximo nó da sequência. O último nó da lista aponta para
              <code>null</code>, sinalizando o fim da cadeia.
            </p>

            <blockquote>
              Em uma lista simplesmente encadeada, cada nó conhece apenas o seu sucessor.
              O percurso, portanto, só acontece em uma direção: do início ao fim.
            </blockquote>

            <p>
              A principal vantagem dessa estrutura é a flexibilidade na alocação de memória:
              os nós não precisam ocupar posições contíguas. Isso torna inserções no início
              extremamente rápidas — <strong>O(1)</strong> —, já que basta criar um nó e
              apontar para o antigo primeiro elemento.
            </p>
            <p>
              Por outro lado, como não há acesso direto por índice, localizar um elemento
              específico exige percorrer a lista desde o início, resultando em complexidade
              <strong>O(n)</strong> para buscas. Isso contrasta com vetores, onde o acesso
              por posição é O(1).
            </p>
          </div>

          <figure class="structure-figure">
            <img src="assets/img/lista-simples.svg"
                 loading="lazy"
                 alt="Três nós ligados em sequência por ponteiros; cada nó aponta para o próximo e o último aponta para null">
            <figcaption>
              Cada nó mantém o valor e a referência para o próximo. O último nó aponta para null.
            </figcaption>
          </figure>
        </div>

        <!-- [IMAGEM: diagrama detalhado de inserção no início — antes e depois da operação] -->
        <!-- [VÍDEO: animação mostrando inserção e remoção na lista simplesmente encadeada] -->

        <div class="code-examples">
          <details>
            <summary>Exemplo básico — Classe Nó em C#</summary>
            <pre class="code-block"><code>// Unidade básica da lista: guarda o valor e a ligação para o próximo.
public class No
{
    public int valor;
    public No prox;

    public No(int valor)
    {
        this.valor = valor;
        this.prox = null;
    }
}</code></pre>
          </details>

          <details>
            <summary>Exemplo com operação real — Percurso e remoção por valor</summary>
            <pre class="code-block"><code>// Percorre a lista e remove o primeiro nó com o valor informado.
public bool Remover(int chave)
{
    if (EstaVazia()) return false;

    // Caso especial: remover o primeiro nó.
    if (inicio.valor == chave)
    {
        inicio = inicio.prox;
        if (inicio == null) fim = null;
        return true;
    }

    // Percorre até encontrar o antecessor do nó a remover.
    No anterior = inicio;
    while (anterior.prox != null && anterior.prox.valor != chave)
    {
        anterior = anterior.prox;
    }

    if (anterior.prox == null) return false; // não encontrado

    // Ajusta o ponteiro para "pular" o nó removido.
    if (anterior.prox == fim) fim = anterior;
    anterior.prox = anterior.prox.prox;
    return true;
}</code></pre>
          </details>
        </div>
      </article>
    </section>

    <!-- ===== LISTA DUPLA ===== -->
    <section id="lista-dupla" class="section alt-section">
      <article>
        <div class="section-heading">
          <p class="eyebrow">Módulo 03</p>
          <h2>Lista Duplamente Encadeada</h2>
        </div>

        <div class="structure-layout">
          <div class="structure-text">
            <p>
              A lista duplamente encadeada é uma evolução da lista simples. Nela, cada nó
              mantém duas referências: uma para o nó seguinte (<code>proximo</code>) e outra
              para o nó anterior (<code>anterior</code>). Essa estrutura bidirecional permite
              percorrer a lista nos dois sentidos.
            </p>

            <blockquote>
              Com dois ponteiros por nó, a lista dupla oferece navegação bidirecional e
              simplifica operações de remoção, pois o nó já conhece diretamente o seu
              antecessor — sem precisar percorrer a lista para encontrá-lo.
            </blockquote>

            <p>
              A principal vantagem prática está na remoção: em uma lista simples, para remover
              um nó é necessário manter uma referência ao nó anterior durante o percurso.
              Na lista dupla, o nó a ser removido já carrega essa referência, simplificando o
              algoritmo.
            </p>
            <p>
              O custo é o espaço extra em memória — cada nó carrega dois ponteiros em vez de
              um — e a necessidade de atualizar ambas as ligações em qualquer inserção ou
              remoção. Um erro em qualquer dos dois ponteiros pode corromper toda a cadeia.
            </p>
          </div>

          <figure class="structure-figure">
            <img src="assets/img/lista-dupla.svg"
                 loading="lazy"
                 alt="Nós com setas bidirecionais: cada nó aponta para o próximo e para o anterior ao mesmo tempo">
            <figcaption>
              Cada nó possui dois ponteiros. A navegação pode acontecer para frente ou para trás.
            </figcaption>
          </figure>
        </div>

        <!-- [IMAGEM: diagrama comparando um nó simples (1 ponteiro) com um nó duplo (2 ponteiros)] -->
        <!-- [VÍDEO: animação comparando inserção na lista simples versus lista dupla] -->

        <div class="code-examples">
          <details>
            <summary>Exemplo básico — Classe NoDuplo em C#</summary>
            <pre class="code-block"><code>// Nó com dois ponteiros: um para o próximo e um para o anterior.
public class NoDuplo
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
          </details>

          <details>
            <summary>Exemplo com operação real — Inserir no início e no fim mantendo os dois elos</summary>
            <pre class="code-block"><code>// Insere um nó no início da lista e ajusta os dois ponteiros.
public void InserirInicio(int valor)
{
    NoDuplo novo = new NoDuplo(valor);

    if (EstaVazia())
    {
        inicio = novo;
        fim = novo;
        return;
    }

    // O novo nó aponta para quem era o primeiro.
    novo.proximo = inicio;

    // O antigo primeiro agora conhece o seu novo antecessor.
    inicio.anterior = novo;

    // O novo nó passa a ser o início da lista.
    inicio = novo;
}

// Insere um nó no fim da lista e ajusta os dois elos.
public void InserirFim(int valor)
{
    NoDuplo novo = new NoDuplo(valor);

    if (EstaVazia())
    {
        inicio = novo;
        fim = novo;
        return;
    }

    // Liga o antigo fim ao novo nó nos dois sentidos.
    fim.proximo = novo;
    novo.anterior = fim;
    fim = novo;
}</code></pre>
          </details>
        </div>
      </article>
    </section>

    <!-- ===== Módulos (páginas dedicadas) ===== -->
    <section class="section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Conteúdo inicial</p>
        <h2>Modulos prontos para continuar</h2>
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

    <!-- ===== Próximos passos ===== -->
    <section class="section">
      <div class="section-heading">
        <p class="eyebrow">Próximos passos</p>
        <h2>Como evoluir a partir daqui</h2>
      </div>

      <ol class="roadmap">
        <li>
          <strong>Completar os textos.</strong>
          Reescrever com as palavras do grupo e incluir referências das aulas.
        </li>
        <li>
          <strong>Adicionar mídias.</strong>
          Inserir gifs, vídeos curtos ou imagens mostrando inserção, busca e remoção.
        </li>
        <li>
          <strong>Expandir os exemplos.</strong>
          Criar códigos para remover, buscar e percorrer cada estrutura.
        </li>
      </ol>
    </section>

  </main>

  <footer class="footer">
    <p>Base web criada para o Trabalho Prático 2 de Estrutura de Dados.</p>
  </footer>
</body>
</html>
