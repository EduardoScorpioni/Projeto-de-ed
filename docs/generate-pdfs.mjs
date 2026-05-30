import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const PAGE = { width: 841.89, height: 595.28 };

const colors = {
  paper: '#fbfcff',
  ink: '#172331',
  muted: '#5b6b7b',
  line: '#d8e1ea',
  softBlue: '#eaf3fb',
  softTeal: '#e9f7f4',
  softAmber: '#fff4df',
  softRose: '#fff0ed',
  softGray: '#f3f6f8',
  blue: '#1d5d94',
  teal: '#168c7a',
  amber: '#d8891f',
  rose: '#c94f45',
  violet: '#6957a8',
  green: '#3f8f4a',
  codeBg: '#18222f',
  codeLine: '#263445',
  codeText: '#eef6ff'
};

const docsDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(docsDir, 'pdfs');

const documents = [
  {
    file: 'tad-struct-explicativo.pdf',
    accent: colors.blue,
    soft: colors.softBlue,
    section: 'Estrutura de Dados',
    pages: [
      {
        layout: 'cover',
        module: 'Módulo 01',
        title: 'TAD e struct em C#',
        subtitle: 'Resumo visual para explicar Tipo Abstrato de Dados e o uso de struct como modelo simples.',
        chips: ['TAD', 'struct', 'C#', 'modelagem'],
        cards: [
          {
            title: 'Ideia central',
            body: 'Um TAD define quais dados existem e quais operações podem ser feitas sobre eles.'
          },
          {
            title: 'Por que usar',
            body: 'Ajuda a separar o comportamento esperado dos detalhes internos da implementação.'
          },
          {
            title: 'No projeto',
            body: 'Use como material de apoio para explicar conceitos antes dos exemplos de código.'
          }
        ]
      },
      {
        layout: 'cards',
        kicker: 'TAD',
        title: 'Tipo Abstrato de Dados',
        subtitle: 'Um TAD descreve o que a estrutura oferece antes de mostrar como ela é implementada.',
        cards: [
          {
            title: 'Definição',
            body: 'É um modelo formado por dados e operações. O foco está no comportamento da estrutura.'
          },
          {
            title: 'Dados',
            body: 'São as informações guardadas pela estrutura. Exemplo: nome, CPF, e-mail e data de nascimento.'
          },
          {
            title: 'Operações',
            body: 'São ações válidas sobre os dados, como cadastrar, imprimir, buscar, alterar ou remover.'
          },
          {
            title: 'Abstração',
            body: 'Quem usa o TAD precisa conhecer as operações disponíveis, não cada detalhe interno do código.'
          }
        ],
        footer: 'TAD = dados + operações com uma interface clara.'
      },
      {
        layout: 'cards',
        kicker: 'STRUCT',
        title: 'O que é uma struct?',
        subtitle: 'Em C#, struct é um tipo de valor usado para agrupar dados relacionados em uma única unidade.',
        cards: [
          {
            title: 'Tipo de valor',
            body: 'Uma struct é copiada por valor. Ela pode ficar na stack ou dentro de outro objeto, dependendo de onde é usada.'
          },
          {
            title: 'Quando faz sentido',
            body: 'Funciona bem para modelos pequenos e simples, como ponto, data, produto resumido ou cliente básico.'
          },
          {
            title: 'Pode ter métodos',
            body: 'Além de campos, uma struct pode ter construtor e métodos, como Imprimir(), para operar sobre os próprios dados.'
          },
          {
            title: 'Cuidado importante',
            body: 'Como cópias são independentes, structs mutáveis podem confundir. Para exercícios iniciais, mantenha o modelo simples.'
          }
        ],
        footer: 'struct organiza dados relacionados, mas não substitui classes em todos os casos.'
      },
      {
        layout: 'cards',
        kicker: 'EXEMPLO',
        title: 'TAD Cliente',
        subtitle: 'Antes de programar, defina quais dados o cliente guarda e quais operações fazem sentido.',
        cards: [
          {
            title: 'Dados sugeridos',
            body: 'Nome, CPF, data de nascimento e e-mail. Todos pertencem ao mesmo conceito: Cliente.'
          },
          {
            title: 'Operação principal',
            body: 'Imprimir() exibe os dados cadastrados de forma organizada, sem espalhar Console.WriteLine pelo programa.'
          },
          {
            title: 'Contrato mental',
            body: 'O restante do código sabe que Cliente possui dados e sabe se apresentar, sem conhecer a lógica interna.'
          },
          {
            title: 'Boa prática',
            body: 'Crie nomes claros para campos e métodos. Isso deixa o TAD fácil de explicar e testar.'
          }
        ],
        footer: 'Modelar primeiro deixa o código mais coerente.'
      },
      {
        layout: 'code',
        kicker: 'CÓDIGO',
        title: 'Fluxo básico em C#',
        subtitle: 'Declarar o tipo, preencher os dados e chamar uma operação do próprio TAD.',
        codeTitle: 'Struct Cliente',
        code: `public struct Cliente
{
    public string Nome;
    public string CPF;

    public Cliente(string nome, string cpf)
    {
        Nome = nome;
        CPF = cpf;
    }

    public void Imprimir()
    {
        Console.WriteLine($"Nome: {Nome}");
        Console.WriteLine($"CPF: {CPF}");
    }
}

Cliente cliente = new Cliente("Ana", "123.456.789-00");
cliente.Imprimir();`,
        cards: [
          {
            title: 'Leitura',
            body: 'Cliente é o tipo. A variável cliente guarda os dados de uma pessoa e chama Imprimir() para exibi-los.'
          },
          {
            title: 'Correção',
            body: 'O construtor garante que os campos principais recebam valor antes do uso.'
          }
        ],
        footer: 'Declarar -> preencher -> executar operação.'
      },
      {
        layout: 'steps',
        kicker: 'ROTEIRO',
        title: 'Como pensar antes de programar',
        subtitle: 'Um TAD fica mais fácil quando a modelagem vem antes do código.',
        steps: [
          {
            title: '1. Identifique',
            body: 'Liste as informações que a estrutura precisa guardar.'
          },
          {
            title: '2. Modele',
            body: 'Defina quais operações fazem sentido para esses dados.'
          },
          {
            title: '3. Implemente',
            body: 'Transforme o modelo em struct, classe, interface ou outra estrutura.'
          },
          {
            title: '4. Teste',
            body: 'Crie exemplos no Main e confira se cada operação entrega o resultado esperado.'
          }
        ],
        footer: 'TAD ajuda a pensar na solução antes da sintaxe.'
      }
    ]
  },
  {
    file: 'lista-encadeada-explicativo.pdf',
    accent: colors.teal,
    soft: colors.softTeal,
    section: 'Estrutura de Dados',
    pages: [
      {
        layout: 'cover',
        module: 'Módulo 02',
        title: 'Lista Encadeada Simples',
        subtitle: 'Material visual sobre nós, ponteiros, percurso, inserção e remoção.',
        chips: ['nó', 'prox', 'início', 'fim'],
        cards: [
          {
            title: 'Ideia principal',
            body: 'A lista é formada por nós. Cada nó guarda um valor e aponta apenas para o próximo.'
          },
          {
            title: 'Diferença para vetor',
            body: 'Os elementos não precisam ficar em posições contínuas de memória.'
          },
          {
            title: 'Uso comum',
            body: 'Serve para estudar referências, percurso sequencial e atualização de ligações.'
          }
        ]
      },
      {
        layout: 'diagram',
        kicker: 'NÓ DA LISTA',
        title: 'Valor + próximo',
        subtitle: 'Cada nó possui uma informação e uma referência para continuar o caminho da lista.',
        diagram: { type: 'simple-list', values: ['10', '20', '30'] },
        cards: [
          {
            title: 'Início',
            body: 'Guarda a referência para o primeiro nó. Se for null, a lista está vazia.'
          },
          {
            title: 'Fim',
            body: 'Pode guardar o último nó para facilitar inserções no final.'
          }
        ],
        footer: 'Cada nó conhece somente o próximo.'
      },
      {
        layout: 'steps',
        kicker: 'PERCURSO',
        title: 'Como a lista é lida',
        subtitle: 'Para buscar um valor, o algoritmo começa no início e avança pelo ponteiro prox.',
        steps: [
          {
            title: '1. Começa',
            body: 'Use uma variável auxiliar apontando para o primeiro nó.'
          },
          {
            title: '2. Compara',
            body: 'Verifique se o valor do nó atual é o valor procurado.'
          },
          {
            title: '3. Avança',
            body: 'Se não encontrou, faça atual = atual.prox.'
          },
          {
            title: '4. Para',
            body: 'A busca termina ao encontrar o valor ou ao chegar em null.'
          }
        ],
        footer: 'A busca é sequencial: no pior caso visita todos os nós.'
      },
      {
        layout: 'diagram',
        kicker: 'INSERÇÃO NO INÍCIO',
        title: 'Operação rápida',
        subtitle: 'Inserir no início é O(1), porque não precisa percorrer a lista inteira.',
        diagram: { type: 'insert-start', values: ['10', '20'], newValue: '5' },
        cards: [
          {
            title: 'Passo essencial',
            body: 'O novo nó aponta para o antigo início. Depois, início passa a apontar para o novo nó.'
          },
          {
            title: 'Lista vazia',
            body: 'Se a lista estava vazia, início e fim passam a apontar para o novo nó.'
          }
        ],
        footer: 'Poucos ponteiros são alterados.'
      },
      {
        layout: 'cards',
        kicker: 'INSERÇÃO NO FIM',
        title: 'Precisa chegar ao último',
        subtitle: 'O custo depende de a lista guardar ou não uma referência para o fim.',
        cards: [
          {
            title: 'Sem ponteiro fim',
            body: 'Comece no início e avance até encontrar um nó cujo prox seja null. Custo O(n).'
          },
          {
            title: 'Com ponteiro fim',
            body: 'Faça fim.prox receber o novo nó e depois atualize fim. Custo O(1).'
          },
          {
            title: 'Inserção no meio',
            body: 'É preciso caminhar até o nó anterior à posição desejada e religar as referências.'
          },
          {
            title: 'Regra prática',
            body: 'Atualizar ponteiros é rápido; encontrar o ponto correto é o que costuma custar mais.'
          }
        ],
        footer: 'Ponteiro fim melhora a inserção final.'
      },
      {
        layout: 'diagram',
        kicker: 'REMOÇÃO',
        title: 'Religar para não perder a lista',
        subtitle: 'Ao remover um nó, o anterior precisa apontar para o próximo do removido.',
        diagram: { type: 'remove-middle', values: ['A', 'B', 'C'], remove: 'B' },
        cards: [
          {
            title: 'Antes',
            body: 'A aponta para B e B aponta para C.'
          },
          {
            title: 'Depois',
            body: 'A passa a apontar direto para C. O nó B sai da sequência.'
          }
        ],
        footer: 'Remover exige cuidado com referências.'
      },
      {
        layout: 'code',
        kicker: 'CÓDIGO EM C#',
        title: 'Classe No e inserir no início',
        subtitle: 'Modelo simples para usar como base na página do projeto.',
        codeTitle: 'Lista simples',
        code: `public class No
{
    public int Valor;
    public No Prox;

    public No(int valor)
    {
        Valor = valor;
        Prox = null;
    }
}

public void InserirInicio(int valor)
{
    No novo = new No(valor);
    novo.Prox = inicio;
    inicio = novo;

    if (fim == null)
        fim = novo;
}`,
        cards: [
          {
            title: 'Valor',
            body: 'Guarda a informação principal do nó.'
          },
          {
            title: 'Prox',
            body: 'Guarda a referência para o próximo nó da sequência.'
          }
        ],
        footer: 'Exemplo alinhado ao conteúdo da lista simples.'
      }
    ]
  },
  {
    file: 'lista-duplamente-encadeada-explicativo.pdf',
    accent: colors.amber,
    soft: colors.softAmber,
    section: 'Estrutura de Dados',
    pages: [
      {
        layout: 'cover',
        module: 'Módulo 03',
        title: 'Lista Duplamente Encadeada',
        subtitle: 'Explicação visual sobre nós com anterior e próximo, percurso duplo e manutenção de ponteiros.',
        chips: ['anterior', 'próximo', 'início', 'fim'],
        cards: [
          {
            title: 'Ideia principal',
            body: 'Cada nó conhece o anterior e o próximo, permitindo percorrer a lista nos dois sentidos.'
          },
          {
            title: 'Quando usar',
            body: 'Quando navegação para frente e para trás, inserções e remoções são importantes.'
          },
          {
            title: 'Cuidado',
            body: 'Cada alteração mexe em mais ponteiros que uma lista simples.'
          }
        ]
      },
      {
        layout: 'diagram',
        kicker: 'NÓ DUPLO',
        title: 'Anterior + valor + próximo',
        subtitle: 'O nó guarda três partes: referência anterior, valor armazenado e referência para o próximo nó.',
        diagram: { type: 'double-list', values: ['10', '20', '30'] },
        cards: [
          {
            title: 'Anterior',
            body: 'Permite voltar para o nó que vem antes.'
          },
          {
            title: 'Próximo',
            body: 'Permite avançar para o nó que vem depois.'
          }
        ],
        footer: 'Cada nó aponta para dois lados.'
      },
      {
        layout: 'cards',
        kicker: 'PERCURSO',
        title: 'A lista anda nos dois sentidos',
        subtitle: 'Com início e fim, é possível percorrer da esquerda para a direita ou da direita para a esquerda.',
        cards: [
          {
            title: 'Do início ao fim',
            body: 'Comece no primeiro nó e siga sempre pelo ponteiro próximo até chegar em null.'
          },
          {
            title: 'Do fim ao início',
            body: 'Comece no último nó e siga sempre pelo ponteiro anterior até chegar em null.'
          },
          {
            title: 'Vantagem',
            body: 'É útil em históricos, editores, playlists, navegadores e telas com avançar/voltar.'
          },
          {
            title: 'Custo',
            body: 'Ainda pode haver busca O(n); a vantagem é a navegação reversa quando já existe uma referência.'
          }
        ],
        footer: 'A navegação reversa é a principal diferença para a lista simples.'
      },
      {
        layout: 'steps',
        kicker: 'INSERÇÃO',
        title: 'Como inserir um novo nó',
        subtitle: 'A regra é atualizar o novo nó e também os vizinhos afetados.',
        steps: [
          {
            title: 'No início',
            body: 'novo.Proximo aponta para o antigo primeiro; o antigo primeiro.Anterior aponta para novo.'
          },
          {
            title: 'No fim',
            body: 'novo.Anterior aponta para o antigo último; o antigo último.Proximo aponta para novo.'
          },
          {
            title: 'No meio',
            body: 'novo liga anterior e próximo; depois os dois vizinhos passam a apontar para novo.'
          },
          {
            title: 'Lista vazia',
            body: 'início e fim apontam para o mesmo novo nó.'
          }
        ],
        footer: 'Inserir exige ajustar as ligações nos dois sentidos.'
      },
      {
        layout: 'diagram',
        kicker: 'REMOÇÃO',
        title: 'Como remover sem quebrar a lista',
        subtitle: 'Para remover um nó, conecte o anterior ao próximo e o próximo ao anterior.',
        diagram: { type: 'remove-double', values: ['A', 'B', 'C'], remove: 'B' },
        cards: [
          {
            title: 'Depois da remoção',
            body: 'A.Proximo aponta para C e C.Anterior aponta para A.'
          },
          {
            title: 'Casos de borda',
            body: 'Se remover o primeiro ou último nó, atualize início ou fim.'
          }
        ],
        footer: 'Remover exige religar os vizinhos.'
      },
      {
        layout: 'code',
        kicker: 'CÓDIGO',
        title: 'Modelo de nó duplo em C#',
        subtitle: 'Uma implementação simples com referências para anterior e próximo.',
        codeTitle: 'NoDuplo',
        code: `public class NoDuplo
{
    public int Valor;
    public NoDuplo Anterior;
    public NoDuplo Proximo;

    public NoDuplo(int valor)
    {
        Valor = valor;
        Anterior = null;
        Proximo = null;
    }
}`,
        cards: [
          {
            title: 'Valor',
            body: 'Guarda o dado armazenado.'
          },
          {
            title: 'Anterior e Proximo',
            body: 'Permitem voltar e avançar entre os nós.'
          }
        ],
        footer: 'Base para construir as operações da lista dupla.'
      },
      {
        layout: 'cards',
        kicker: 'RESUMO',
        title: 'Vantagens e cuidados',
        subtitle: 'A lista dupla é flexível, mas exige atenção porque cada alteração mexe em mais referências.',
        cards: [
          {
            title: 'Vantagens',
            body: 'Percorre para frente e para trás. Facilita remoções quando o nó já é conhecido.'
          },
          {
            title: 'Cuidados',
            body: 'Usa mais memória que a lista simples por guardar duas referências em cada nó.'
          },
          {
            title: 'Erros comuns',
            body: 'Atualizar só um lado da ligação, esquecer null nos extremos ou não ajustar início e fim.'
          },
          {
            title: 'Como explicar',
            body: 'Mostre sempre os ponteiros antes e depois da operação.'
          }
        ],
        footer: 'Mais flexibilidade, mais responsabilidade na manutenção dos ponteiros.'
      }
    ]
  },
  {
    file: 'lista-encadeada-requisitos-programacao.pdf',
    accent: colors.violet,
    soft: '#f1effb',
    section: 'Programação',
    pages: [
      {
        layout: 'cover',
        module: 'Guia de implementação',
        title: 'Lista encadeada: requisitos de programação',
        subtitle: 'Como programar inserção no início, no meio e no fim, além de busca em diferentes posições.',
        chips: ['inserção', 'busca', 'custo', 'C#'],
        cards: [
          {
            title: 'Estrutura base',
            body: 'A lista guarda início, fim e tamanho para controlar a sequência de nós.'
          },
          {
            title: 'Operações',
            body: 'Inserir no início, inserir no meio, inserir no fim e buscar valores.'
          },
          {
            title: 'Regra geral',
            body: 'Como cada nó aponta só para o próximo, várias operações caminham desde o início.'
          }
        ]
      },
      {
        layout: 'code',
        kicker: 'BASE DO CÓDIGO',
        title: 'No, início, fim e tamanho',
        subtitle: 'Antes das operações, a lista precisa de uma classe No e referências de controle.',
        codeTitle: 'Estrutura inicial',
        code: `public class No
{
    public int Valor;
    public No Prox;

    public No(int valor)
    {
        Valor = valor;
        Prox = null;
    }
}

No inicio = null;
No fim = null;
int tamanho = 0;`,
        cards: [
          {
            title: 'inicio',
            body: 'Aponta para o primeiro nó da lista.'
          },
          {
            title: 'fim e tamanho',
            body: 'fim acelera inserção final. tamanho ajuda a validar posições.'
          }
        ],
        footer: 'Essa base sustenta todas as operações.'
      },
      {
        layout: 'code',
        kicker: 'INSERIR NO INÍCIO',
        title: 'Novo nó vira o primeiro',
        subtitle: 'É o caso mais simples: não precisa percorrer a lista.',
        codeTitle: 'InserirInicio',
        code: `public void InserirInicio(int valor)
{
    No novo = new No(valor);
    novo.Prox = inicio;
    inicio = novo;

    if (fim == null)
        fim = novo;

    tamanho++;
}`,
        diagram: { type: 'insert-start', values: ['10', '20'], newValue: '5' },
        cards: [
          {
            title: 'Passos',
            body: 'Criar o nó, ligar novo.Prox ao antigo início e atualizar início.'
          },
          {
            title: 'Custo',
            body: 'O(1), porque não depende da quantidade de nós.'
          }
        ],
        footer: 'Inserção no início: custo constante.'
      },
      {
        layout: 'code',
        kicker: 'INSERIR NO MEIO',
        title: 'Precisa parar no nó anterior',
        subtitle: 'Para inserir em uma posição intermediária, encontre primeiro quem vem antes dela.',
        codeTitle: 'InserirNaPosicao',
        code: `public void InserirNaPosicao(int valor, int pos)
{
    if (pos < 0 || pos > tamanho)
        throw new ArgumentOutOfRangeException();

    if (pos == 0) { InserirInicio(valor); return; }
    if (pos == tamanho) { InserirFim(valor); return; }

    No anterior = inicio;
    for (int i = 0; i < pos - 1; i++)
        anterior = anterior.Prox;

    No novo = new No(valor);
    novo.Prox = anterior.Prox;
    anterior.Prox = novo;
    tamanho++;
}`,
        cards: [
          {
            title: 'Passo-chave',
            body: 'Pare no nó anterior. Ele é quem receberá a ligação para o novo nó.'
          },
          {
            title: 'Custo',
            body: 'O(n), porque pode ser necessário caminhar por parte da lista.'
          }
        ],
        footer: 'A atualização dos ponteiros é O(1); encontrar a posição é O(n).'
      },
      {
        layout: 'code',
        kicker: 'INSERIR NO FIM',
        title: 'Novo nó vira o último',
        subtitle: 'Com ponteiro fim, a operação fica direta. Sem ele, seria preciso percorrer até o último nó.',
        codeTitle: 'InserirFim',
        code: `public void InserirFim(int valor)
{
    No novo = new No(valor);

    if (inicio == null)
    {
        inicio = novo;
        fim = novo;
    }
    else
    {
        fim.Prox = novo;
        fim = novo;
    }

    tamanho++;
}`,
        cards: [
          {
            title: 'Lista vazia',
            body: 'inicio e fim apontam para o novo nó.'
          },
          {
            title: 'Lista com nós',
            body: 'fim.Prox aponta para novo, depois fim passa a ser novo.'
          }
        ],
        footer: 'Inserção no fim: O(1) com fim, O(n) sem fim.'
      },
      {
        layout: 'code',
        kicker: 'BUSCAR VALOR',
        title: 'Uma função resolve início, meio e fim',
        subtitle: 'A busca compara o valor do nó atual. Se não achou, avança para o próximo.',
        codeTitle: 'Buscar',
        code: `public No Buscar(int valor)
{
    No atual = inicio;

    while (atual != null)
    {
        if (atual.Valor == valor)
            return atual;

        atual = atual.Prox;
    }

    return null;
}`,
        cards: [
          {
            title: 'Ideia',
            body: 'A mesma função encontra valores no início, no meio ou no fim.'
          },
          {
            title: 'O que muda',
            body: 'Muda a quantidade de passos até encontrar o valor ou chegar em null.'
          }
        ],
        footer: 'Busca geral: percorre nó por nó.'
      },
      {
        layout: 'diagram',
        kicker: 'BUSCA NO INÍCIO',
        title: 'Melhor caso',
        subtitle: 'Quando o valor está no primeiro nó, a busca compara uma única vez e termina.',
        diagram: { type: 'search', values: ['10', '20', '30'], highlight: 0 },
        cards: [
          {
            title: 'Como funciona',
            body: 'atual começa em inicio. atual.Valor já é o valor procurado.'
          },
          {
            title: 'Custo',
            body: 'O(1), porque não precisa andar pela lista.'
          }
        ],
        footer: 'Busca no início: melhor caso.'
      },
      {
        layout: 'diagram',
        kicker: 'BUSCA NO MEIO',
        title: 'Percurso parcial',
        subtitle: 'Quando o valor está no meio, a busca passa pelos nós anteriores antes de encontrar.',
        diagram: { type: 'search', values: ['10', '20', '30'], highlight: 1 },
        cards: [
          {
            title: 'Como funciona',
            body: 'Compara com o primeiro nó, avança, e repete até chegar no valor.'
          },
          {
            title: 'Custo',
            body: 'O(k), onde k é a posição visitada; em análise geral, tratamos como O(n).'
          }
        ],
        footer: 'Busca no meio: depende da posição.'
      },
      {
        layout: 'diagram',
        kicker: 'BUSCA NO FIM',
        title: 'Pior caso com valor existente',
        subtitle: 'Quando o valor está no último nó, a busca atravessa quase toda a lista.',
        diagram: { type: 'search', values: ['10', '20', '30'], highlight: 2 },
        cards: [
          {
            title: 'Como funciona',
            body: 'Compara desde o início e avança nó por nó até o último elemento.'
          },
          {
            title: 'Custo',
            body: 'O(n), porque pode precisar visitar todos os nós.'
          }
        ],
        footer: 'Buscar valor inexistente também é O(n).'
      },
      {
        layout: 'cards',
        kicker: 'RESUMO PRÁTICO',
        title: 'O que muda entre início, meio e fim',
        subtitle: 'O segredo é saber quando precisa percorrer a lista e quando basta mexer nas referências diretas.',
        cards: [
          {
            title: 'Início',
            body: 'Inserção é rápida. Busca é melhor caso quando o valor já está no primeiro nó.'
          },
          {
            title: 'Meio',
            body: 'Normalmente precisa percorrer até o ponto certo antes de inserir ou encontrar.'
          },
          {
            title: 'Fim',
            body: 'Inserção fica rápida com ponteiro fim. Busca no fim continua exigindo percurso.'
          },
          {
            title: 'Prova no código',
            body: 'Use exemplos no Main chamando inserir e buscar para início, meio, fim e valor inexistente.'
          }
        ],
        footer: 'Material pronto para apoiar a programação e a explicação no site.'
      }
    ]
  },
  {
    file: 'exercicios-struct-explicativo.pdf',
    accent: colors.rose,
    soft: colors.softRose,
    section: 'Exercícios',
    pages: [
      {
        layout: 'cover',
        module: 'Lista de exercícios',
        title: 'Struct como TAD',
        subtitle: 'Roteiro organizado para modelar structs, escolher dados coerentes e implementar operações.',
        chips: ['modelagem', 'campos', 'métodos', 'Git'],
        cards: [
          {
            title: 'Objetivo',
            body: 'Criar uma struct para cada contexto, escolhendo dados coerentes e operações adequadas.'
          },
          {
            title: 'Entrega',
            body: 'Criar repositório Git, fazer commits por exercício e enviar o link na tarefa.'
          },
          {
            title: 'Como estudar',
            body: 'Use cada contexto como um pequeno TAD: dados + operações + teste no Main.'
          }
        ]
      },
      {
        layout: 'exercise',
        kicker: 'EXERCÍCIO A',
        title: 'JogadorFutebol',
        subtitle: 'Modele um jogador com dados esportivos e operações de controle de cartões e vínculo.',
        context: 'Futebol',
        data: [
          'Nome',
          'Idade',
          'Posição',
          'Número da camisa',
          'Clube',
          'Cartões amarelos',
          'Cartões vermelhos',
          'Status de vínculo'
        ],
        operations: [
          'RegistrarCartaoAmarelo()',
          'RegistrarCartaoVermelho()',
          'VerificarVinculoClube()',
          'Imprimir()'
        ],
        footer: 'Pense no jogador como um TAD pequeno e autônomo.'
      },
      {
        layout: 'exercise',
        kicker: 'EXERCÍCIO B',
        title: 'EquipeEsports',
        subtitle: 'Modele uma equipe de e-sports com histórico de campeonatos e premiações.',
        context: 'E-sports',
        data: [
          'Nome da equipe',
          'Jogo principal',
          'País',
          'Ano de estreia',
          'Campeonatos vencidos',
          'Valor total de premiações'
        ],
        operations: [
          'RegistrarCampeonatoVencido(valorPremio)',
          'AtualizarValorTotalPremiacoes(valor)',
          'VerificarAnoEstreia()',
          'Imprimir()'
        ],
        footer: 'Mantenha os métodos ligados ao contexto da equipe.'
      },
      {
        layout: 'exercise',
        kicker: 'EXERCÍCIO C',
        title: 'Produto',
        subtitle: 'Modele um produto com preço, estoque e regras de desconto.',
        context: 'Estoque e venda',
        data: [
          'Nome',
          'Código',
          'Categoria',
          'Preço',
          'Quantidade em estoque',
          'Marca',
          'Disponibilidade'
        ],
        operations: [
          'AplicarCupomDescontoValor(valor)',
          'AplicarCupomDescontoPorcentagem(percentual)',
          'VerificarQuantidadeEmEstoque()',
          'Imprimir()'
        ],
        footer: 'Valide desconto e estoque para evitar valores incoerentes.'
      },
      {
        layout: 'exercise',
        kicker: 'EXERCÍCIO D',
        title: 'Professor',
        subtitle: 'Modele um professor com salário, faltas e carga horária de trabalho.',
        context: 'Professor',
        data: [
          'Nome',
          'Disciplina',
          'Titulação',
          'Salário',
          'Carga horária',
          'Quantidade de faltas',
          'Departamento'
        ],
        operations: [
          'ReajustarSalarioEmValor(valor)',
          'ReajustarSalarioEmPorcentagem(percentual)',
          'DescontarFaltaEmValor(valor)',
          'DescontarFaltaEmPorcentagem(percentual)',
          'AumentarCargaHoraria(horas)',
          'Imprimir()'
        ],
        footer: 'Explique no código o que cada operação altera.'
      },
      {
        layout: 'steps',
        kicker: 'DICA DE IMPLEMENTAÇÃO',
        title: 'Como resolver cada exercício',
        subtitle: 'Use o mesmo roteiro para todos os contextos e mantenha commits pequenos.',
        steps: [
          {
            title: '1. Campos',
            body: 'Liste todos os dados antes de programar a struct.'
          },
          {
            title: '2. Métodos',
            body: 'Crie uma função para cada operação pedida.'
          },
          {
            title: '3. Teste',
            body: 'No Main, preencha a struct e chame todos os métodos.'
          },
          {
            title: '4. Commit',
            body: 'Faça commits separados, por exemplo: exercicio-jogador e exercicio-produto.'
          }
        ],
        footer: 'Roteiro visual para explicar a lista no site.'
      }
    ]
  }
];

