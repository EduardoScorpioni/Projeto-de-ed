<?php
/* app/Models/GamificacaoPerfil.php */

namespace App\Models;

use App\Config\Database;

/**
 * Perfil de gameficação (BrunoCoins, XP, inventario, missoes) de um usuario logado.
 *
 * Arquitetura adotada: o "motor" do jogo continua calculado no cliente, em
 * assets/js/gamificacao.js e assets/js/dashboard-perguntas.js.
 * A persistencia e sincronizada com o MySQL (tabela gamificacao_perfis) via api.
 * O banco de desafios (perguntas do quiz e do dashboard) mora aqui como fonte unica.
 */
class GamificacaoPerfil
{
    private static $estadoPadrao = [
        'coins' => 350,
        'xp' => 0,
        'combo' => 0,
        'bestCombo' => 0,
        'answered' => 0,
        'correct' => 0,
        'purchases' => 0,
        'owned' => ['camiseta-grupo-6', 'calca-base-ed'],
        'equipped' => ['tronco' => 'camiseta-grupo-6', 'pernas' => 'calca-base-ed'],
        'upgrades' => [],
        'claimedMissions' => [],
        'chestReadyAt' => 0,
        'abilityCharges' => [],
        'questionsProgress' => [],
    ];

    /**
     * Busca o perfil salvo do usuario; se ainda nao existir, cria a linha padrao.
     */
    public static function buscarOuCriar($usuarioId)
    {
        $stmt = Database::conexao()->prepare(
            'SELECT brunocoins, xp, nivel, estado_json FROM gamificacao_perfis WHERE usuario_id = ?'
        );
        $stmt->execute([$usuarioId]);
        $linha = $stmt->fetch();

        if (!$linha) {
            $criar = Database::conexao()->prepare(
                'INSERT INTO gamificacao_perfis (usuario_id, brunocoins, xp, nivel) VALUES (?, 350, 0, 1)'
            );
            $criar->execute([$usuarioId]);

            return self::$estadoPadrao;
        }

        $estadoSalvo = $linha['estado_json'] ? json_decode((string) $linha['estado_json'], true) : null;

        if (!is_array($estadoSalvo)) {
            $estadoSalvo = [
                'coins' => (int) $linha['brunocoins'],
                'xp' => (int) $linha['xp'],
                'nivel' => (int) $linha['nivel'],
            ];
        }

        // Garante que moedas e XP sincronizados com as colunas dedicadas não sejam sobrescritos com valor menor
        $estadoSalvo['coins'] = max((int) (isset($estadoSalvo['coins']) ? $estadoSalvo['coins'] : 0), (int) $linha['brunocoins']);
        $estadoSalvo['xp'] = max((int) (isset($estadoSalvo['xp']) ? $estadoSalvo['xp'] : 0), (int) $linha['xp']);
        $estadoSalvo['nivel'] = max((int) (isset($estadoSalvo['nivel']) ? $estadoSalvo['nivel'] : 1), (int) $linha['nivel']);

        if (!isset($estadoSalvo['questionsProgress']) || !is_array($estadoSalvo['questionsProgress'])) {
            $estadoSalvo['questionsProgress'] = [];
        }

        return array_merge(self::$estadoPadrao, $estadoSalvo);
    }

    /**
     * Grava o estado inteiro recebido do cliente (sincronizacao completa).
     */
    public static function salvarEstado($usuarioId, array $estado)
    {
        $coins = max(0, (int) (isset($estado['coins']) ? $estado['coins'] : 0));
        $xp = max(0, (int) (isset($estado['xp']) ? $estado['xp'] : 0));
        $nivel = max(1, (int) floor($xp / 420) + 1);

        $estado['coins'] = $coins;
        $estado['xp'] = $xp;
        $estado['nivel'] = $nivel;

        $estadoJson = json_encode($estado, JSON_UNESCAPED_UNICODE);

        $stmt = Database::conexao()->prepare(
            'INSERT INTO gamificacao_perfis (usuario_id, brunocoins, xp, nivel, estado_json)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                brunocoins = VALUES(brunocoins),
                xp = VALUES(xp),
                nivel = VALUES(nivel),
                estado_json = VALUES(estado_json)'
        );
        $stmt->execute([$usuarioId, $coins, $xp, $nivel, $estadoJson]);
    }

