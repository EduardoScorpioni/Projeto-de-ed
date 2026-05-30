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
        <h1 data-typed="TAD e Struct">TAD e Struct</h1>
        <p>
          Um TAD define <strong>o que</strong> uma estrutura faz; a struct em C#
          é uma forma prática de <strong>juntar dados e operações</strong> em um
          único tipo.
        </p>
      </div>
      <img src="../docs/imagens-pdfs/tad-struct-explicativo/01-tad-e-struct-em-c.svg" alt="Resumo visual sobre TAD e struct em C#">
    </section>

    <section class="content-layout">
      <article class="article-block">
        <h2>O que é um TAD</h2>
        <p>
          TAD é um <strong>contrato</strong>: ele lista as operações disponíveis
          &mdash; como inserir, buscar ou imprimir &mdash; sem expor como elas
          funcionam por dentro.
        </p>
        <p>
          Essa separação entre <em>o que</em> e <em>como</em> facilita a
          manutenção: a implementação interna pode mudar sem afetar quem usa a
          estrutura.
        </p>
      </article>
      

      <aside class="side-note">

        <img src="../assets/img/tad.png" alt="Pontos-chave sobre TAD e struct em C#">
      </aside>
    </section>

    <!-- ===== TAD CLIENTE (exemplo da Aula 5) ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Exemplo da Aula 5</p>
        <h2>TAD Cliente</h2>
        <p>Um cliente reúne seus dados (nome, CPF, nascimento e e-mail) e a operação <code>Imprimir()</code>, que mostra todas as informações.</p>
      </div>

      <div class="exercise reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/04-tad-cliente.svg" alt="Modelo visual de um TAD Cliente" loading="lazy">
          <figcaption><strong>TAD Cliente</strong>Organiza dados e a operação principal em um exemplo prático.</figcaption>
        </figure>
        <div class="exercise__panel">
          <div class="code-card" data-src="src-cliente">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Cliente.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>

          <div class="code-card" data-src="src-cliente-uso">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Program.cs &middot; uso</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TAD EM IMAGENS ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Material visual</p>
        <h2>TAD em imagens</h2>
        <p>Os dois pilares do conceito: a relação entre dados e operações e um roteiro para modelar antes de programar.</p>
      </div>

      <div class="visual-grid reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/02-tipo-abstrato-de-dados.svg" alt="Explicação visual de Tipo Abstrato de Dados" loading="lazy">
          <figcaption><strong>Tipo Abstrato de Dados</strong>Mostra a relação entre dados, operações e abstração.</figcaption>
        </figure>

        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/06-como-pensar-antes-de-programar.svg" alt="Roteiro para pensar antes de programar" loading="lazy">
          <figcaption><strong>Roteiro de modelagem</strong>Ajuda a transformar dados e operações em código.</figcaption>
        </figure>
      </div>
    </section>

    <!-- ===== STRUCT EM C# ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Linguagem C#</p>
        <h2>O que é uma struct</h2>
        <p>Struct é um tipo que agrupa, em um único bloco, um conjunto de dados relacionados. Em C#, é armazenada na <em>stack</em>.</p>
      </div>
      <figure class="stack-heap-figure reveal">
        <img class="stack-heap-img" src="../assets/img/stack-heap.png" alt="Comparação entre Stack e Heap: onde a struct é armazenada na memória">
        <figcaption>A struct é armazenada na <strong>stack</strong> &mdash; área de memória mais rápida, porém menor.</figcaption>
      </figure>

      <div class="anchor-block reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/tad-struct-explicativo/03-o-que-e-uma-struct.svg" alt="Explicação visual sobre struct em C#" loading="lazy">
          <figcaption><strong>Struct em C#</strong>Resume quando a struct faz sentido e quais cuidados tomar.</figcaption>
        </figure>
        <div class="anchor-text">
          <p>
            Uma struct é ideal para modelar um TAD simples: declare os campos,
            crie variáveis do tipo e atribua valores. Cada variável carrega seus
            próprios dados.
          </p>
          <div class="code-card" data-src="src-struct-base">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Ponto.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRÁTICA DE SINTAXE ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Pratique a escrita</p>
        <h2>Escreva sua struct</h2>
        <p>Antes dos exercícios, treine a sintaxe: digite uma linha de struct e veja o realce na hora. É só para praticar a escrita &mdash; não compila.</p>
      </div>

      <div class="playground reveal">
        <label for="pg-input">Seu código C#</label>
        <textarea id="pg-input" spellcheck="false" placeholder="Ex.: Pratique a sintaxe digitando uma Struct de Aluno!"></textarea>

        <div class="playground__chips">
          <button class="chip" type="button" data-fill="public struct Aluno { public string Nome; public int Idade; }">struct Aluno</button>
          <button class="chip" type="button" data-fill="public string Nome;">campo Nome</button>
          <button class="chip" type="button" data-fill="public void Imprimir() { Console.WriteLine(this.Nome); }">método Imprimir()</button>
          <button class="chip" type="button" data-fill="Aluno a = new(); a.Nome = &quot;Ana&quot;; a.Idade = 20;">criar variável</button>
        </div>

        <div class="playground__preview">
          <pre class="code-block"><code id="pg-output"></code></pre>
        </div>
      </div>
    </section>

    <!-- ===== EXERCÍCIOS DE STRUCT ===== -->
    <section class="section visual-section">
      <div class="section-heading">
        <p class="eyebrow">Exercícios</p>
        <h2>Struct como TAD na prática</h2>
        <p>Cada exercício modela um TAD com campos e operações. Veja a imagem do enunciado ao lado do código C# correspondente.</p>
      </div>

      <figure class="visual-card reveal" style="max-width: 980px; margin: 0 0 36px;">
        <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/01-struct-como-tad.svg" alt="Resumo dos exercícios de struct como TAD" loading="lazy">
        <figcaption><strong>Resumo da lista</strong>Apresenta objetivo, entrega e forma de estudar os exercícios.</figcaption>
      </figure>

      <!-- JogadorFutebol -->
      <div class="exercise reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/02-jogadorfutebol.svg" alt="Exercício JogadorFutebol com dados e operações" loading="lazy">
          <figcaption><strong>JogadorFutebol</strong>Cartões, clube e vínculo do jogador.</figcaption>
        </figure>
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Hora de Praticar</p>
            <p class="practice__goal">
              Modele a struct <code>JogadorFutebol</code> com os dados do jogador
              (nome, número, posição, cartões e clube). Crie métodos para
              <strong>registrar cartões</strong> e <strong>verificar o vínculo</strong>
              com o clube. Tente resolver antes de conferir a resolução.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-jogador">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">JogadorFutebol.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- EquipeEsports -->
      <div class="exercise reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/03-equipeesports.svg" alt="Exercício EquipeEsports com dados e operações" loading="lazy">
          <figcaption><strong>EquipeEsports</strong>Campeonatos, premiações e ano de estreia.</figcaption>
        </figure>
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Hora de Praticar</p>
            <p class="practice__goal">
              Modele a struct <code>EquipeEsports</code> com equipe, categoria,
              campeonatos vencidos, prêmios e ano de estreia. Crie métodos para
              <strong>registrar um campeonato vencido</strong>, atualizar prêmios e
              <strong>verificar o ano de estreia</strong>. Tente resolver antes de conferir a resolução.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-equipe">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">EquipeEsports.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Produto -->
      <div class="exercise reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/04-produto.svg" alt="Exercício Produto com dados e operações" loading="lazy">
          <figcaption><strong>Produto</strong>Preço, estoque, disponibilidade e desconto.</figcaption>
        </figure>
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Hora de Praticar</p>
            <p class="practice__goal">
              Modele a struct <code>Produto</code> com nome, preço, marca e
              quantidade. Crie métodos para <strong>aplicar desconto</strong>
              (em valor e em porcentagem) e <strong>verificar a quantidade em
              estoque</strong>. Tente resolver antes de conferir a resolução.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-produto">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Produto.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>

      <!-- Professor -->
      <div class="exercise reveal">
        <figure class="visual-card">
          <img src="../docs/imagens-pdfs/exercicios-struct-explicativo/05-professor.svg" alt="Exercício Professor com dados e operações" loading="lazy">
          <figcaption><strong>Professor</strong>Salário, faltas e carga horária.</figcaption>
        </figure>
        <div class="exercise__panel">
          <div class="practice">
            <p class="practice__tag">Hora de Praticar</p>
            <p class="practice__goal">
              Modele a struct <code>Professor</code> com nome, salário, matéria e
              carga horária. Crie métodos para <strong>reajuste salarial</strong>,
              <strong>desconto por falta</strong> e aumento de carga horária.
              Tente resolver antes de conferir a resolução.
            </p>
            <button class="practice__toggle" type="button" aria-expanded="false">Mostrar Resolução</button>
          </div>
          <div class="code-card is-collapsed" data-src="src-professor">
            <div class="code-card__bar">
              <span class="code-card__lang">C#</span>
              <span class="code-card__name">Professor.cs</span>
              <button class="code-card__copy" type="button" aria-label="Copiar código">
                <span class="code-card__copy-label">Copiar</span>
              </button>
            </div>
            <pre class="code-block"><code></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROGRAMA + ROTEIRO ===== -->
    <section class="section visual-section alt-section">
      <div class="section-heading">
        <p class="eyebrow">Juntando tudo</p>
        <h2>Programa principal e roteiro</h2>
        <p>O <code>Program.cs</code> cria as variáveis, atribui valores e chama as operações. Ao lado, o roteiro para resolver cada exercício.</p>
      </div>

      <div class="anchor-block reveal">
        <div class="code-card" data-src="src-programa">
          <div class="code-card__bar">
            <span class="code-card__lang">C#</span>
            <span class="code-card__name">Program.cs</span>
            <button class="code-card__copy" type="button" aria-label="Copiar código">
              <span class="code-card__copy-label">Copiar</span>
            </button>
          </div>
          <pre class="code-block"><code></code></pre>
        </div>
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

  <!-- Fontes de código (não exibidas; lidas pelo code-tools.js) -->
  <script type="text/plain" id="src-cliente">