export { documents };

class PdfCanvas {
  constructor(doc, pageNumber, totalPages) {
    this.doc = doc;
    this.pageNumber = pageNumber;
    this.totalPages = totalPages;
    this.ops = [];
  }

  toString() {
    return this.ops.join('\n');
  }

  raw(value) {
    this.ops.push(value);
  }

  rgb(hex) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    return `${fmt(r)} ${fmt(g)} ${fmt(b)}`;
  }

  fill(hex) {
    this.raw(`${this.rgb(hex)} rg`);
  }

  stroke(hex) {
    this.raw(`${this.rgb(hex)} RG`);
  }

  rect(x, y, width, height, fillColor = null, strokeColor = null, lineWidth = 1) {
    if (fillColor) this.fill(fillColor);
    if (strokeColor) this.stroke(strokeColor);
    this.raw(`${fmt(lineWidth)} w`);
    this.raw(`${fmt(x)} ${fmt(PAGE.height - y - height)} ${fmt(width)} ${fmt(height)} re`);
    this.raw(fillColor && strokeColor ? 'B' : fillColor ? 'f' : 'S');
  }

  roundedRect(x, y, width, height, radius, fillColor = null, strokeColor = null, lineWidth = 1) {
    const r = Math.min(radius, width / 2, height / 2);
    const k = 0.5522847498;
    const x0 = x;
    const x1 = x + width;
    const y0 = PAGE.height - y - height;
    const y1 = PAGE.height - y;
    if (fillColor) this.fill(fillColor);
    if (strokeColor) this.stroke(strokeColor);
    this.raw(`${fmt(lineWidth)} w`);
    this.raw(`${fmt(x0 + r)} ${fmt(y0)} m`);
    this.raw(`${fmt(x1 - r)} ${fmt(y0)} l`);
    this.raw(`${fmt(x1 - r + r * k)} ${fmt(y0)} ${fmt(x1)} ${fmt(y0 + r - r * k)} ${fmt(x1)} ${fmt(y0 + r)} c`);
    this.raw(`${fmt(x1)} ${fmt(y1 - r)} l`);
    this.raw(`${fmt(x1)} ${fmt(y1 - r + r * k)} ${fmt(x1 - r + r * k)} ${fmt(y1)} ${fmt(x1 - r)} ${fmt(y1)} c`);
    this.raw(`${fmt(x0 + r)} ${fmt(y1)} l`);
    this.raw(`${fmt(x0 + r - r * k)} ${fmt(y1)} ${fmt(x0)} ${fmt(y1 - r + r * k)} ${fmt(x0)} ${fmt(y1 - r)} c`);
    this.raw(`${fmt(x0)} ${fmt(y0 + r)} l`);
    this.raw(`${fmt(x0)} ${fmt(y0 + r - r * k)} ${fmt(x0 + r - r * k)} ${fmt(y0)} ${fmt(x0 + r)} ${fmt(y0)} c`);
    this.raw('h');
    this.raw(fillColor && strokeColor ? 'B' : fillColor ? 'f' : 'S');
  }

  line(x1, y1, x2, y2, color = colors.line, lineWidth = 2) {
    this.stroke(color);
    this.raw(`${fmt(lineWidth)} w`);
    this.raw(`${fmt(x1)} ${fmt(PAGE.height - y1)} m ${fmt(x2)} ${fmt(PAGE.height - y2)} l S`);
  }

  arrow(x1, y1, x2, y2, color = colors.muted, lineWidth = 2) {
    this.line(x1, y1, x2, y2, color, lineWidth);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 8;
    const a1 = angle + Math.PI - 0.45;
    const a2 = angle + Math.PI + 0.45;
    const p1 = [x2 + Math.cos(a1) * size, y2 + Math.sin(a1) * size];
    const p2 = [x2 + Math.cos(a2) * size, y2 + Math.sin(a2) * size];
    this.fill(color);
    this.raw(`${fmt(x2)} ${fmt(PAGE.height - y2)} m ${fmt(p1[0])} ${fmt(PAGE.height - p1[1])} l ${fmt(p2[0])} ${fmt(PAGE.height - p2[1])} l h f`);
  }

  textLine(text, x, y, size, options = {}) {
    const font = options.font || 'regular';
    const color = options.color || colors.ink;
    const align = options.align || 'left';
    const width = textWidth(text, size, font);
    let tx = x;
    if (align === 'center') tx = x - width / 2;
    if (align === 'right') tx = x - width;
    this.fill(color);
    this.raw(`BT /${fontName(font)} ${fmt(size)} Tf ${fmt(tx)} ${fmt(PAGE.height - y - size)} Td (${escapePdfString(text)}) Tj ET`);
  }

  textBlock(text, x, y, maxWidth, options = {}) {
    const size = options.size || 11;
    const font = options.font || 'regular';
    const color = options.color || colors.ink;
    const lineHeight = options.lineHeight || size * 1.32;
    const paragraphs = `${text}`.split('\n');
    let offset = 0;
    for (const paragraph of paragraphs) {
      const lines = wrap(paragraph, maxWidth, size, font);
      for (const line of lines) {
        this.textLine(line, x, y + offset, size, { font, color, align: options.align || 'left' });
        offset += lineHeight;
      }
      if (paragraphs.length > 1) offset += lineHeight * 0.25;
    }
    return offset;
  }
}

