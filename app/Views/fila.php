<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fila Encadeada | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/fila.css">
</head>
<body>
  <?php $paginaAtual = 'fila'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main>
    <section class="page-hero page-hero--sem-imagem">
      <div>
        <p class="eyebrow">Módulo 04 &middot; Aula 7</p>
        <h1 data-typed="Fila Encadeada (FIFO)">Fila Encadeada (FIFO)</h1>
        <p>
          <strong>FIFO &mdash; First in First Out:</strong> o primeiro elemento a ser inserido
          é o primeiro a ser retirado. Também conhecida pelo TAD <code>queue</code>.
          Aparece o tempo todo no dia a dia: fila bancária, fila do cinema, fila de impressão.
        </p>
      </div>
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Como funciona</h2>
        <p>
          Uma Fila Encadeada é uma Estrutura de Dados que armazena elementos onde o
          primeiro elemento inserido é o primeiro elemento a sair da estrutura, além
          disso cada elemento (cada <strong>nó</strong>) conhece e é conectado com seu sucessor.
        </p>
        <p>
          A fila mantém dois ponteiros de controle: <strong>início</strong> (a cabeça, primeiro
          elemento) e <strong>fim</strong> (a cauda, último elemento). A regra é rígida: só se
          insere pelo fim e só se remove pelo início &mdash; nunca pelo meio.
        </p>
      </article>

      <aside class="side-note">
        <h2>Operações essenciais</h2>
        <ul>
          <li><strong>Inserção / Enfileirar</strong>: sempre no fim da fila.</li>
          <li><strong>Remoção / Desenfileirar</strong>: sempre no início da fila.</li>
          <li><strong>Busca (Consulta)</strong>: percorre a fila procurando um valor.</li>
          <li><strong>Percurso</strong>: imprime todos os elementos, do início ao fim.</li>
        </ul>
      </aside>
    </section>

    <!-- ===== EXEMPLO DA AULA / EXERCÍCIO 1 ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Exemplo da Aula 7 &middot; Exercício 1</p>
        <h2>Classe base: No e Fila</h2>
        <p>Cada nó guarda um valor e o ponteiro <code>prox</code>. A Fila controla <code>inicio</code> e <code>fim</code>, com as operações de inserir (enfileirar), remover (desenfileirar), consultar e percorrer.</p>
      </div>

      <div class="exercise__panel">
        <div class="code-card" data-src="src-fila-no">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">No.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>

        <div class="code-card" data-src="src-fila-base">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">Fila.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>
      </div>
    </section>

    <!-- ===== LISTA DE EXERCÍCIOS (Aula 7) ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Lista de exercícios &mdash; Fila Encadeada FIFO</p>
        <h2>Exercícios resolvidos</h2>
        <p>
          Os exercícios 4 a 7 são métodos adicionados na própria classe <code>Fila</code>
          acima (<code>comparar</code>, <code>quantidade</code>, <code>removerNegativos</code>
          e <code>concatenar</code>). Os exercícios 2 e 3 pedem estruturas novas, mostradas abaixo.
        </p>
      </div>

      <!-- Exercício 2 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 2</p>
            <p class="practice__goal">
              Fila Encadeada FIFO em que cada nó representa um <strong>Cliente de Cinema</strong>
              (nome, idade, valor pago no ingresso, se pagou meia). Implemente: a) inserção,
              b) remoção, c) consulta (busca) por nome, d) percurso (impressão) de todos os clientes.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-no-cliente">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">NoCliente.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-cinema">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">FilaCinema.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 3 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 3</p>
            <p class="practice__goal">
              Fila Encadeada FIFO <strong>Reversa</strong>: o início da fila vira o fim e o fim
              vira o início. A inserção passa a ser no início e a remoção pelo final da fila.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-reversa">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">FilaReversa.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 4 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 4</p>
            <p class="practice__goal">
              Algoritmo que verifica se duas filas possuem a mesma quantidade de elementos,
              ou qual das duas possui mais elementos.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-comparar">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Fila.cs &middot; comparar()</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 5 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 5</p>
            <p class="practice__goal">Algoritmo que verifica quantos elementos uma fila possui.</p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-quantidade">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Fila.cs &middot; quantidade()</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 6 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 6</p>
            <p class="practice__goal">
              Dada uma fila com números inteiros positivos e negativos, remover todos os
              elementos negativos, <strong>sem alterar a ordem</strong> dos elementos que permanecem.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-negativos">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Fila.cs &middot; removerNegativos()</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 7 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 7</p>
            <p class="practice__goal">
              Algoritmo que concatena a fila1 com a fila2, formando uma fila3 nova,
              sem alterar as filas originais.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-fila-concatenar">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Fila.cs &middot; concatenar()</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROGRAM.CS ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Juntando tudo</p>
        <h2>Program.cs &middot; testando os 7 exercícios</h2>
      </div>

      <div class="code-card" data-src="src-fila-program">
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

    <!-- ===== FILA DE PRIORIDADES (pendente) ===== -->
    <section class="section compact alt-section">
      <div class="section-heading">
        <p class="eyebrow">Variação</p>
        <h2>Fila de Prioridades Encadeada</h2>
        <p class="nota-pendente">
          Conteúdo e exemplo de código ainda pendentes &mdash; não fez parte do material
          desta aula, e existem várias formas válidas de implementar (ex.: lista ordenada
          por prioridade), então esta parte não será inventada aqui.
        </p>
        <p>
          A diferença conceitual em relação à fila comum: a ordem de saída não depende só
          da ordem de chegada, mas de um <strong>critério de prioridade</strong> definido
          para cada elemento.
        </p>
      </div>
    </section>

    <section class="gamification-cta">
      <div class="gamification-cta__inner">
        <div>
          <p class="eyebrow">BrunoCoins</p>
          <h2>Treine Fila FIFO jogando</h2>
          <p>Responda desafios sobre enfileirar, desenfileirar e fila de prioridades no modo gameficado.</p>
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
  <script type="text/plain" id="src-fila-no">
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

  <script type="text/plain" id="src-fila-base">
