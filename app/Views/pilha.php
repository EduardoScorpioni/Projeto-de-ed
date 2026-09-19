<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pilha Encadeada | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/pilha.css">
</head>
<body>
  <?php $paginaAtual = 'pilha'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main>
    <section class="page-hero page-hero--sem-imagem">
      <div>
        <p class="eyebrow">Módulo 05 &middot; Aula 8</p>
        <h1 data-typed="Pilha Encadeada (LIFO)">Pilha Encadeada (LIFO)</h1>
        <p>
          <strong>LIFO &mdash; Last In, First Out:</strong> o último elemento a entrar é o
          primeiro a sair. Também conhecida pelo TAD <code>stack</code>. Toda inserção e
          remoção acontece pelo mesmo lado: o <strong>topo</strong>.
        </p>
      </div>
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Como funciona</h2>
        <p>
          Assim como a fila, a pilha é formada por nós ligados por um ponteiro
          <code>prox</code>. A diferença é que só existe um ponto de acesso: o
          <strong>topo</strong>. Empilhar (<code>push</code>) coloca um novo elemento no
          topo; desempilhar (<code>pop</code>) remove o elemento que está no topo.
        </p>
        <p>
          Não existe inserção ou remoção em outro ponto da estrutura &mdash; é essa regra
          única de acesso que caracteriza uma pilha.
        </p>
      </article>

      <aside class="side-note">
        <h2>Operações essenciais</h2>
        <ul>
          <li><strong>Empilhar (push)</strong>: insere no topo.</li>
          <li><strong>Desempilhar (pop)</strong>: remove do topo.</li>
          <li><strong>Consulta</strong>: percorre a pilha procurando um valor.</li>
          <li><strong>Percurso (imprimir)</strong>: mostra os elementos a partir do topo.</li>
        </ul>
      </aside>
    </section>

    <!-- ===== EXEMPLO DA AULA (base dada pelo professor) ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Material da Aula 8</p>
        <h2>Classe base: No e Pilha</h2>
        <p>Base fornecida em aula, com <code>push</code>, <code>pop</code>, <code>estaVazia</code>, <code>consulta</code> e <code>imprimir</code> já implementados.</p>
      </div>

      <div class="exercise__panel">
        <div class="code-card" data-src="src-pilha-no">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">No.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>

        <div class="code-card" data-src="src-pilha-base">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">Pilha.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>
      </div>
    </section>

    <!-- ===== PROGRAM.CS (demo dada pelo professor) ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Testando a base</p>
        <h2>Program.cs</h2>
      </div>

      <div class="code-card" data-src="src-pilha-program">
        <div class="code-card__bar">
          <span class="code-card__lang">C#</span>
          <span class="code-card__name">Program.cs</span>
          <button class="code-card__copy" type="button" aria-label="Copiar código">
            <span class="code-card__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block"><code></code></pre>
      </div>
    </section>

    <!-- ===== LISTA DE EXERCÍCIOS (ainda sem resolução) ===== -->
    <section class="section compact">
      <div class="section-heading">
        <p class="eyebrow">Lista de exercícios &mdash; Pilha Encadeada LIFO</p>
        <h2>Exercícios (resolução pendente)</h2>
        <p class="nota-pendente">
          Estes exercícios ainda não foram resolvidos pelo grupo &mdash; ficam registrados
          aqui como próximo passo, para não inventar uma solução sem ter feito o exercício de verdade.
        </p>
      </div>

      <div class="exercise__panel">
        <div class="practice">
          <p class="practice__tag">Exercício 1</p>
          <p class="practice__goal">
            Pilha Encadeada LIFO em que cada nó representa um <strong>Documento digital</strong>
            (nome do arquivo, extensão, tamanho em KB). Implemente: a) push, b) pop,
            c) consulta (busca), d) percurso (impressão).
          </p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 2</p>
          <p class="practice__goal">Algoritmo que verifica quantos elementos uma pilha possui.</p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 3</p>
          <p class="practice__goal">Algoritmo que verifica quantos números ímpares existem em uma pilha.</p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 4</p>
          <p class="practice__goal">
            Dada uma pilha1 com números positivos e negativos, separar em pilha2 (positivos)
            e pilha3 (negativos). Ex.: Pilha1: 1 -2 7 -15 51 -23 &rarr; Pilha2: 1 7 51 / Pilha3: -2 -15 -23.
          </p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 5</p>
          <p class="practice__goal">
            Pilha em que cada nó é uma letra: inverter a ordem das letras armazenadas.
          </p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 6</p>
          <p class="practice__goal">
            Pilha em que cada nó é uma letra (formando uma palavra ou frase): verificar se é <strong>palíndromo</strong>.
            Ex.: RADAR &rarr; é palíndromo; PROGRAMAR &rarr; não é.
          </p>
        </div>
        <div class="practice">
          <p class="practice__tag">Exercício 7</p>
          <p class="practice__goal">
            Transferir os elementos de uma pilha1 para uma pilha2, preservando a ordem original.
          </p>
        </div>
      </div>
    </section>

    <section class="gamification-cta">
      <div class="gamification-cta__inner">
        <div>
          <p class="eyebrow">BrunoCoins</p>
          <h2>Treine Pilha LIFO jogando</h2>
          <p>Responda desafios sobre empilhar, desempilhar e a pilha de chamadas de função no modo gameficado.</p>
          <div class="gamification-cta__actions">
            <a class="button primary" href="gamificacao.php">Ir para gameficacao</a>
          </div>
        </div>
        <span class="gamification-cta__coins">BC</span>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a página inicial</a></p>
  </footer>

  <!-- Fontes de código (não exibidas; lidas pelo code-tools.js) -->
  <script type="text/plain" id="src-pilha-no">
