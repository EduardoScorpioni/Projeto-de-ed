<?php
/* pages/cadastro.php — ponto de entrada fino; view em app/Views/cadastro.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\AutenticacaoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new AutenticacaoController())->cadastro($urlInicio, $urlPaginas);