namespace TAD;

public struct Cliente
{
    // Dados
    public string Nome;
    public string CPF;
    public string DataNascimento;
    public string Email;

    // Operação do TAD
    public void Imprimir()
    {
        Console.WriteLine("Nome: " + this.Nome);
        Console.WriteLine("CPF: " + this.CPF);
        Console.WriteLine("Data de Nascimento: " + this.DataNascimento);
        Console.WriteLine("E-mail: " + this.Email);
    }
}
  </script>

  <script type="text/plain" id="src-cliente-uso">
// Declarando a variável do tipo struct
Cliente cliente1 = new();

// Atribuindo valores aos dados
cliente1.Nome = "Maria";
cliente1.CPF = "123.456.789-00";
cliente1.DataNascimento = "10/05/2000";
cliente1.Email = "maria@email.com";

// Usando a operação do TAD
cliente1.Imprimir();   // dotnet run
  </script>

  <script type="text/plain" id="src-struct-base">
public struct Ponto
{
    public int X;
    public int Y;
}

// Cada variável carrega seus próprios dados
Ponto p = new();
p.X = 10;
p.Y = 5;
  </script>

  <script type="text/plain" id="src-jogador">
namespace TAD;

public struct JogadorFutebol
{
    // Propriedades da struct
    public string Nome;
    public int Numero;
    public string Posicao;
    public int Idade;
    public double Altura;
    public int Cartaoamarelo;
    public int Cartaovermelho;
    public string Clube;
    public int quantiavelhacartaoamarelo;
    public int quantiavelhacartaovermelho;

