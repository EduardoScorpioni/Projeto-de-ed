<?php
/* pages/logout.php — ponto de entrada fino */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\AutenticacaoController;

(new AutenticacaoController())->logout();
