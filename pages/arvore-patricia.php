<?php
/* pages/arvore-patricia.php — ponto de entrada fino; view em app/Views/arvore-patricia.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->arvorePatricia($urlInicio, $urlPaginas);
