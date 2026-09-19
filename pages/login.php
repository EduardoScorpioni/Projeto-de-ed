<?php
/* pages/login.php — ponto de entrada fino; view em app/Views/login.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\AutenticacaoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new AutenticacaoController())->login($urlInicio, $urlPaginas);