function renderPage(doc, page, pageNumber, totalPages) {
  const c = new PdfCanvas(doc, pageNumber, totalPages);
  c.rect(0, 0, PAGE.width, PAGE.height, colors.paper);
  c.rect(0, 0, PAGE.width, 8, doc.accent);
  c.rect(0, PAGE.height - 10, PAGE.width, 10, doc.accent);

  if (page.layout === 'cover') renderCover(c, doc, page);
  else {
    renderHeader(c, doc, page);
    if (page.layout === 'cards') renderCards(c, doc, page);
    if (page.layout === 'diagram') renderDiagramPage(c, doc, page);
    if (page.layout === 'code') renderCodePage(c, doc, page);
    if (page.layout === 'steps') renderSteps(c, doc, page);
    if (page.layout === 'exercise') renderExercise(c, doc, page);
  }

  renderFooter(c, doc, page);
  return c.toString();
}

function renderHeader(c, doc, page) {
  c.textLine(page.kicker || doc.section, 48, 29, 9, { font: 'bold', color: doc.accent });
  c.textLine('Grupo 6 | Estrutura de Dados', PAGE.width - 48, 29, 9, { align: 'right', color: colors.muted });
  c.textLine(page.title, 48, 57, titleSize(page.title), { font: 'bold', color: colors.ink });
  c.textBlock(page.subtitle || '', 50, 95, 700, { size: 11.5, color: colors.muted, lineHeight: 15 });
}