    public string ExibirInformacoes()
    {
        return "\nNome: " + this.Nome + "\nNúmero: " + this.Numero + "\nPosição: " +
        this.Posicao + "\nIdade: " + this.Idade + "\nAltura: " + this.Altura + "\nCartão Amarelo: "
        + this.Cartaoamarelo + "\nCartão Vermelho: " + this.Cartaovermelho + "\nClube: " + this.Clube;
    }

    public void RegistrarCartaoAmarelo(int quantia)
    {
        this.quantiavelhacartaoamarelo = this.Cartaoamarelo;
        this.Cartaoamarelo += quantia;
        Console.WriteLine($"Cartões amarelos de {this.Nome} antes eram: {this.quantiavelhacartaoamarelo}, agora é: {this.Cartaoamarelo} quantidades");
    }

    public void RegistrarCartaoVermelho(int quantia)
    {
        this.quantiavelhacartaovermelho = this.Cartaovermelho;
        this.Cartaovermelho += quantia;
        Console.WriteLine($"Cartões Vermelhos de {this.Nome} antes eram: {this.quantiavelhacartaovermelho}, agora é {this.Cartaovermelho} quantidades");
    }

    public void verificarVinculoClube()
    {
        if (this.Clube != "")
        {
            Console.WriteLine($"O jogador(a) {this.Nome} ESTÁ vinculado ao clube {this.Clube}");
        }
        else
        {
            Console.WriteLine($"O jogador(a) {this.Nome} NÃO está vinculado a um clube");
        }
    }
}
  </script>

  <script type="text/plain" id="src-equipe">
