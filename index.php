<?php
/* index.php — ponto de entrada fino; view em app/Views/home.php */

require_once __DIR__ . '/app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = 'index.php';
$urlPaginas = 'pages/';

(new ConteudoController())->home($urlInicio, $urlPaginas);
