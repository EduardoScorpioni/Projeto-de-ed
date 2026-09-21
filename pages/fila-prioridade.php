<?php
/* pages/fila-prioridade.php — ponto de entrada fino; view em app/Views/fila-prioridade.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->filaPrioridade($urlInicio, $urlPaginas);
