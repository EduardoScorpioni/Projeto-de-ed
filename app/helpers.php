<?php
/* app/helpers.php
 * Funções utilitárias globais usadas por controllers e views.
 * Mantidas como funções soltas (fora de uma classe) de propósito: são só
 * leitura de sessão/saneamento de saída, usadas em quase toda view.
 */

function estaLogado()
{
    return isset($_SESSION['usuario_id']);
}

function exigirLogin($redirecionarPara = 'login.php')
{
    if (!estaLogado()) {
        header('Location: ' . $redirecionarPara);
        exit;
    }
}

function exigirDeslogado($redirecionarPara = 'dashboard.php')
{
    if (estaLogado()) {
        header('Location: ' . $redirecionarPara);
        exit;
    }
}

/**
 * Sanitiza dados para saída em HTML (proteção contra XSS).
 */
function clean($dado)
{
    return htmlspecialchars((string) $dado, ENT_QUOTES, 'UTF-8');
}

/**
 * Gera um token criptograficamente seguro também no PHP 5.5 do EasyPHP.
 */
function gerarTokenSeguro($quantidadeBytes = 32)
{
    if (function_exists('random_bytes')) {
        return bin2hex(random_bytes($quantidadeBytes));
    }

    if (function_exists('openssl_random_pseudo_bytes')) {
        $criptograficamenteForte = false;
        $bytes = openssl_random_pseudo_bytes($quantidadeBytes, $criptograficamenteForte);

        if ($bytes !== false && $criptograficamenteForte) {
            return bin2hex($bytes);
        }
    }

    if (function_exists('mcrypt_create_iv')) {
        return bin2hex(mcrypt_create_iv($quantidadeBytes, MCRYPT_DEV_URANDOM));
    }

    throw new RuntimeException('Nao foi possivel gerar um token seguro.');
}
