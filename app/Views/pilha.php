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
    <section class="page-hero">
      <div>
        <p class="eyebrow">Módulo 05 &middot; Aula 8</p>
        <h1 data-typed="Pilha Encadeada (LIFO)">Pilha Encadeada (LIFO)</h1>
        <p>
          <strong>LIFO &mdash; Last In, First Out:</strong> o último elemento a entrar é o
          primeiro a sair. Também conhecida pelo TAD <code>stack</code>. Toda inserção e
          remoção acontece pelo mesmo lado: o <strong>topo</strong>.
        </p>
      </div>
      <img src="../assets/img/pilha.svg" alt="Diagrama esquemático de Pilha Encadeada LIFO" loading="lazy">
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

    <!-- ===== MATERIAL MULTIMÍDIA ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Apoio Multimídia</p>
        <h2>Diagrama Visual e Videoaula</h2>
        <p>Entenda o comportamento do topo, da pilha de chamadas (call stack) e as operações push e pop.</p>
      </div>

      <div class="visual-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <figure class="visual-card">
          <img src="../assets/img/pilha.svg" alt="Diagrama de Pilha Encadeada LIFO" loading="lazy">
          <figcaption>
            <strong>Pilha Encadeada (LIFO)</strong>
            Inserção e remoção acontecem exclusivamente pelo mesmo lado: o <code>topo</code>.
          </figcaption>
        </figure>

        <div class="visual-card" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="eyebrow" style="color: var(--green); font-weight: 700;">Vídeo Didático</span>
            <h3 style="margin: 10px 0 8px; font-size: 1.2rem;">Pilha Encadeada na Prática</h3>
            <p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5;">
              Visualização passo a passo das movimentações de memória na stack e o encadeamento de nós com ponteiros.
            </p>
          </div>
          <div style="margin-top: 16px; border-radius: 8px; overflow: hidden; border: 1px solid var(--line);">
            <iframe
              width="100%"
              style="aspect-ratio: 16/9; display: block;"
              src="https://www.youtube.com/embed/EfF1M7myAyY"
              title="Vídeo Didático - Pilhas Encadeadas"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== LISTA DE EXERCÍCIOS RESOLVIDOS (Aula 8) ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Lista de exercícios &mdash; Pilha Encadeada LIFO</p>
        <h2>Exercícios Resolvidos</h2>
        <p>
          Resoluções completas em C# para os 7 exercícios propostos na disciplina.
          Clique em <strong>Mostrar Resolução</strong> para visualizar e copiar os códigos de cada estrutura.
        </p>
      </div>

      <!-- Exercício 1 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 1</p>
            <p class="practice__goal">
              Pilha Encadeada LIFO em que cada nó representa um <strong>Documento digital</strong>
              (nome do arquivo, extensão, tamanho em KB). Implemente: a) push, b) pop,
              c) consulta (busca por nome), d) percurso (impressão de todos).
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex1-no">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">NoDocumento.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex1-pilha">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">PilhaDocumentos.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Exercício 2 -->
      <div class="exercise reveal">
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Exercício 2</p>
            <p class="practice__goal">Algoritmo que verifica quantos elementos uma pilha possui.</p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex2">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Pilha.cs &middot; quantidade()</span>
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
            <p class="practice__goal">Algoritmo que verifica quantos números ímpares existem em uma pilha.</p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex3">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Pilha.cs &middot; contarImpares()</span>
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
              Dada uma pilha1 com números positivos e negativos, separar em pilha2 (positivos)
              e pilha3 (negativos), preservando os elementos originais.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex4">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Pilha.cs &middot; separarPositivosNegativos()</span>
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
            <p class="practice__goal">
              Pilha em que cada nó é uma letra: inverter a ordem das letras armazenadas.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex5">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">PilhaChar.cs &middot; inverter()</span>
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
              Pilha em que cada nó é uma letra: verificar se uma palavra ou frase é <strong>palíndromo</strong>.
              Ex.: RADAR &rarr; é palíndromo; PROGRAMAR &rarr; não é.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex6">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">PilhaChar.cs &middot; ehPalindromo()</span>
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
              Transferir os elementos de uma pilha1 para uma pilha2, preservando a ordem original.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-pilha-ex7">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Pilha.cs &middot; transferirPreservandoOrdem()</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
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

namespace PilhaLIFO
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

  <!-- Resoluções dos Exercícios da Aula 8 -->
  <script type="text/plain" id="src-pilha-ex1-no">
public class NoDocumento
{
    public string nomeArquivo;
    public string extensao;
    public double tamanhoKB;
    public NoDocumento prox;

    public NoDocumento(string nomeArquivo, string extensao, double tamanhoKB)
    {
        this.nomeArquivo = nomeArquivo;
        this.extensao = extensao;
        this.tamanhoKB = tamanhoKB;
        this.prox = null;
    }

    public void imprimir()
    {
        Console.WriteLine($"Arquivo: {nomeArquivo}.{extensao} | Tamanho: {tamanhoKB} KB");
    }
}
  </script>

  <script type="text/plain" id="src-pilha-ex1-pilha">
public class PilhaDocumentos
{
    public NoDocumento topo;

    public PilhaDocumentos()
    {
        this.topo = null;
    }

    public bool estaVazia() => this.topo == null;

    // a) Push: empilha novo documento
    public void push(string nome, string extensao, double tamanhoKB)
    {
        NoDocumento novo = new NoDocumento(nome, extensao, tamanhoKB);
        novo.prox = this.topo;
        this.topo = novo;
    }

