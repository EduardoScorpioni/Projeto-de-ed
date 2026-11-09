<?php
/* pages/arvores.php — ponto de entrada fino; view em app/Views/arvores.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->arvores($urlInicio, $urlPaginas);