function renderFooter(c, doc, page) {
  const pageText = `${String(c.pageNumber).padStart(2, '0')} / ${String(c.totalPages).padStart(2, '0')}`;
  c.line(48, PAGE.height - 42, PAGE.width - 48, PAGE.height - 42, colors.line, 1);
  c.textLine(page.footer || doc.section, 48, PAGE.height - 30, 9, { color: colors.muted });
  c.textLine(pageText, PAGE.width - 48, PAGE.height - 30, 9, { align: 'right', color: colors.muted });
}

function renderCover(c, doc, page) {
  c.rect(0, 0, 250, PAGE.height, doc.soft);
  c.rect(0, 0, 18, PAGE.height, doc.accent);
  c.roundedRect(48, 44, 148, 30, 8, '#ffffff', doc.accent, 1);
  c.textLine(page.module, 62, 54, 10, { font: 'bold', color: doc.accent });
  c.textLine(page.title, 48, 112, 36, { font: 'bold', color: colors.ink });
  c.textBlock(page.subtitle, 50, 166, 500, { size: 14, color: colors.muted, lineHeight: 19 });

  let chipX = 50;
  for (const chip of page.chips || []) {
    const w = Math.max(58, textWidth(chip, 9, 'bold') + 24);
    c.roundedRect(chipX, 222, w, 25, 8, '#ffffff', doc.accent, 0.8);
    c.textLine(chip, chipX + w / 2, 230, 9, { font: 'bold', color: doc.accent, align: 'center' });
    chipX += w + 10;
  }

  drawTopicDiagram(c, doc, 590, 92, 180, 180, page.chips || []);

  const cards = page.cards || [];
  const cardW = 232;
  cards.forEach((card, index) => {
    drawCard(c, card, 48 + index * (cardW + 24), 360, cardW, 118, doc, {
      titleSize: 13,
      bodySize: 10.4
    });
  });
}

