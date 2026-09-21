<?php
/* pages/redefinir-senha.php — ponto de entrada fino; view em app/Views/redefinir-senha.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\AutenticacaoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new AutenticacaoController())->redefinirSenha($urlInicio, $urlPaginas);
