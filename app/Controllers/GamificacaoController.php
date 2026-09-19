<?php
/* app/Controllers/GamificacaoController.php */

namespace App\Controllers;

use App\Models\GamificacaoPerfil;

class GamificacaoController
{
    public function pagina(string $urlInicio, string $urlPaginas): void
    {
        $usuarioNome = estaLogado() ? $_SESSION['usuario_nome'] : 'Aluno visitante';
        $usuarioEmail = estaLogado() ? ($_SESSION['usuario_email'] ?? '') : '';
        $isAdminGame = estaLogado() && (
            strtolower($usuarioNome) === 'admin' ||
            strtolower($usuarioEmail) === 'admin'
        );
        $initialBrunoCoins = $isAdminGame ? 999999999 : 350;
        $desafios = GamificacaoPerfil::bancoDesafios();

        require APP_PATH . '/Views/gamificacao.php';
    }

    /**
     * Endpoint chamado por assets/js/gamificacao.js (fetch) para sincronizar
     * o estado do jogo do usuario logado com o MySQL. Ver o comentario no
     * topo de app/Models/GamificacaoPerfil.php sobre o que este endpoint
     * garante (persistencia real por usuario) e o que ele NAO faz
     * (nao recalcula/valida cada regra de economia do jogo no servidor).
     */
    public function api(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (!estaLogado()) {
            http_response_code(401);
            echo json_encode(['erro' => 'Necessario estar logado.']);
            return;
        }

        $usuarioId = (int) $_SESSION['usuario_id'];
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            echo json_encode(GamificacaoPerfil::buscarOuCriar($usuarioId));
            return;
        }

        if ($metodo === 'POST') {
            $corpo = json_decode((string) file_get_contents('php://input'), true);

            if (!is_array($corpo)) {
                http_response_code(400);
                echo json_encode(['erro' => 'Corpo invalido.']);
                return;
            }

            GamificacaoPerfil::salvarEstado($usuarioId, $corpo);
            echo json_encode(['ok' => true]);
            return;
        }

        http_response_code(405);
        echo json_encode(['erro' => 'Metodo nao permitido.']);
    }
}
