<?php
/* pages/fila.php — ponto de entrada fino; view em app/Views/fila.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->fila($urlInicio, $urlPaginas);
