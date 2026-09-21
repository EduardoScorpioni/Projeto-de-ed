<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fila de Prioridades Encadeada | Grupo 6</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/fila.css">
  <link rel="stylesheet" href="../assets/css/fila-prioridade.css">
</head>
<body>
  <?php $paginaAtual = 'fila-prioridade'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main>
    <section class="page-hero--prioridade">
      <div>
        <p class="eyebrow">Módulo 04 &middot; Variação Avançada</p>
        <h1 data-typed="Fila de Prioridades Encadeada">Fila de Prioridades Encadeada</h1>
        <p>
          Na <strong>Fila de Prioridades (Priority Queue)</strong>, a ordem de atendimento
          não é puramente cronológica: cada elemento possui uma prioridade associada.
          Elementos de maior prioridade sempre saem antes dos de menor prioridade, e em caso
          de <strong>empate</strong> na prioridade, a regra clássica <strong>FIFO</strong> é preservada.
        </p>
      </div>
      <div>
        <img src="../assets/img/fila-prioridade.svg" alt="Diagrama de Fila de Prioridades Encadeada" loading="lazy">
      </div>
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>Conceito e Funcionamento</h2>
        <p>
          Em uma Fila convencional (FIFO), o primeiro que chega é obrigatoriamente o primeiro
          que sai. No entanto, em inúmeras situações do mundo real e da computação, certos
          eventos exigem <strong>atendimento preferencial imediato</strong>.
        </p>
        <p>
          Na implementação encadeada com lista ordenada, os nós são mantidos organizados pelo seu
          nível de prioridade. Ao <strong>enfileirar (inserir)</strong>, o algoritmo percorre a fila
          até encontrar a posição correta: após todos os elementos de prioridade superior ou igual
          (garantindo estabilidade FIFO) e antes de qualquer elemento de prioridade inferior.
        </p>
        <p>
          A grande vantagem dessa abordagem é que a <strong>remoção (desenfileirar)</strong> continua
          sendo imediata em <strong>O(1)</strong>, pois o elemento com maior urgência estará sempre
          na cabeça (início) da fila.
        </p>

        <h2>Quando Usar e Importância Prática</h2>
        <p>
          A Fila de Prioridades é fundamental em áreas críticas da tecnologia e serviços:
        </p>
        <ul>
          <li><strong>Triagem Hospitalar (Protocolo de Manchester)</strong>: Pacientes em risco iminente (emergência vermelha) são atendidos antes de casos urgentes (amarelo) ou leves (verde), independentemente de quem chegou primeiro à recepção.</li>
          <li><strong>Sistemas Operacionais</strong>: O escalonador de processos (scheduler) da CPU precisa executar interrupções de hardware e tarefas de tempo real antes de processos em segundo plano (background).</li>
          <li><strong>Redes e Telecomunicações (QoS)</strong>: Roteadores priorizam pacotes de voz e vídeo ao vivo (VoIP) frente a downloads de arquivos extensos para evitar travamentos.</li>
          <li><strong>Algoritmos de Otimização</strong>: Utilizada como base de algoritmos fundamentais da ciência da computação, como o algoritmo de Dijkstra (caminho mínimo) e a Codificação de Huffman (compactação).</li>
        </ul>
      </article>

      <aside class="side-note">
        <h2>Operações Essenciais</h2>
        <ul>
          <li><strong>estaVazia()</strong>: Verifica se o ponteiro de início é nulo — custo O(1).</li>
          <li><strong>inserirComPrioridade()</strong>: Insere o nó na posição exata da sua prioridade — custo O(n) no pior caso, O(1) se for a maior prioridade.</li>
          <li><strong>removerDesenfileirar()</strong>: Retira e retorna o elemento de maior prioridade no início — custo O(1).</li>
          <li><strong>espiar()</strong>: Consulta os dados do primeiro da fila sem removê-lo — custo O(1).</li>
          <li><strong>imprimir()</strong>: Percorre a fila exibindo prioridades e dados em ordem de atendimento.</li>
        </ul>

        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line);">
          <span class="priority-badge priority-badge--high">P1 - Alta / Emergência</span><br>
          <span class="priority-badge priority-badge--medium" style="margin: 6px 0;">P2 - Média / Urgência</span><br>
          <span class="priority-badge priority-badge--low">P3 - Baixa / Normal</span>
        </div>
      </aside>
    </section>

    <!-- ===== SEÇÃO DE MÍDIA VISUAL E VÍDEO DIDÁTICO ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Apoio Multimídia</p>
        <h2>Visualização da Estrutura e Videoaula</h2>
        <p>Acompanhe o diagrama esquemático da fila ordenada e a explicação em vídeo sobre filas com prioridade.</p>
      </div>

      <div class="visual-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <figure class="visual-card">
          <img src="../assets/img/fila-prioridade.svg" alt="Nós encadeados com prioridade e ponteiros" loading="lazy">
          <figcaption>
            <strong>Esquema de Nós</strong>
            Cada nó encapsula o dado, o valor de prioridade e o ponteiro <code>prox</code> para o próximo nó da cadeia.
          </figcaption>
        </figure>

        <div class="visual-card" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="priority-badge priority-badge--medium">Vídeo Didático</span>
            <h3 style="margin: 12px 0 8px; font-size: 1.2rem;">Como Funciona uma Priority Queue</h3>
            <p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5;">
              Entenda passo a passo a diferença visual entre o enfileiramento padrão e a inserção ordenada por prioridade com critério de desempate estável.
            </p>
          </div>
          <div class="media-embed">
            <iframe
              src="https://www.youtube.com/embed/EfF1M7myAyY"
              title="Vídeo Explicativo - Fila com Prioridade"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CÓDIGOS EM C# ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Implementação em C#</p>
        <h2>Classes NoPrioridade e FilaPrioridade</h2>
        <p>
          Código completo estruturado em C# com todas as operações essenciais:
          classe de nó, controle de início, inserção ordenada estável e remoção prioritária.
        </p>
      </div>

      <div class="exercise__panel">
        <div class="code-card" data-src="src-no-prioridade">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">NoPrioridade.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>

        <div class="code-card" data-src="src-fila-prioridade">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">FilaPrioridade.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>
      </div>
    </section>

    <!-- ===== PROGRAM.CS (EXEMPLO PRÁTICO HOSPITALAR) ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Simulação Real</p>
        <h2>Program.cs &middot; Triagem Hospitalar de Manchester</h2>
        <p>
          Demonstração do funcionamento da Fila de Prioridades: pacientes chegam em momentos
          diferentes e o atendimento retira estritamente quem possui maior gravidade primeiro.
        </p>
      </div>

      <div class="code-card" data-src="src-program-prioridade">
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

    <section class="gamification-cta">
      <div class="gamification-cta__inner">
        <div>
          <p class="eyebrow">BrunoCoins</p>
          <h2>Desafie seus conhecimentos em Filas</h2>
          <p>Treine inserções, remoções e conceitos de Fila FIFO e Prioridade para acumular moedas e customizar seu personagem.</p>
          <div class="gamification-cta__actions">
            <a class="button primary" href="gamificacao.php">Ir para a Gameficação</a>
            <a class="button secondary" href="fila.php">Ver Fila Convencional</a>
          </div>
        </div>
        <span class="gamification-cta__coins">BC</span>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a página inicial</a></p>
  </footer>

  <!-- Fontes de código C# (não exibidas diretamente; lidas e coloridas pelo code-tools.js) -->
  <script type="text/plain" id="src-no-prioridade">