function renderCards(c, doc, page) {
  const startY = 150;
  const cardW = 350;
  const cardH = 126;
  const gapX = 32;
  const gapY = 22;
  page.cards.forEach((card, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    drawCard(c, card, 48 + col * (cardW + gapX), startY + row * (cardH + gapY), cardW, cardH, doc);
  });
}

function renderDiagramPage(c, doc, page) {
  const diagramX = 56;
  const diagramY = 145;
  const diagramW = 520;
  const diagramH = 250;
  c.roundedRect(diagramX, diagramY, diagramW, diagramH, 10, '#ffffff', colors.line, 1);
  drawDiagram(c, doc, page.diagram, diagramX + 28, diagramY + 32, diagramW - 56, diagramH - 64);

  const cardX = 604;
  const cards = page.cards || [];
  cards.forEach((card, index) => {
    drawCard(c, card, cardX, 145 + index * 134, 190, 112, doc, {
      titleSize: 12,
      bodySize: 9.8
    });
  });
}

function renderCodePage(c, doc, page) {
  const hasDiagram = Boolean(page.diagram);
  const codeX = 48;
  const codeY = 145;
  const codeW = hasDiagram ? 450 : 500;
  const codeH = 330;
  drawCodeBlock(c, page.codeTitle || 'Código', page.code, codeX, codeY, codeW, codeH, doc);

  if (hasDiagram) {
    c.roundedRect(520, 145, 270, 150, 10, '#ffffff', colors.line, 1);
    drawDiagram(c, doc, page.diagram, 540, 170, 230, 95);
    (page.cards || []).forEach((card, index) => {
      drawCard(c, card, 520, 316 + index * 86, 270, 72, doc, {
        titleSize: 11,
        bodySize: 8.8
      });
    });
    return;
  }

  (page.cards || []).forEach((card, index) => {
    drawCard(c, card, 580, 155 + index * 145, 214, 118, doc, {
      titleSize: 12,
      bodySize: 9.8
    });
  });
}

