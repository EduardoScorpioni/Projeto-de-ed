<?php
/* pages/dashboard-perguntas.php — ponto de entrada; view em app/Views/dashboard-perguntas.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\PerguntasController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new PerguntasController())->index($urlInicio, $urlPaginas);
