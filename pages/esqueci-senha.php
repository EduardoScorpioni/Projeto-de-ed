<?php
/* pages/esqueci-senha.php — ponto de entrada fino; view em app/Views/esqueci-senha.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\AutenticacaoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new AutenticacaoController())->esqueciSenha($urlInicio, $urlPaginas);