function renderSteps(c, doc, page) {
  const steps = page.steps || [];
  const x = 48;
  const y = 170;
  const w = (PAGE.width - 96 - 24 * (steps.length - 1)) / steps.length;
  steps.forEach((step, index) => {
    drawCard(c, step, x + index * (w + 24), y, w, 210, doc, {
      titleSize: 13,
      bodySize: 10,
      marker: index + 1
    });
  });
}

function renderExercise(c, doc, page) {
  c.roundedRect(48, 145, 220, 62, 10, doc.soft, doc.accent, 1);
  c.textLine('Contexto', 68, 160, 10, { font: 'bold', color: doc.accent });
  c.textLine(page.context, 68, 180, 18, { font: 'bold', color: colors.ink });

  drawListCard(c, 'Dados possíveis', page.data, 48, 235, 342, 240, doc);
  drawListCard(c, 'Operações', page.operations, 420, 235, 374, 240, doc);
}

function drawCard(c, card, x, y, w, h, doc, options = {}) {
  c.roundedRect(x, y, w, h, 10, '#ffffff', colors.line, 1);
  c.rect(x, y, 6, h, doc.accent);
  if (options.marker) {
    c.roundedRect(x + w - 48, y + 16, 26, 26, 13, doc.soft, doc.accent, 1);
    c.textLine(String(options.marker), x + w - 35, y + 23, 10, { font: 'bold', color: doc.accent, align: 'center' });
  }
  c.textLine(card.title, x + 20, y + 18, options.titleSize || 13, { font: 'bold', color: colors.ink });
  c.textBlock(card.body, x + 20, y + 48, w - 38, {
    size: options.bodySize || 10.5,
    color: colors.muted,
    lineHeight: (options.bodySize || 10.5) * 1.35
  });
}

