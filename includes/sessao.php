<?php
/* includes/sessao.php */

// Inicia a sessão se ainda não foi iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Verifica se o usuário está logado
 * @return bool
 */
function estaLogado() {
    return isset($_SESSION['usuario_id']);
}

/**
 * Exige que o usuário esteja logado para acessar a página
 * Redireciona para o login caso contrário
 */
function exigirLogin() {
    if (!estaLogado()) {
        header("Location: login.php");
        exit;
    }
}

/**
 * Exige que o usuário NÃO esteja logado (para páginas de login/cadastro)
 * Redireciona para o dashboard se já estiver logado
 */
function exigirDeslogado() {
    if (estaLogado()) {
        header("Location: dashboard.php");
        exit;
    }
}

/**
 * Função auxiliar para limpar dados de saída (XSS Protection)
 */
function clean($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}
?>
