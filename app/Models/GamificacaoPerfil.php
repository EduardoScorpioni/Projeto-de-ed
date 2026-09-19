<?php
/* app/Models/GamificacaoPerfil.php */

namespace App\Models;

use App\Config\Database;

/**
 * Perfil de gameficação (BrunoCoins, XP, inventario, missoes) de um usuario logado.
 *
 * Arquitetura adotada (documentada aqui de proposito): o "motor" do jogo (loja,
 * combo, sorte/jackpot, upgrades) continua calculado no cliente, em
 * assets/js/gamificacao.js, exatamente como antes. O que mudou e' a persistencia:
 * antes o estado inteiro vivia so' no localStorage do navegador; agora, para um
 * usuario logado, o mesmo objeto de estado tambem e' sincronizado com o MySQL
 * (tabela gamificacao_perfis) via api/gamificacao.php, ligado ao usuario_id.
 *
 * Isso NAO e' um sistema anti-cheat server-authoritative (o servidor nao recalcula
 * cada compra/sorteio) -- para o prazo e o escopo deste trabalho academico, o ganho
 * real e ter o "perfil de usuario" de fato persistido e amarrado ao login, que e'
 * o requisito pedido, em vez de reimplementar toda a economia do jogo em PHP.
 * O banco de desafios (perguntas do quiz), por outro lado, passa a viver aqui,
 * como fonte unica de verdade, para facilitar adicionar novas perguntas.
 */
class GamificacaoPerfil
{
    private const ESTADO_PADRAO = [
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
    ];

    /**
     * Busca o perfil salvo do usuario; se ainda nao existir, cria a linha padrao.
     * Retorna sempre o "estado" completo (mesmo formato usado pelo JS).
     */
    public static function buscarOuCriar(int $usuarioId): array
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

