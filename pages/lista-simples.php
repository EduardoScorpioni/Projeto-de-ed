<?php
/* pages/lista-simples.php — ponto de entrada fino; view em app/Views/lista-simples.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->listaSimples($urlInicio, $urlPaginas);