public class Fila
{
    public No inicio;
    public No fim;

    public Fila()
    {
        this.inicio = null;
        this.fim = null;
    }

    public Boolean estaVazia()
    {
        if (this.inicio == null)
        {
            return true;
        }
        return false;
    }

    // Inserção (Enfileirar): sempre no FIM da fila
    public void inserirEnfileirar(int valor)
    {
        No novoNo = new No(valor);

        if (estaVazia())
        { // FILA VAZIA!
            this.inicio = novoNo;
            this.fim = novoNo;
        }
        else
        {
            this.fim.prox = novoNo; // O prox do fim (que era nulo) passa a apontar para o novo no
            this.fim = novoNo;      // Fim passa a ser o novo no
        }
    }

    // Remoção (Desenfileirar): sempre no INICIO da fila — Exercício 1
    public void removerDesenfileirar()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia! Não é possível remover.");
            return;
        }
        else if (this.inicio == this.fim) // Caso exista apenas um elemento na Fila
        {
            this.inicio = null;
            this.fim = null;
        }
        else // Remoção do elemento no inicio da Fila
        {
            this.inicio = this.inicio.prox;
        }
    }

    public Boolean consulta(int valor, ref No noAtual, ref No noAnterior)
    {
        noAtual = this.inicio;
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
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia!");
            return;
        }

        No atual = this.inicio;
        Console.WriteLine("Elementos: ");

        while (atual != null)
        {
            Console.Write(atual.valor + " -> ");
            atual = atual.prox;
        }

        Console.WriteLine();
    }
}
  </script>

  <script type="text/plain" id="src-no-cliente">
public class NoCliente
{
    public string nome;
    public int idade;
    public double valorPagoIngresso;
    public bool pagouMeia;
    public NoCliente prox;

    public NoCliente(string nome, int idade, double valorPagoIngresso, bool pagouMeia)
    {
        this.nome = nome;
        this.idade = idade;
        this.valorPagoIngresso = valorPagoIngresso;
        this.pagouMeia = pagouMeia;
        this.prox = null;
    }

    public void imprimir()
    {
        Console.WriteLine("Nome: " + this.nome +
                           " | Idade: " + this.idade +
                           " | Valor Pago: " + this.valorPagoIngresso +
                           " | Pagou Meia: " + this.pagouMeia);
    }
}
  </script>

  <script type="text/plain" id="src-fila-cinema">
public class FilaCinema
{
    public NoCliente inicio;
    public NoCliente fim;

    public FilaCinema()
    {
        this.inicio = null;
        this.fim = null;
    }

    public bool estaVazia()
    {
        if (this.inicio == null)
        {
            return true;
        }
        return false;
    }