            return self::ESTADO_PADRAO;
        }

        $estadoSalvo = $linha['estado_json'] ? json_decode((string) $linha['estado_json'], true) : null;

        if (!is_array($estadoSalvo)) {
            $estadoSalvo = [
                'coins' => (int) $linha['brunocoins'],
                'xp' => (int) $linha['xp'],
            ];
        }

        return array_merge(self::ESTADO_PADRAO, $estadoSalvo);
    }

    /**
     * Grava o estado inteiro recebido do cliente (sincronizacao completa).
     * Sanitiza apenas os campos numericos usados nas colunas dedicadas;
     * o restante do objeto (inventario, equipamentos, missoes, etc.) vai
     * inteiro para a coluna estado_json.
     */
    public static function salvarEstado(int $usuarioId, array $estado): void
    {
        $coins = max(0, (int) ($estado['coins'] ?? 0));
        $xp = max(0, (int) ($estado['xp'] ?? 0));
        $nivel = max(1, (int) floor($xp / 420) + 1);
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
     * Banco de desafios (quiz) do modo gameficado.
     *
     * As 10 primeiras perguntas (TAD / Lista simples / Lista dupla) sao as
     * mesmas que ja existiam em assets/js/gamificacao.js, so' que agora moram
     * aqui para virarem a fonte unica usada pela view.
     *
     * As perguntas de Fila e Pilha abaixo sao propositalmente conceituais
     * (FIFO/LIFO, nomes de operacao, exemplos do dia a dia) -- fatos de livro-texto
     * que nao dependem do jeito exato como o professor implementou em aula.
     * Ainda NAO ha pergunta sobre Fila de Prioridades nem pergunta "leitura de
     * codigo" de Fila/Pilha: isso fica pendente ate o material de aula chegar,
     * para nao arriscar contradizer o que foi ensinado.
     */
    public static function bancoDesafios(): array
    {
        return [
            // ===== TAD / Lista simples / Lista dupla (existentes) =====
            [
                'question' => 'Em uma lista simplesmente encadeada com ponteiro inicio, inserir no inicio custa:',
                'options' => ['O(1)', 'O(n)', 'O(n log n)', 'O(n2)'],
                'answer' => 0,
                'reward' => 95,
                'xp' => 55,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'Buscar um valor que esta no ultimo no de uma lista simples normalmente custa:',
                'options' => ['O(1)', 'O(log n)', 'O(n)', 'O(n2)'],
                'answer' => 2,
                'reward' => 120,
                'xp' => 65,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'Em uma lista duplamente encadeada, cada no guarda:',
                'options' => ['Apenas o valor', 'Valor, anterior e proximo', 'Valor e tamanho', 'Indice fixo'],
                'answer' => 1,
                'reward' => 125,
                'xp' => 68,
                'categoria' => 'Lista dupla',
            ],
            [
                'question' => 'Um TAD ajuda porque separa:',
                'options' => ['Tela e CSS', 'Contrato e implementacao', 'Banco e senha', 'Loop e variavel'],
                'answer' => 1,
                'reward' => 110,
                'xp' => 62,
                'categoria' => 'TAD',
            ],
            [
                'question' => 'Se uma lista esta vazia, normalmente o ponteiro inicio aponta para:',
                'options' => ['fim', 'null', 'primeiro valor', 'um vetor'],
                'answer' => 1,
                'reward' => 90,
                'xp' => 52,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'Na remocao no meio de uma lista simples, e essencial:',
                'options' => ['Ordenar tudo', 'Religar o no anterior ao proximo', 'Duplicar a lista', 'Criar uma struct nova'],
                'answer' => 1,
                'reward' => 145,
                'xp' => 74,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'Uma struct em C# costuma ser usada para:',
                'options' => ['Agrupar dados relacionados', 'Abrir paginas HTML', 'Substituir todo banco', 'Rodar CSS'],
                'answer' => 0,
                'reward' => 105,
                'xp' => 58,
                'categoria' => 'TAD',
            ],
            [
                'question' => 'O ponteiro fim em lista encadeada ajuda principalmente a:',
                'options' => ['Buscar qualquer valor em O(1)', 'Inserir no fim mais rapido', 'Remover sempre sem percurso', 'Trocar o tipo da lista'],
                'answer' => 1,
                'reward' => 135,
                'xp' => 70,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'O melhor caso de busca em lista simples acontece quando o valor esta:',
                'options' => ['No inicio', 'No fim', 'Em nenhum no', 'Fora da memoria'],
                'answer' => 0,
                'reward' => 100,
                'xp' => 54,
                'categoria' => 'Lista simples',
            ],
            [
                'question' => 'Em lista duplamente encadeada, navegar para tras e possivel por causa do ponteiro:',
                'options' => ['proximo', 'valor', 'anterior', 'tamanho'],
                'answer' => 2,
                'reward' => 130,
                'xp' => 66,
                'categoria' => 'Lista dupla',
            ],

            // ===== Fila FIFO — Aula 7 (conceituais + leitura do codigo dado em aula) =====
            [
                'question' => 'Uma Fila (Queue) segue a politica:',
                'options' => ['LIFO', 'FIFO', 'Ordem aleatoria', 'Sempre por prioridade'],
                'answer' => 1,
                'reward' => 100,
                'xp' => 56,
                'categoria' => 'Fila',
            ],
            [
                'question' => 'No metodo inserirEnfileirar, quando a fila ja tem elementos, o novo no e ligado assim:',
                'options' => ['this.inicio.prox = novoNo', 'this.fim.prox = novoNo, e depois this.fim = novoNo', 'this.fim = this.inicio', 'Nao precisa ligar nada, so criar o no'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Fila',
            ],
            [
                'question' => 'No metodo removerDesenfileirar, quando a fila tem so 1 elemento (inicio == fim), o correto e:',
                'options' => ['Mudar so o inicio', 'Zerar inicio e fim (os dois viram null)', 'Nao fazer nada, a fila fica igual', 'Duplicar o elemento restante'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Fila',
            ],
            [
                'question' => 'Um exemplo do dia a dia que se comporta como uma fila FIFO e:',
                'options' => ['Pilha de pratos lavados', 'Fila de banco', 'Pilha de cartas de baralho', 'Historico de "desfazer" de um editor de texto'],
                'answer' => 1,
                'reward' => 95,
                'xp' => 52,
                'categoria' => 'Fila',
            ],
            [
                'question' => 'Em uma Fila de Prioridades, a ordem de saida e definida por:',
                'options' => ['Apenas a ordem de chegada', 'Um criterio de prioridade, e nao so a ordem de chegada', 'Sempre de forma aleatoria', 'O tamanho atual da fila'],
                'answer' => 1,
                'reward' => 130,
                'xp' => 68,
                'categoria' => 'Fila de prioridades',
            ],

            // ===== Pilha — Aula 8 (conceituais + leitura do codigo dado em aula) =====
            [
                'question' => 'Uma Pilha (Stack) segue a politica:',
                'options' => ['FIFO', 'LIFO', 'Por prioridade', 'Ordem aleatoria'],
                'answer' => 1,
                'reward' => 100,
                'xp' => 56,
                'categoria' => 'Pilha',
            ],
            [
                'question' => 'No metodo push da Pilha, o novo no e ligado assim:',
                'options' => ['novoNo.prox = this.topo, e depois this.topo = novoNo', 'this.topo.prox = novoNo, como numa fila', 'O novo no substitui todos os outros', 'O novo no fica sem nenhuma ligacao'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
            ],
            [
                'question' => 'No metodo pop da Pilha, antes de retornar o no removido, o codigo faz:',
                'options' => ['this.topo = this.topo.prox', 'this.topo = null sempre', 'Percorre a pilha inteira de novo', 'Nada, so le o valor do topo'],
                'answer' => 0,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
            ],
            [
                'question' => 'Um exemplo do dia a dia que se comporta como uma pilha LIFO e:',
                'options' => ['Fila de banco', 'Pilha de pratos: o ultimo colocado e o primeiro retirado', 'Fila de impressao', 'Fila de atendimento de senhas'],
                'answer' => 1,
                'reward' => 95,
                'xp' => 52,
                'categoria' => 'Pilha',
            ],
            [
                'question' => 'A pilha de chamadas de funcao (call stack) de um programa em execucao se comporta como uma:',
                'options' => ['Fila FIFO', 'Pilha LIFO', 'Fila de prioridades', 'Arvore binaria'],
                'answer' => 1,
                'reward' => 120,
                'xp' => 64,
                'categoria' => 'Pilha',
            ],
        ];
    }
}