namespace TAD;

public struct EquipeEsports
{
    // Propriedades da struct
    public string equipe;
    public string categoria;
    public int campeonatovencidos;
    public double totalpremios;
    public int AnoEstreia;

    public string ExibirInformacoes()
    {
        return "\nEquipe: " + this.equipe + "\nCategoria: " + this.categoria + "\nCampeonatos Vencidos: " +
        this.campeonatovencidos + "\nTotal de Prêmios: " + this.totalpremios + "\nAno de Estreia: " + this.AnoEstreia;
    }

    public void registrarCampeonatoVencido(int valorPremio)
    {
        this.campeonatovencidos++;
        this.totalpremios += valorPremio;
        Console.WriteLine($"A equipe {this.equipe} venceu um campeonato! Total de campeonatos vencidos: {this.campeonatovencidos}");
    }

    public void atualizarValorTotalPremiacoes(int valor)
    {
        this.totalpremios += valor;
        Console.WriteLine($"O valor total de Premiações da equipe {this.equipe} é atualmente: {this.totalpremios} Reais");
    }

    public void VerificarAnoEstreia()
    {
        if (this.AnoEstreia == 2026)
        {
            Console.WriteLine($"A equipe {this.equipe} é Novata!");
        }
        else if (this.AnoEstreia > 2026)
        {
            Console.WriteLine($"O ano da equipe é superior ao ano Atual!");
        }
        else if (this.AnoEstreia == 0 || this.AnoEstreia < 0)
        {
            Console.WriteLine($"O ano da equipe deve ser maior que zero!");
        }
        else
        {
            Console.WriteLine($"A equipe {this.equipe} é Veterana !");
        }
    }
}
  </script>

  <script type="text/plain" id="src-produto">
namespace TAD;

public struct Produto
{
    // Propriedades da struct
    public string Nome;
    public double Preço;
    public string Marca;
    public double Quantidade;

    public string ExibirInformacoes()
    {
        return "\nNome: " + this.Nome + "\nPreço: " + this.Preço + "\nMarca: " + this.Marca +
        "\nQuantidade: " + this.Quantidade;
    }

    public void aplicarCupomDescontoValor(int valor)
    {
        this.Preço -= valor;
        Console.WriteLine($"O preço do produto {this.Nome} com o desconto é de {this.Preço} Reais");
    }

    public void aplicarCupomDescontoPorcentagem(int valor)
    {
        this.Preço = this.Preço - (this.Preço * valor) / 100;
        Console.WriteLine($"O preço do produto {this.Nome} com o desconto em porcentagem é {this.Preço} Reais");
    }

    public void verificarQuantidadeEmEstoque()
    {
        if (this.Quantidade <= 5 && this.Quantidade > 0)
        {
            Console.WriteLine($"O produto {this.Nome} está com baixa quantidade em estoque! Quantidade atual: {this.Quantidade}");
        }
        else if (this.Quantidade == 0)
        {
            Console.WriteLine($"O produto {this.Nome} está esgotado! Quantidade atual: {this.Quantidade}");
        }
        else if (this.Quantidade < 0)
        {
            this.Quantidade = 0;
            Console.WriteLine($"A quantidade do produto {this.Nome} não pode ser negativa! Quantidade do estoque alterado para zero!: {this.Quantidade}");
        }
        else
        {
            Console.WriteLine($"O produto {this.Nome} tem uma Quantidade atual de: {this.Quantidade}");
        }
    }
}
  </script>

  <script type="text/plain" id="src-professor">
namespace TAD;

