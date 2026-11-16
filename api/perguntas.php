<?php
/* api/perguntas.php — Endpoint JSON com o banco de questões */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\PerguntasController;

(new PerguntasController())->api();