public class NoPrioridade
{
    public string nome;       // Identificador / dado do elemento
    public int prioridade;     // 1: Emergência (maior prioridade), 2: Urgência, 3: Normal
    public NoPrioridade prox; // Referência para o próximo nó

    public NoPrioridade(string nome, int prioridade)
    {
        this.nome = nome;
        this.prioridade = prioridade;
        this.prox = null;
    }

    public void imprimir()
    {
        string desc = this.prioridade switch
        {
            1 => "EMERGÊNCIA (P1)",
            2 => "URGÊNCIA (P2)",
            _ => "NORMAL (P3)"
        };
        Console.WriteLine($"[{desc}] {this.nome}");
    }
}
  </script>

  <script type="text/plain" id="src-fila-prioridade">
public class FilaPrioridade
{
    public NoPrioridade inicio; // Aponta sempre para o elemento mais prioritário

    public FilaPrioridade()
    {
        this.inicio = null;
    }

    // 1. Verifica se a fila está vazia — O(1)
    public bool estaVazia()
    {
        return this.inicio == null;
    }

    // 2. Inserção Ordenada com estabilidade FIFO
    // Menor número = Maior prioridade (1 > 2 > 3)
    public void inserirComPrioridade(string nome, int prioridade)
    {
        NoPrioridade novo = new NoPrioridade(nome, prioridade);

        // Caso 1: Fila vazia OU o novo nó tem prioridade estritamente MAIOR que o início
        if (estaVazia() || novo.prioridade < this.inicio.prioridade)
        {
            novo.prox = this.inicio;
            this.inicio = novo;
            return;
        }

        // Caso 2: Percorrer para encontrar a posição correta
        // Usamos '<=' para que novos nós de MESMA prioridade fiquem ATRÁS dos já existentes (estabilidade FIFO)
        NoPrioridade atual = this.inicio;
        while (atual.prox != null && atual.prox.prioridade <= novo.prioridade)
        {
            atual = atual.prox;
        }

        novo.prox = atual.prox;
        atual.prox = novo;
    }