    // a) Inserção de um cliente na fila
    public void inserirEnfileirar(string nome, int idade, double valorPagoIngresso, bool pagouMeia)
    {
        NoCliente novoNo = new NoCliente(nome, idade, valorPagoIngresso, pagouMeia);

        if (estaVazia())
        {
            this.inicio = novoNo;
            this.fim = novoNo;
        }
        else
        {
            this.fim.prox = novoNo;
            this.fim = novoNo;
        }
    }

    // b) Remoção de um cliente da fila
    public void removerDesenfileirar()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia! Não é possível remover.");
            return;
        }
        else if (this.inicio == this.fim)
        {
            this.inicio = null;
            this.fim = null;
        }
        else
        {
            this.inicio = this.inicio.prox;
        }
    }

    // c) Consulta (busca) de um cliente pelo nome
    public bool consulta(string nome, ref NoCliente noAtual, ref NoCliente noAnterior)
    {
        noAtual = this.inicio;
        noAnterior = null;

        while (noAtual != null)
        {
            if (noAtual.nome == nome)
            {
                return true;
            }
            noAnterior = noAtual;
            noAtual = noAtual.prox;
        }
        return false;
    }

    // d) Percurso (impressão) de todos os clientes
    public void imprimir()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia!");
            return;
        }

        NoCliente noAux = this.inicio;
        Console.WriteLine("Clientes do Cinema:");
        while (noAux != null)
        {
            noAux.imprimir();
            noAux = noAux.prox;
        }
    }
}
  </script>

  <script type="text/plain" id="src-fila-reversa">
// Fila Encadeada FIFO Reversa: inserção no INICIO, remoção no FIM.
public class FilaReversa
{
    public No inicio;
    public No fim;

    public FilaReversa()
    {
        this.inicio = null;
        this.fim = null;
    }

    public bool estaVazia()
    {
        if (this.inicio == null)
        {
            return true;
        }
        return false;
    }

    // Inserção no INICIO da lista
    public void inserirEnfileirar(int valor)
    {
        No novoNo = new No(valor);

        if (estaVazia())
        {
            this.inicio = novoNo;
            this.fim = novoNo;
        }
        else
        {
            novoNo.prox = this.inicio;
            this.inicio = novoNo;
        }
    }

    // Remoção no FIM da lista
    public void removerDesenfileirar()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia! Não é possível remover.");
            return;
        }
        else if (this.inicio == this.fim)
        {
            this.inicio = null;
            this.fim = null;
        }
        else
        {
            // precisa percorrer até o penúltimo nó
            No noAtual = this.inicio;
            while (noAtual.prox != this.fim)
            {
                noAtual = noAtual.prox;
            }
            noAtual.prox = null;
            this.fim = noAtual;
        }
    }

    public void imprimir()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia!");
            return;
        }

        No noAux = this.inicio;
        Console.WriteLine("Elementos (Fila Reversa): ");
        while (noAux != null)
        {
            Console.Write(noAux.valor + " -> ");
            noAux = noAux.prox;
        }
        Console.WriteLine();
    }
}
  </script>

  <script type="text/plain" id="src-fila-comparar">
// Compara a quantidade de elementos de duas filas (this = fila1, recebe fila2).
public string comparar(Fila fila2)
{
    No atual1 = this.inicio;
    No atual2 = fila2.inicio;

    int filaQuantidade1 = 0;
    int filaQuantidade2 = 0;

    while (atual1 != null)
    {
        filaQuantidade1++;
        atual1 = atual1.prox;
    }

    while (atual2 != null)
    {
        filaQuantidade2++;
        atual2 = atual2.prox;
    }

    if (filaQuantidade1 == filaQuantidade2)
    {
        return "As duas filas possuem a mesma quantidade de elementos.";
    }
    else if (filaQuantidade1 > filaQuantidade2)
    {
        return "A fila1 possui mais elementos que a fila2.";
    }
    else
    {
        return "A fila2 possui mais elementos que a fila1.";
    }
}
  </script>

  <script type="text/plain" id="src-fila-quantidade">
public int quantidade()
{
    No atual = this.inicio;
    int numero = 0;

    while (atual != null)
    {
        numero++;
        atual = atual.prox;
    }

    return numero;
}
  </script>

  <script type="text/plain" id="src-fila-negativos">
public bool negativo(int valor)
{
    if (valor < 0)
    {
        return true;
    }
    return false;
}