    // b) Pop: desempilha documento do topo
    public NoDocumento pop()
    {
        if (estaVazia())
        {
            Console.WriteLine("Aviso: Pilha de documentos vazia!");
            return null;
        }
        NoDocumento removido = this.topo;
        this.topo = this.topo.prox;
        removido.prox = null;
        return removido;
    }

    // c) Consulta: busca por nome do arquivo
    public bool consulta(string nomeArquivo)
    {
        NoDocumento atual = this.topo;
        while (atual != null)
        {
            if (atual.nomeArquivo.Equals(nomeArquivo, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
            atual = atual.prox;
        }
        return false;
    }

    // d) Percurso: imprime todos a partir do topo
    public void imprimir()
    {
        if (estaVazia())
        {
            Console.WriteLine("Nenhum documento empilhado.");
            return;
        }

        Console.WriteLine("\n--- Documentos Empilhados ---");
        NoDocumento atual = this.topo;
        while (atual != null)
        {
            atual.imprimir();
            atual = atual.prox;
        }
        Console.WriteLine("-----------------------------\n");
    }
}
  </script>

  <script type="text/plain" id="src-pilha-ex2">
// Exercício 2: método que verifica a quantidade de elementos na pilha
public int quantidade()
{
    int total = 0;
    No atual = this.topo;

    while (atual != null)
    {
        total++;
        atual = atual.prox;
    }

    return total;
}
  </script>

  <script type="text/plain" id="src-pilha-ex3">
// Exercício 3: método que verifica a quantidade de números ímpares na pilha
public int contarImpares()
{
    int impares = 0;
    No atual = this.topo;

    while (atual != null)
    {
        if (atual.valor % 2 != 0)
        {
            impares++;
        }
        atual = atual.prox;
    }

    return impares;
}
  </script>

  <script type="text/plain" id="src-pilha-ex4">
// Exercício 4: separar pilha1 em pilha2 (positivos) e pilha3 (negativos)
public static void separarPositivosNegativos(Pilha pilhaOriginal, out Pilha pilhaPositivos, out Pilha pilhaNegativos)
{
    pilhaPositivos = new Pilha();
    pilhaNegativos = new Pilha();

    Pilha auxPos = new Pilha();
    Pilha auxNeg = new Pilha();

    // 1. Percorre sem destruir a pilha original
    No atual = pilhaOriginal.topo;
    while (atual != null)
    {
        if (atual.valor >= 0)
            auxPos.push(atual.valor);
        else
            auxNeg.push(atual.valor);

        atual = atual.prox;
    }

    // 2. Desempilha das auxiliares para restaurar a ordem original
    while (!auxPos.estaVazia())
    {
        pilhaPositivos.push(auxPos.pop().valor);
    }

    while (!auxNeg.estaVazia())
    {
        pilhaNegativos.push(auxNeg.pop().valor);
    }
}
  </script>

  <script type="text/plain" id="src-pilha-ex5">
// Exercício 5: Pilha de caracteres com método para inverter os nós
public class NoChar
{
    public char letra;
    public NoChar prox;

    public NoChar(char letra)
    {
        this.letra = letra;
        this.prox = null;
    }
}

public class PilhaChar
{
    public NoChar topo;

    public bool estaVazia() => this.topo == null;

    public void push(char letra)
    {
        NoChar novo = new NoChar(letra);
        novo.prox = this.topo;
        this.topo = novo;
    }

    public char pop()
    {
        if (estaVazia()) throw new InvalidOperationException("Pilha vazia!");
        char letra = this.topo.letra;
        this.topo = this.topo.prox;
        return letra;
    }

    // Inverte a ordem interna utilizando 2 pilhas auxiliares
    public void inverter()
    {
        if (estaVazia() || this.topo.prox == null) return;

        PilhaChar aux1 = new PilhaChar();
        PilhaChar aux2 = new PilhaChar();

        while (!this.estaVazia())
            aux1.push(this.pop());

        while (!aux1.estaVazia())
            aux2.push(aux1.pop());

        while (!aux2.estaVazia())
            this.push(aux2.pop());
    }
}
  </script>

  <script type="text/plain" id="src-pilha-ex6">
// Exercício 6: Algoritmo para verificar se palavra ou frase é palíndromo
public static bool ehPalindromo(string texto)
{
    if (string.IsNullOrWhiteSpace(texto)) return false;

    // Normalização: remove espaços e converte para maiúsculo
    string limpo = "";
    foreach (char c in texto)
    {
        if (char.IsLetterOrDigit(c))
            limpo += char.ToUpper(c);
    }

    PilhaChar pilha = new PilhaChar();

    // Empilha todos os caracteres (LIFO)
    foreach (char c in limpo)
    {
        pilha.push(c);
    }

    // Ao desempilhar, os caracteres saem em ordem inversa
    foreach (char c in limpo)
    {
        if (pilha.pop() != c)
        {
            return false; // Caractere divergente: não é palíndromo
        }
    }

    return true; // Todos os caracteres coincidiram: é palíndromo!
}
  </script>

  <script type="text/plain" id="src-pilha-ex7">
// Exercício 7: Transferir elementos de pilha1 para pilha2 mantendo a ordem original
public static void transferirPreservandoOrdem(Pilha pilhaOrigem, Pilha pilhaDestino)
{
    Pilha aux = new Pilha();

    // 1. Desempilha da origem para a auxiliar (inverte a ordem uma vez)
    while (!pilhaOrigem.estaVazia())
    {
        aux.push(pilhaOrigem.pop().valor);
    }

    // 2. Desempilha da auxiliar para o destino (inverte novamente,
    // garantindo exatamente a mesma ordem que estavam no início)
    while (!aux.estaVazia())
    {
        pilhaDestino.push(aux.pop().valor);
    }
}
  </script>

  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
</body>
</html>