public struct Professor
{
    // Propriedades da struct
    public string Nome;
    public double Salario;
    public string Matéria;
    public double CargaHoraria;

    public string ExibirInformacoes()
    {
        return "\nNome: " + this.Nome + "\nSalário: " + this.Salario + "\nMatéria: " + this.Matéria +
        "\nCarga Horária: " + this.CargaHoraria;
    }

    public void reajusteSalarialEmValor(int valor)
    {
        this.Salario += valor;
        Console.WriteLine($"O salário do professor com o aumento é de {this.Salario} Reais");
    }

    public void reajusteSalarialEmPorcentagem(int valor)
    {
        this.Salario = this.Salario + (this.Salario * valor) / 100;
        Console.WriteLine($"O salário do professor com o aumento em porcentagem é de {this.Salario} Reais");
    }

    public void descontoSalarialPorFaltaEmValor(int valor)
    {
        this.Salario -= valor;
        Console.WriteLine($"O salário do professor com o desconto salarial por falta é de {this.Salario} Reais");
    }

    public void descontoSalarialPorFaltaEmPorcentagem(int valor)
    {
        this.Salario = this.Salario - (this.Salario * valor) / 100;
        Console.WriteLine($"O salario do professor com o desconto salarial por falta em porcentagem é {this.Salario} Reais");
    }

    public void aumentarCargaHorariaDeTrabalho(int valor)
    {
        this.CargaHoraria += valor;
        this.Salario = this.Salario + (this.Salario * valor) / 10; //de nada pela generosidade
        Console.WriteLine($"A carga horária do professor com o aumento é de {this.CargaHoraria} horas e seu reajuste salarial é de {this.Salario} Reais");
    }
}
  </script>

  <script type="text/plain" id="src-programa">
using System;

namespace TAD
{
    class Program
    {
        static void Main(string[] args)
        {
            // Struct Jogador de Futebol
            JogadorFutebol jogador1 = new();
            jogador1.Nome = "Bruno";
            jogador1.Numero = 10;
            jogador1.Posicao = "Atacante";
            jogador1.Idade = 25;
            jogador1.Altura = 1.80;
            jogador1.Cartaoamarelo = 2;
            jogador1.Cartaovermelho = 0;
            jogador1.Clube = "Flamengo";

            Console.WriteLine(jogador1.ExibirInformacoes());
            jogador1.RegistrarCartaoAmarelo(1);
            jogador1.RegistrarCartaoVermelho(2);
            jogador1.verificarVinculoClube();

            // Struct Equipe de Esports
            EquipeEsports equipe1 = new();
            equipe1.equipe = "Team Alpha";
            equipe1.categoria = "Volêi";
            equipe1.campeonatovencidos = 9;
            equipe1.totalpremios = 10000;
            equipe1.AnoEstreia = 2024;

            Console.WriteLine(equipe1.ExibirInformacoes());
            equipe1.registrarCampeonatoVencido(5000);
            equipe1.atualizarValorTotalPremiacoes(5000);
            equipe1.VerificarAnoEstreia();

            // Struct Produto
            Produto produto1 = new();
            produto1.Nome = "Camiseta";
            produto1.Preço = 50;
            produto1.Marca = "Nike";
            produto1.Quantidade = 4;

            Console.WriteLine(produto1.ExibirInformacoes());
            produto1.aplicarCupomDescontoPorcentagem(20);
            produto1.aplicarCupomDescontoValor(10);
            produto1.verificarQuantidadeEmEstoque();

            // Struct Professor
            Professor professor1 = new();
            professor1.Nome = "Bruno";
            professor1.Salario = 5000;
            professor1.Matéria = "Ed e PW";
            professor1.CargaHoraria = 20;

            Console.WriteLine(professor1.ExibirInformacoes());
            professor1.reajusteSalarialEmValor(500);
            professor1.reajusteSalarialEmPorcentagem(10);
            professor1.descontoSalarialPorFaltaEmValor(200);
            professor1.descontoSalarialPorFaltaEmPorcentagem(5);
            professor1.aumentarCargaHorariaDeTrabalho(10);
        }
    }
}
  </script>

  <script src="../assets/js/image-lightbox.js"></script>
  <script src="../assets/js/code-tools.js"></script>
  <script src="../assets/js/typed-title.js"></script>
</body>
</html>
