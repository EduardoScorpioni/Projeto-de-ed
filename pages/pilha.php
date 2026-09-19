<?php
/* pages/pilha.php — ponto de entrada fino; view em app/Views/pilha.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->pilha($urlInicio, $urlPaginas);