    // 3. Remoção / Desenfileirar: retira sempre da cabeça — O(1)
    public NoPrioridade removerDesenfileirar()
    {
        if (estaVazia())
        {
            Console.WriteLine("Aviso: A fila de prioridades está vazia!");
            return null;
        }

        NoPrioridade removido = this.inicio;
        this.inicio = this.inicio.prox;
        removido.prox = null; // Desconecta o nó
        return removido;
    }

    // 4. Espiar (Peek): consulta o elemento de maior prioridade sem remover — O(1)
    public NoPrioridade espiar()
    {
        return this.inicio;
    }

    // 5. Percurso / Impressão de todos os elementos na ordem de prioridade
    public void imprimir()
    {
        if (estaVazia())
        {
            Console.WriteLine("Fila vazia.");
            return;
        }

        Console.WriteLine("\n--- Fila de Atendimento por Prioridade ---");
        NoPrioridade atual = this.inicio;
        int posicao = 1;

        while (atual != null)
        {
            Console.Write($"{posicao}º -> ");
            atual.imprimir();
            atual = atual.prox;
            posicao++;
        }
        Console.WriteLine("------------------------------------------\n");
    }
}
  </script>

  <script type="text/plain" id="src-program-prioridade">
using System;

namespace FilaPrioridadeDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            FilaPrioridade prontoSocorro = new FilaPrioridade();

            Console.WriteLine("=== SIMULAÇÃO DE TRIAGEM HOSPITALAR ===");

            // Chegam pacientes em ordem aleatória:
            // 1: Emergência Vermelha, 2: Urgência Amarela, 3: Pouco Urgente Verde
            prontoSocorro.inserirComPrioridade("Carlos (Dor de Cabeça)", 3);
            prontoSocorro.inserirComPrioridade("Mariana (Suspeita Fratura)", 2);
            prontoSocorro.inserirComPrioridade("Roberto (Parada Cardíaca)", 1);
            prontoSocorro.inserirComPrioridade("Fernanda (Febre Moderada)", 3);
            prontoSocorro.inserirComPrioridade("Lucas (Hemorragia Severa)", 1);

            // Exibe a fila organizada automaticamente
            prontoSocorro.imprimir();

            // Atendimento dos pacientes conforme prioridade
            Console.WriteLine("Iniciando atendimentos médicos:");
            while (!prontoSocorro.estaVazia())
            {
                NoPrioridade chamado = prontoSocorro.removerDesenfileirar();
                Console.WriteLine($"Chamando para o consultório: {chamado.nome} (Prioridade: {chamado.prioridade})");
            }

            Console.WriteLine("\nTodos os pacientes foram atendidos com sucesso!");
        }
    }
}
  </script>

  <script src="../assets/js/typed-title.js"></script>
  <script src="../assets/js/code-tools.js"></script>
</body>
</html>
