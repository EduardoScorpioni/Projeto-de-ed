<?php
/* app/helpers.php
 * Funções utilitárias globais usadas por controllers e views.
 * Mantidas como funções soltas (fora de uma classe) de propósito: são só
 * leitura de sessão/saneamento de saída, usadas em quase toda view.
 */

function estaLogado(): bool
{
    return isset($_SESSION['usuario_id']);
}

function exigirLogin(string $redirecionarPara = 'login.php'): void
{
    if (!estaLogado()) {
        header('Location: ' . $redirecionarPara);
        exit;
    }
}

function exigirDeslogado(string $redirecionarPara = 'dashboard.php'): void
{
    if (estaLogado()) {
        header('Location: ' . $redirecionarPara);
        exit;
    }
}

/**
 * Sanitiza dados para saída em HTML (proteção contra XSS).
 */
function clean($dado): string
{
    return htmlspecialchars((string) $dado, ENT_QUOTES, 'UTF-8');
}