function drawListCard(c, title, items, x, y, w, h, doc) {
  c.roundedRect(x, y, w, h, 10, '#ffffff', colors.line, 1);
  c.textLine(title, x + 20, y + 20, 14, { font: 'bold', color: colors.ink });
  c.line(x + 20, y + 50, x + w - 20, y + 50, colors.line, 1);
  items.forEach((item, index) => {
    const itemY = y + 72 + index * 22;
    c.roundedRect(x + 20, itemY - 3, 12, 12, 6, doc.soft, doc.accent, 0.6);
    c.textLine(item, x + 42, itemY - 5, 10.3, { color: colors.muted });
  });
}

function drawCodeBlock(c, title, code, x, y, w, h, doc) {
  c.roundedRect(x, y, w, h, 10, colors.codeBg, '#0f1722', 1);
  c.rect(x, y, w, 38, doc.accent);
  c.textLine(title, x + 18, y + 12, 11, { font: 'bold', color: '#ffffff' });
  const lines = code.split('\n');
  let fontSize = lines.length > 20 ? 8.4 : lines.length > 16 ? 9 : 9.8;
  const lineHeight = fontSize * 1.38;
  lines.forEach((line, index) => {
    const yy = y + 56 + index * lineHeight;
    if (yy > y + h - 18) return;
    if (index % 2 === 0) c.rect(x + 14, yy - 4, w - 28, lineHeight + 1, colors.codeLine);
    c.textLine(line, x + 20, yy - 4, fontSize, { font: 'mono', color: colors.codeText });
  });
}

function drawTopicDiagram(c, doc, x, y, w, h, labels) {
  c.roundedRect(x, y, w, h, 18, '#ffffff', colors.line, 1);
  const cx = x + w / 2;
  const cy = y + h / 2;
  c.roundedRect(cx - 42, cy - 26, 84, 52, 12, doc.accent, doc.accent, 1);
  c.textLine('ED', cx, cy - 7, 22, { font: 'bold', color: '#ffffff', align: 'center' });
  const nodes = [
    [x + 25, y + 25, labels[0] || 'dados'],
    [x + w - 78, y + 25, labels[1] || 'operações'],
    [x + 25, y + h - 58, labels[2] || 'código'],
    [x + w - 90, y + h - 58, labels[3] || 'modelo']
  ];
  nodes.forEach(([nx, ny, label]) => {
    c.roundedRect(nx, ny, 64, 30, 8, doc.soft, doc.accent, 0.8);
    c.textLine(label, nx + 32, ny + 9, 8.3, { font: 'bold', color: doc.accent, align: 'center' });
    c.line(cx, cy, nx + 32, ny + 15, doc.accent, 1.2);
  });
}

function drawDiagram(c, doc, diagram, x, y, w, h) {
  if (!diagram) return;
  if (diagram.type === 'simple-list') drawSimpleList(c, doc, x, y, w, h, diagram.values);
  if (diagram.type === 'insert-start') drawInsertStart(c, doc, x, y, w, h, diagram.values, diagram.newValue);
  if (diagram.type === 'remove-middle') drawRemoveMiddle(c, doc, x, y, w, h, diagram.values);
  if (diagram.type === 'double-list') drawDoubleList(c, doc, x, y, w, h, diagram.values);
  if (diagram.type === 'remove-double') drawRemoveDouble(c, doc, x, y, w, h, diagram.values);
  if (diagram.type === 'search') drawSearch(c, doc, x, y, w, h, diagram.values, diagram.highlight);
}

function drawNode(c, doc, x, y, label, options = {}) {
  const w = options.width || 76;
  const h = options.height || 52;
  const fill = options.highlight ? doc.soft : '#ffffff';
  const stroke = options.highlight ? doc.accent : colors.line;
  c.roundedRect(x, y, w, h, 10, fill, stroke, 1.2);
  c.textLine(label, x + w / 2, y + 13, 18, { font: 'bold', color: colors.ink, align: 'center' });
  if (options.pointer) {
    c.line(x + w - 25, y + 8, x + w - 25, y + h - 8, colors.line, 1);
    c.textLine(options.pointer, x + w - 12, y + 18, 7.5, { color: colors.muted, align: 'center' });
  }
}

function drawSimpleList(c, doc, x, y, w, h, values) {
  const nodeY = y + h / 2 - 30;
  const startX = x + 34;
  c.textLine('início', startX - 6, nodeY - 30, 10, { font: 'bold', color: doc.accent });
  values.forEach((value, index) => {
    const nx = startX + index * 130;
    drawNode(c, doc, nx, nodeY, value, { pointer: 'prox' });
    if (index < values.length - 1) c.arrow(nx + 76, nodeY + 26, nx + 122, nodeY + 26, doc.accent, 2);
  });
  const lastX = startX + (values.length - 1) * 130;
  c.arrow(lastX + 76, nodeY + 26, lastX + 120, nodeY + 26, colors.muted, 2);
  c.textLine('null', lastX + 145, nodeY + 14, 13, { font: 'bold', color: colors.muted });
  c.textLine('fim', lastX + 42, nodeY + 68, 10, { font: 'bold', color: doc.accent, align: 'center' });
}

function drawInsertStart(c, doc, x, y, w, h, values, newValue) {
  const nodeY = y + h / 2 - 24;
  drawNode(c, doc, x + 16, nodeY, newValue, { pointer: 'prox', highlight: true });
  c.textLine('novo', x + 54, nodeY - 24, 10, { font: 'bold', color: doc.accent, align: 'center' });
  c.arrow(x + 92, nodeY + 26, x + 140, nodeY + 26, doc.accent, 2);
  values.forEach((value, index) => {
    const nx = x + 150 + index * 120;
    drawNode(c, doc, nx, nodeY, value, { pointer: 'prox' });
    if (index < values.length - 1) c.arrow(nx + 76, nodeY + 26, nx + 112, nodeY + 26, colors.muted, 2);
  });
  c.textLine('novo.Prox = início antigo', x + 20, nodeY + 88, 11, { color: colors.muted });
}

function drawRemoveMiddle(c, doc, x, y, w, h, values) {
  const nodeY = y + h / 2 - 28;
  values.forEach((value, index) => {
    const nx = x + 52 + index * 130;
    drawNode(c, doc, nx, nodeY, value, { pointer: 'prox', highlight: index === 1 });
    if (index < values.length - 1) c.arrow(nx + 76, nodeY + 26, nx + 122, nodeY + 26, index === 0 ? colors.rose : colors.muted, 2);
  });
  c.textLine('remover B', x + 186, nodeY - 28, 11, { font: 'bold', color: colors.rose, align: 'center' });
  c.arrow(x + 128, nodeY + 88, x + 300, nodeY + 88, doc.accent, 2.2);
  c.textLine('A.Prox aponta para C', x + 214, nodeY + 104, 10.5, { color: doc.accent, align: 'center' });
}

