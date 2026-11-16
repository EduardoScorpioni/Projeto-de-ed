<?php
/* pages/arvore-trie.php — ponto de entrada fino; view em app/Views/arvore-trie.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\ConteudoController;

$urlInicio = '../index.php';
$urlPaginas = '';

(new ConteudoController())->arvoreTrie($urlInicio, $urlPaginas);