    /**
     * Banco de questoes e desafios de Estrutura de Dados do Grupo 6.
     * Fonte unica consumida pelo Quiz, Gamificacao e pelo Dashboard de Perguntas.
     */
    public static function bancoDesafios()
    {
        return [
            // ===== TAD & STRUCT =====
            [
                'id' => 'tad-01',
                'question' => 'Um Tipo Abstrato de Dados (TAD) ajuda porque separa:',
                'options' => ['Tela e CSS', 'Contrato (o que faz) e implementação (como faz)', 'Banco de dados e senha', 'Loop e variável'],
                'answer' => 1,
                'reward' => 110,
                'xp' => 62,
                'categoria' => 'TAD',
                'dificuldade' => 'Fácil',
                'explicacao' => 'O TAD define a especificação das operações disponíveis e o comportamento esperado, ocultando os detalhes internos de armazenamento na memória.',
            ],
            [
                'id' => 'tad-02',
                'question' => 'Uma struct em linguagens como C e C# costuma ser usada para:',
                'options' => ['Agrupar dados e campos relacionados sob um único tipo', 'Abrir páginas e rotas HTML', 'Substituir todo o banco relacional', 'Executar scripts de animação'],
                'answer' => 0,
                'reward' => 105,
                'xp' => 58,
                'categoria' => 'TAD',
                'dificuldade' => 'Fácil',
                'explicacao' => 'A struct permite definir registros heterogêneos personalizados (como Nós contendo valor e ponteiros) em uma única unidade estruturada.',
            ],

            // ===== LISTA SIMPLESMENTE ENCADEADA =====
            [
                'id' => 'lista-s-01',
                'question' => 'Em uma lista simplesmente encadeada com ponteiro inicio, inserir no inicio custa:',
                'options' => ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
                'answer' => 0,
                'reward' => 95,
                'xp' => 55,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Inserir no início envolve apenas fazer o novo nó apontar para o antigo início e atualizar o ponteiro início. Operação direta em tempo constante O(1).',
            ],
            [
                'id' => 'lista-s-02',
                'question' => 'Buscar um valor que está no último nó de uma lista simples normalmente custa:',
                'options' => ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                'answer' => 2,
                'reward' => 120,
                'xp' => 65,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Como listas encadeadas não possuem indexação posicional direta na memória, é necessário percorrer nó a nó a partir do início até o fim (O(n)).',
            ],
            [
                'id' => 'lista-s-03',
                'question' => 'Se uma lista encadeada está vazia, normalmente o ponteiro inicio aponta para:',
                'options' => ['fim', 'null', 'primeiro valor zero', 'um vetor estático'],
                'answer' => 1,
                'reward' => 90,
                'xp' => 52,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Ao ser criada e antes de receber nós, a lista vazia não possui nós alocados na heap, de modo que inicio == null.',
            ],
            [
                'id' => 'lista-s-04',
                'question' => 'Na remoção de um nó no meio de uma lista simples, o passo essencial é:',
                'options' => ['Ordenar a lista toda', 'Religar o nó anterior ao próximo do nó removido', 'Duplicar os dados da lista', 'Criar uma nova struct'],
                'answer' => 1,
                'reward' => 145,
                'xp' => 74,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Médio',
                'explicacao' => 'Para desvincular o nó sem perder o encadeamento, o nó anterior passa a apontar diretamente para anterior.prox = atual.prox.',
            ],
            [
                'id' => 'lista-s-05',
                'question' => 'O ponteiro fim em uma lista encadeada ajuda principalmente a:',
                'options' => ['Buscar qualquer nó em O(1)', 'Inserir no final da lista em O(1)', 'Remover nós do meio sem percurso', 'Trocar o tipo dos dados'],
                'answer' => 1,
                'reward' => 135,
                'xp' => 70,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Médio',
                'explicacao' => 'Manter uma referência direta para o último nó evita a necessidade de percorrer todos os n elementos para realizar inserções na cauda.',
            ],
            [
                'id' => 'lista-s-06',
                'question' => 'O melhor caso de busca em uma lista simplesmente encadeada acontece quando o valor está:',
                'options' => ['No início da lista', 'No último nó', 'Em nenhum nó', 'Fora da memória'],
                'answer' => 0,
                'reward' => 100,
                'xp' => 54,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Se o elemento desejado for o primeiro nó referenciado por início, a busca encerra imediatamente na primeira checagem: custo O(1).',
            ],
            [
                'id' => 'lista-s-07',
                'question' => 'Qual operação em lista simplesmente encadeada SEM ponteiro de fim é a mais lenta?',
                'options' => ['Inserir no início', 'Inserir no final', 'Ler o primeiro elemento', 'Verificar se está vazia'],
                'answer' => 1,
                'reward' => 110,
                'xp' => 58,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Sem ponteiro de cauda, para inserir no final é obrigatório iniciar na cabeça e saltar de nó em nó até achar o último (O(n)).',
            ],
            [
                'id' => 'lista-s-08',
                'question' => 'Qual o principal overhead de memória de uma lista encadeada frente a um vetor?',
                'options' => ['Cada nó consome memória adicional para armazenar os ponteiros', 'A lista consome menos memória sempre', 'A lista ocupa espaço fixo e estático', 'Ambos usam exatamente os mesmos bytes'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 62,
                'categoria' => 'Lista simples',
                'dificuldade' => 'Médio',
                'explicacao' => 'Além do valor útil guardado, cada nó aloca bytes extras na heap para os ponteiros de encadeamento e cabeçalhos de alocação.',
            ],

            // ===== LISTA DUPLAMENTE ENCADEADA =====
            [
                'id' => 'lista-d-01',
                'question' => 'Em uma lista duplamente encadeada, cada nó guarda:',
                'options' => ['Apenas o valor', 'Valor, ponteiro anterior e ponteiro próximo', 'Valor e tamanho total', 'Apenas um índice numérico'],
                'answer' => 1,
                'reward' => 125,
                'xp' => 68,
                'categoria' => 'Lista dupla',
                'dificuldade' => 'Fácil',
                'explicacao' => 'A lista dupla permite caminhar para frente e para trás porque cada nó guarda ponteiros para seu predecessor (ant) e sucessor (prox).',
            ],
            [
                'id' => 'lista-d-02',
                'question' => 'Em uma lista duplamente encadeada, navegar para trás é possível devido ao ponteiro:',
                'options' => ['proximo', 'valor', 'anterior', 'tamanho'],
                'answer' => 2,
                'reward' => 130,
                'xp' => 66,
                'categoria' => 'Lista dupla',
                'dificuldade' => 'Fácil',
                'explicacao' => 'O ponteiro anterior (ou prev) aponta diretamente para o nó que veio antes, viabilizando percursos no sentido inverso.',
            ],
            [
                'id' => 'lista-d-03',
                'question' => 'Tendo em mãos a referência direta de um nó em uma Lista Dupla, sua remoção custa:',
                'options' => ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                'answer' => 0,
                'reward' => 140,
                'xp' => 72,
                'categoria' => 'Lista dupla',
                'dificuldade' => 'Médio',
                'explicacao' => 'Como o nó já conhece nó.ant e nó.prox, podemos religar ambos diretamente em O(1), sem precisar varrer a lista procurando o antecessor.',
            ],

            // ===== FILA (QUEUE) FIFO =====
            [
                'id' => 'fila-01',
                'question' => 'Uma Fila (Queue) segue a política de atendimento:',
                'options' => ['LIFO (Last-In, First-Out)', 'FIFO (First-In, First-Out)', 'Ordem aleatória', 'Sempre invertida'],
                'answer' => 1,
                'reward' => 100,
                'xp' => 56,
                'categoria' => 'Fila',
                'dificuldade' => 'Fácil',
                'explicacao' => 'FIFO significa "Primeiro a Entrar, Primeiro a Sair". O primeiro elemento enfileirado é o primeiro a ser atendido e desenfileirado.',
            ],
            [
                'id' => 'fila-02',
                'question' => 'No método enfileirar (enqueue), quando a fila já contém nós, a ligação correta é:',
                'options' => ['inicio.prox = novoNo', 'fim.prox = novoNo e depois fim = novoNo', 'fim = inicio', 'Criar o nó sem ligar aos anteriores'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Fila',
                'dificuldade' => 'Médio',
                'explicacao' => 'O último elemento atual liga-se ao novo nó através de fim.prox = novoNo, e o ponteiro fim avança para o novo nó.',
            ],
            [
                'id' => 'fila-03',
                'question' => 'No desenfileirar (dequeue), se a fila possui apenas 1 elemento (inicio == fim), deve-se:',
                'options' => ['Alterar apenas inicio', 'Zerar ambos: inicio = null e fim = null', 'Não fazer nada', 'Duplicar o ponteiro'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Fila',
                'dificuldade' => 'Médio',
                'explicacao' => 'Ao remover o único nó existente, a fila passa a ficar completamente vazia, devendo ambos os ponteiros apontar para null.',
            ],
            [
                'id' => 'fila-04',
                'question' => 'Qual aplicação do mundo real ou computacional opera por padrão como uma Fila FIFO?',
                'options' => ['Pilha de livros lavados', 'Fila de impressão de documentos (spooler)', 'Histórico de Desfazer de editores de texto', 'Navegação "Voltar" do navegador'],
                'answer' => 1,
                'reward' => 95,
                'xp' => 52,
                'categoria' => 'Fila',
                'dificuldade' => 'Fácil',
                'explicacao' => 'O spooler de impressão atende os documentos estritamente na ordem em que foram enviados pelos usuários (FIFO).',
            ],

            // ===== FILA DE PRIORIDADES =====
            [
                'id' => 'fila-p-01',
                'question' => 'Em uma Fila de Prioridades, a ordem de saída dos itens é regida por:',
                'options' => ['Apenas a ordem temporal de chegada', 'Um critério ou valor de prioridade atribuído', 'Sorteio randômico', 'A ordem alfabética do autor'],
                'answer' => 1,
                'reward' => 130,
                'xp' => 68,
                'categoria' => 'Fila de prioridades',
                'dificuldade' => 'Médio',
                'explicacao' => 'Elementos com maior prioridade furam a ordem cronológica e são retirados primeiro da fila.',
            ],
            [
                'id' => 'fila-p-02',
                'question' => 'Em um pronto-socorro com triagem de risco (Manchester), a ordem de atendimento exemplifica:',
                'options' => ['Pilha LIFO', 'Fila de Prioridades', 'Árvore Patricia', 'Lista Estática Circular'],
                'answer' => 1,
                'reward' => 115,
                'xp' => 60,
                'categoria' => 'Fila de prioridades',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Pacientes em estado crítico (vermelho) são priorizados antes de casos leves, caracterizando uma Fila de Prioridades clássica.',
            ],

            // ===== PILHA (STACK) LIFO =====
            [
                'id' => 'pilha-01',
                'question' => 'Uma Pilha (Stack) opera sob a regra fundamental de:',
                'options' => ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Ordenação por chave', 'Sempre bidirecional'],
                'answer' => 1,
                'reward' => 100,
                'xp' => 56,
                'categoria' => 'Pilha',
                'dificuldade' => 'Fácil',
                'explicacao' => 'LIFO significa "Último a Entrar, Primeiro a Sair". O elemento colocado no topo é o primeiro a ser desempilhado.',
            ],
            [
                'id' => 'pilha-02',
                'question' => 'No método push (empilhar) de uma Pilha encadeada, o encadeamento é feito por:',
                'options' => ['novoNo.prox = topo e depois topo = novoNo', 'topo.prox = novoNo', 'topo = null', 'Percorrer toda a pilha até a base'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
                'dificuldade' => 'Médio',
                'explicacao' => 'O novo nó aponta para o antigo topo, e o ponteiro topo é atualizado para o novo nó. Custo O(1).',
            ],
            [
                'id' => 'pilha-03',
                'question' => 'No método pop (desempilhar) de uma Pilha, o ponteiro de topo é reposicionado com:',
                'options' => ['topo = topo.prox', 'topo = null sempre', 'topo = base', 'Nenhuma alteração de ponteiro'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
                'dificuldade' => 'Médio',
                'explicacao' => 'Ao retirar o topo, o novo topo passa a ser o nó imediatamente abaixo dele, obtido via topo = topo.prox.',
            ],
            [
                'id' => 'pilha-04',
                'question' => 'A pilha de execução de funções (Call Stack) de um programa atua como:',
                'options' => ['Uma Fila FIFO', 'Uma Pilha LIFO', 'Uma Fila de Prioridades', 'Uma Árvore Trie'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
                'dificuldade' => 'Fácil',
                'explicacao' => 'A função chamada por último é a que precisa terminar e ser desempilhada primeiro para que a função chamadora retome sua execução.',
            ],
            [
                'id' => 'pilha-05',
                'question' => 'A validação de parênteses e chaves balanceadas em um compilador é solucionada por:',
                'options' => ['Pilha', 'Fila simples', 'Árvore Patricia', 'Lista circular'],
                'answer' => 0,
                'reward' => 135,
                'xp' => 70,
                'categoria' => 'Pilha',
                'dificuldade' => 'Médio',
                'explicacao' => 'Cada abertura empilha o símbolo; cada fechamento deve casar com o elemento no topo da pilha, desempilhando-o.',
            ],

            // ===== ÁRVORE TRIE =====
            [
                'id' => 'trie-01',
                'question' => 'Em uma Árvore Trie, o caminho da raiz até determinado nó representa:',
                'options' => ['Um prefixo de caracteres', 'Uma chave criptográfica fixa', 'Uma prioridade de fila', 'Um índice de vetor'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Arvore Trie',
                'dificuldade' => 'Médio',
                'explicacao' => 'A sequência de arestas/caracteres do caminho até o nó forma o prefixo compartilhado pelas palavras daquela subárvore.',
            ],
            [
                'id' => 'trie-02',
                'question' => 'Buscar uma palavra de comprimento m em uma Trie consome tempo da ordem de:',
                'options' => ['O(1)', 'O(log m)', 'O(m)', 'O(m²)'],
                'answer' => 2,
                'reward' => 135,
                'xp' => 70,
                'categoria' => 'Arvore Trie',
                'dificuldade' => 'Médio',
                'explicacao' => 'O tempo de busca é proporcional ao tamanho da palavra (número de caracteres m), sendo independente do total de palavras armazenadas.',
            ],
            [
                'id' => 'trie-03',
                'question' => 'Em uma Trie, a marcação fimDaPalavra (isEndOfWord) serve para:',
                'options' => ['Distinguir uma palavra completa de um mero prefixo', 'Indicar a raiz', 'Sinalizar que a árvore está cheia', 'Bloquear novas inserções'],
                'answer' => 0,
                'reward' => 130,
                'xp' => 68,
                'categoria' => 'Arvore Trie',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Indica que os caracteres acumulados até aquele nó formam uma palavra cadastrada por si mesma (ex: "sol" dentro de "solar").',
            ],
            [
                'id' => 'trie-04',
                'question' => 'A estrutura mais indicada para recursos de auto-completar (autocomplete) e dicionários é:',
                'options' => ['Árvore Trie / Patricia', 'Fila FIFO', 'Pilha LIFO', 'Vetor desordenado'],
                'answer' => 0,
                'reward' => 125,
                'xp' => 65,
                'categoria' => 'Arvore Trie',
                'dificuldade' => 'Fácil',
                'explicacao' => 'Uma vez localizado o nó do prefixo digitado, todas as sugestões válidas estão diretamente sob sua subárvore.',
            ],

            // ===== ÁRVORE PATRICIA =====
            [
                'id' => 'patricia-01',
                'question' => 'A principal diferença da Árvore Patricia para a Trie convencional é:',
                'options' => ['Usar apenas inteiros', 'Comprimir caminhos longos sem ramificação em um único nó/aresta', 'Eliminar a raiz', 'Ordenar por prioridade'],
                'answer' => 1,
                'reward' => 145,
                'xp' => 76,
                'categoria' => 'Arvore Patricia',
                'dificuldade' => 'Difícil',
                'explicacao' => 'A Patricia (Radix Tree compactada) comprime sequências de nós que possuem apenas um único filho, economizando nós e ponteiros.',
            ],
            [
                'id' => 'patricia-02',
                'question' => 'Na Árvore Patricia compactada, todo nó interno (não-folha) possui grau:',
                'options' => ['Pelo menos 2 (duas ramificações)', 'Obrigatoriamente 1', 'Sempre nulo', 'Apenas ponteiro para a raiz'],
                'answer' => 0,
                'reward' => 150,
                'xp' => 80,
                'categoria' => 'Arvore Patricia',
                'dificuldade' => 'Difícil',
                'explicacao' => 'Como qualquer nó de grau 1 é compactado e mesclado ao pai, nós internos representam pontos de bifurcação reais (grau >= 2).',
            ],
        ];
    }
}