public class No
{
    public int valor;
    public No prox;

    public No(int valor)
    {
        this.valor = valor;
        this.prox = null;
    }

    public void imprimir()
    {
        Console.WriteLine("Valor: " + this.valor);
    }
}
  </script>

  <script type="text/plain" id="src-pilha-base">
public class Pilha
{
    public No topo;

    public Pilha()
    {
        this.topo = null;
    }

    public Boolean estaVazia()
    {
        if (this.topo == null)
        {
            return true;
        }
        return false;
    }

    // Empilhar: entra sempre pelo topo
    public void push(int valor)
    {
        No novoNo = new No(valor);

        if (this.estaVazia())
        { // PILHA VAZIA!
            this.topo = novoNo;
        }
        else
        {
            novoNo.prox = this.topo;
            this.topo = novoNo;
        }
    }

    // Desempilhar: sai sempre pelo topo
    public No pop()
    {
        No aux = null;
        if (this.estaVazia())
        {
            return aux;
        }
        else
        { // Remoção do topo da pilha
            aux = this.topo;
            this.topo = this.topo.prox;
            return aux;
        }
    }

    public Boolean consulta(int valor, ref No noAtual, ref No noAnterior)
    {
        noAtual = this.topo;
        noAnterior = null;

        while (noAtual != null)
        {
            if (noAtual.valor == valor)
            {
                return true;
            }
            noAnterior = noAtual;
            noAtual = noAtual.prox;
        }
        return false;
    }

    public void imprimir()
    {
        No noAux = this.topo;

        Console.WriteLine("Elementos: ");

        while (noAux != null)
        {
            Console.WriteLine(noAux.valor + " -> ");
            noAux = noAux.prox;
        }
    }
}
  </script>

  <script type="text/plain" id="src-pilha-program">
using System;

namespace FilaFIFO
{
    class Program
    {
        static void Main(string[] args)
        {
            Pilha pilha = new();

            // Inserção
            pilha.push(12);
            pilha.push(7);
            pilha.push(10);

            // Percurso = Impressão
            pilha.imprimir();

            // Consulta
            No noAtual = null;
            No noAnterior = null;
            pilha.consulta(7, ref noAtual, ref noAnterior);

            // Remoção
            pilha.pop();
            pilha.pop();
            pilha.pop();
            pilha.imprimir();
        }
    }
}
  </script>

  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
</body>
</html>