function drawDoubleList(c, doc, x, y, w, h, values) {
  const nodeY = y + h / 2 - 28;
  values.forEach((value, index) => {
    const nx = x + 42 + index * 135;
    drawNode(c, doc, nx, nodeY, value, { pointer: 'ant | prox' });
    if (index < values.length - 1) {
      c.arrow(nx + 76, nodeY + 18, nx + 125, nodeY + 18, doc.accent, 2);
      c.arrow(nx + 125, nodeY + 38, nx + 76, nodeY + 38, colors.amber, 2);
    }
  });
  c.textLine('próximo', x + 198, nodeY - 26, 10, { font: 'bold', color: doc.accent, align: 'center' });
  c.textLine('anterior', x + 198, nodeY + 72, 10, { font: 'bold', color: colors.amber, align: 'center' });
}

function drawRemoveDouble(c, doc, x, y, w, h, values) {
  drawDoubleList(c, doc, x, y, w, h, values);
  const nodeY = y + h / 2 - 28;
  c.textLine('remover B', x + 214, nodeY - 38, 11, { font: 'bold', color: colors.rose, align: 'center' });
  c.arrow(x + 128, nodeY + 100, x + 314, nodeY + 100, doc.accent, 2.2);
  c.arrow(x + 314, nodeY + 120, x + 128, nodeY + 120, colors.amber, 2.2);
}

function drawSearch(c, doc, x, y, w, h, values, highlight) {
  const nodeY = y + h / 2 - 28;
  values.forEach((value, index) => {
    const nx = x + 50 + index * 130;
    drawNode(c, doc, nx, nodeY, value, { pointer: 'prox', highlight: index === highlight });
    if (index < values.length - 1) c.arrow(nx + 76, nodeY + 26, nx + 122, nodeY + 26, colors.muted, 2);
    const label = index === highlight ? 'encontrou' : 'compara';
    c.textLine(label, nx + 38, nodeY + 68, 9, { font: 'bold', color: index === highlight ? doc.accent : colors.muted, align: 'center' });
  });
  c.textLine('atual percorre a lista', x + w / 2, nodeY - 34, 11, { font: 'bold', color: doc.accent, align: 'center' });
}

function createPdf(doc) {
  const objects = [null, '', ''];

  const fontIds = {
    regular: addObject(objects, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'),
    bold: addObject(objects, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'),
    mono: addObject(objects, '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>'),
    italic: addObject(objects, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>')
  };

  const pageIds = [];
  doc.pages.forEach((page, index) => {
    const content = renderPage(doc, page, index + 1, doc.pages.length);
    const contentId = addObject(objects, streamObject(content));
    const pageId = addObject(
      objects,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] /Resources << /Font << /F1 ${fontIds.regular} 0 R /F2 ${fontIds.bold} 0 R /F3 ${fontIds.mono} 0 R /F4 ${fontIds.italic} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    pageIds.push(pageId);
  });

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] >>`;

  return assemblePdf(objects);
}

function addObject(objects, value) {
  objects.push(value);
  return objects.length - 1;
}

function streamObject(content) {
  const compressed = zlib.deflateSync(Buffer.from(content, 'latin1'));
  return Buffer.concat([
    Buffer.from(`<< /Length ${compressed.length} /Filter /FlateDecode >>\nstream\n`, 'latin1'),
    compressed,
    Buffer.from('\nendstream', 'latin1')
  ]);
}

function assemblePdf(objects) {
  const chunks = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'latin1')];
  const offsets = [0];
  let position = chunks[0].length;

  for (let i = 1; i < objects.length; i++) {
    offsets[i] = position;
    const header = Buffer.from(`${i} 0 obj\n`, 'latin1');
    const body = Buffer.isBuffer(objects[i]) ? objects[i] : Buffer.from(objects[i], 'latin1');
    const footer = Buffer.from('\nendobj\n', 'latin1');
    chunks.push(header, body, footer);
    position += header.length + body.length + footer.length;
  }

  const xrefOffset = position;
  const xrefRows = ['xref', `0 ${objects.length}`, '0000000000 65535 f '];
  for (let i = 1; i < objects.length; i++) {
    xrefRows.push(`${String(offsets[i]).padStart(10, '0')} 00000 n `);
  }
  xrefRows.push(
    'trailer',
    `<< /Size ${objects.length} /Root 1 0 R >>`,
    'startxref',
    String(xrefOffset),
    '%%EOF'
  );
  chunks.push(Buffer.from(`${xrefRows.join('\n')}\n`, 'latin1'));
  return Buffer.concat(chunks);
}

function fontName(font) {
  if (font === 'bold') return 'F2';
  if (font === 'mono') return 'F3';
  if (font === 'italic') return 'F4';
  return 'F1';
}

function fmt(number) {
  return Number(number).toFixed(2).replace(/\.00$/, '');
}

function titleSize(title) {
  if (title.length > 50) return 25;
  if (title.length > 38) return 28;
  return 31;
}

function normalizeText(text) {
  return `${text}`
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/→/g, '->');
}

function escapePdfString(text) {
  const bytes = Buffer.from(normalizeText(text), 'latin1');
  let out = '';
  for (const byte of bytes) {
    if (byte === 40 || byte === 41 || byte === 92) out += `\\${String.fromCharCode(byte)}`;
    else if (byte < 32 || byte > 126) out += `\\${byte.toString(8).padStart(3, '0')}`;
    else out += String.fromCharCode(byte);
  }
  return out;
}

function textWidth(text, size, font = 'regular') {
  const normalized = normalizeText(text);
  let units = 0;
  for (const char of normalized) {
    if (char === ' ') units += 0.28;
    else if ('il.,:;!|'.includes(char)) units += 0.24;
    else if ('mwMW@#%'.includes(char)) units += 0.82;
    else if (/[A-Z0-9]/.test(char)) units += 0.58;
    else units += 0.5;
  }
  const weight = font === 'bold' ? 1.05 : font === 'mono' ? 1.16 : 1;
  return units * size * weight;
}

function wrap(text, maxWidth, size, font) {
  const words = normalizeText(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];
  const lines = [];
  let current = '';
  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word;
    if (textWidth(attempt, size, font) <= maxWidth) {
      current = attempt;
      continue;
    }
    if (current) lines.push(current);
    if (textWidth(word, size, font) <= maxWidth) {
      current = word;
    } else {
      const pieces = splitLongWord(word, maxWidth, size, font);
      lines.push(...pieces.slice(0, -1));
      current = pieces[pieces.length - 1];
    }
  }
  if (current) lines.push(current);
  return lines;
}

function splitLongWord(word, maxWidth, size, font) {
  const pieces = [];
  let current = '';
  for (const char of word) {
    const attempt = current + char;
    if (textWidth(attempt, size, font) <= maxWidth) current = attempt;
    else {
      if (current) pieces.push(current);
      current = char;
    }
  }
  if (current) pieces.push(current);
  return pieces;
}

export function generateAll() {
  fs.mkdirSync(outputDir, { recursive: true });
  for (const doc of documents) {
    const pdf = createPdf(doc);
    fs.writeFileSync(path.join(outputDir, doc.file), pdf);
  }
  return documents.map((doc) => path.join(outputDir, doc.file));
}

generateAll();