// Remove todos os elementos negativos, sem alterar a ordem dos que permanecem.
public void removerNegativos()
{
    No atual = this.inicio;
    No anterior = null;

    while (atual != null)
    {
        if (negativo(atual.valor))
        {
            if (anterior == null)
            {
                // o proprio "atual" é o inicio da fila
                this.inicio = atual.prox;
            }
            else
            {
                // liga o anterior direto no proximo, "pulando" o atual
                anterior.prox = atual.prox;
            }

            // se o no removido era o fim da fila, atualiza o fim
            if (atual == this.fim)
            {
                this.fim = anterior;
            }

            atual = atual.prox; // avança; "anterior" NÃO muda
        }
        else
        {
            anterior = atual;
            atual = atual.prox;
        }
    }
}
  </script>

  <script type="text/plain" id="src-fila-concatenar">
// Concatena fila1 (this) com fila2, formando uma fila3 nova,
// sem alterar fila1 e fila2 originais.
public Fila concatenar(Fila fila2)
{
    Fila fila3 = new Fila();

    No atual1 = this.inicio;
    while (atual1 != null)
    {
        fila3.inserirEnfileirar(atual1.valor);
        atual1 = atual1.prox;
    }

    No atual2 = fila2.inicio;
    while (atual2 != null)
    {
        fila3.inserirEnfileirar(atual2.valor);
        atual2 = atual2.prox;
    }

    return fila3;
}
  </script>

  <script type="text/plain" id="src-fila-program">
using System;

namespace ListaExercicios_FilaFIFO
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== EXERCÍCIO 1 - Fila e removerDesenfileirar ===");
            Fila fila = new Fila();
            fila.inserirEnfileirar(12);
            fila.inserirEnfileirar(7);
            fila.inserirEnfileirar(10);
            fila.imprimir();
            fila.removerDesenfileirar();
            fila.imprimir();

            No noAtual = null;
            No noAnterior = null;
            bool achou = fila.consulta(10, ref noAtual, ref noAnterior);
            Console.WriteLine("Encontrou o 10? " + achou);
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 2 - Fila de Clientes do Cinema ===");
            FilaCinema filaCinema = new FilaCinema();
            filaCinema.inserirEnfileirar("Ana", 20, 20.0, false);
            filaCinema.inserirEnfileirar("Bruno", 15, 10.0, true);
            filaCinema.imprimir();
            filaCinema.removerDesenfileirar();
            filaCinema.imprimir();
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 3 - Fila Reversa ===");
            FilaReversa filaReversa = new FilaReversa();
            filaReversa.inserirEnfileirar(1);
            filaReversa.inserirEnfileirar(2);
            filaReversa.inserirEnfileirar(3);
            filaReversa.imprimir(); // 3 -> 2 -> 1
            filaReversa.removerDesenfileirar();
            filaReversa.imprimir(); // 3 -> 2
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 4 - Comparar filas ===");
            Fila fila1 = new Fila();
            fila1.inserirEnfileirar(1);
            fila1.inserirEnfileirar(2);

            Fila fila2 = new Fila();
            fila2.inserirEnfileirar(1);

            Console.WriteLine(fila1.comparar(fila2));
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 5 - Quantidade de elementos ===");
            Console.WriteLine("Quantidade da fila1: " + fila1.quantidade());
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 6 - Remover negativos ===");
            Fila filaMista = new Fila();
            filaMista.inserirEnfileirar(5);
            filaMista.inserirEnfileirar(-3);
            filaMista.inserirEnfileirar(8);
            filaMista.inserirEnfileirar(-1);
            filaMista.inserirEnfileirar(2);
            filaMista.imprimir();          // 5 -> -3 -> 8 -> -1 -> 2
            filaMista.removerNegativos();
            filaMista.imprimir();          // 5 -> 8 -> 2
            Console.WriteLine();

            Console.WriteLine("=== EXERCÍCIO 7 - Concatenar filas ===");
            Fila filaA = new Fila();
            filaA.inserirEnfileirar(1);
            filaA.inserirEnfileirar(2);
            filaA.inserirEnfileirar(3);

            Fila filaB = new Fila();
            filaB.inserirEnfileirar(4);
            filaB.inserirEnfileirar(5);

            Fila fila3 = filaA.concatenar(filaB);
            fila3.imprimir(); // esperado: 1 -> 2 -> 3 -> 4 -> 5

            filaA.imprimir(); // 1 -> 2 -> 3
            filaB.imprimir(); // 4 -> 5

            Console.ReadLine();
        }
    }
}
  </script>

  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
</body>
</html>
