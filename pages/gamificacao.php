<?php
/* pages/gamificacao.php — ponto de entrada fino; view em app/Views/gamificacao.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\GamificacaoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new GamificacaoController())->pagina($urlInicio, $urlPaginas);
