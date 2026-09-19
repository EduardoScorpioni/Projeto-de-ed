<?php
/* pages/lista-dupla.php — ponto de entrada fino; view em app/Views/lista-dupla.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->listaDupla($urlInicio, $urlPaginas);
