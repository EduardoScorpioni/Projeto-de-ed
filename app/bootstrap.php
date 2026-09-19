<?php
/* app/bootstrap.php
 * Ponto único de inicialização: sessão, autoload de classes App\... e helpers globais.
 * Todo ponto de entrada (index.php, pages/*.php, api/*.php) deve dar require nisto primeiro.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('APP_PATH', __DIR__);
define('BASE_PATH', dirname(__DIR__));

spl_autoload_register(function ($classe) {
    $prefixo = 'App\\';

    if (strncmp($classe, $prefixo, strlen($prefixo)) !== 0) {
        return;
    }

    $caminhoRelativo = substr($classe, strlen($prefixo));
    $arquivo = APP_PATH . '/' . str_replace('\\', '/', $caminhoRelativo) . '.php';

    if (is_file($arquivo)) {
        require $arquivo;
    }
});

require_once APP_PATH . '/helpers.php';
