<?php
/* app/Controllers/PerguntasController.php */

namespace App\Controllers;

use App\Models\GamificacaoPerfil;

class PerguntasController
{
    public function index($urlInicio, $urlPaginas)
    {
        $usuarioNome = estaLogado() ? $_SESSION['usuario_nome'] : 'Aluno visitante';
        $usuarioEmail = estaLogado() && isset($_SESSION['usuario_email'])
            ? $_SESSION['usuario_email']
            : '';
        $isAdminGame = estaLogado() && (
            strtolower($usuarioNome) === 'admin' ||
            strtolower($usuarioEmail) === 'admin'
        );
        $initialBrunoCoins = $isAdminGame ? 999999999 : 350;

        $perfilGamificacao = estaLogado()
            ? GamificacaoPerfil::buscarOuCriar((int) $_SESSION['usuario_id'])
            : null;

        if ($perfilGamificacao && $isAdminGame) {
            $perfilGamificacao['coins'] = max($perfilGamificacao['coins'], $initialBrunoCoins);
        }

        $desafios = GamificacaoPerfil::bancoDesafios();

        $totalQuestoes = count($desafios);
        $categorias = [];
        $dificuldades = ['Fácil' => 0, 'Médio' => 0, 'Difícil' => 0];

        foreach ($desafios as $d) {
            $cat = $d['categoria'];
            if (!isset($categorias[$cat])) {
                $categorias[$cat] = 0;
            }
            $categorias[$cat]++;

            $dif = isset($d['dificuldade']) ? $d['dificuldade'] : 'Médio';
            if (isset($dificuldades[$dif])) {
                $dificuldades[$dif]++;
            }
        }

        $paginaAtual = 'perguntas';

        require APP_PATH . '/Views/dashboard-perguntas.php';
    }

    public function api()
    {
        header('Content-Type: application/json; charset=utf-8');

        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            $desafios = GamificacaoPerfil::bancoDesafios();
            echo json_encode([
                'ok' => true,
                'total' => count($desafios),
                'questoes' => $desafios,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
    }
}
