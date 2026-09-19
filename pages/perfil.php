<?php
/* pages/perfil.php — ponto de entrada fino; view em app/Views/perfil.php */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\PerfilController;

(new PerfilController())->editar();
