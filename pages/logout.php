<?php
/* pages/logout.php */
require_once '../includes/sessao.php';

// Limpa todas as variáveis de sessão
session_unset();

// Destrói a sessão
session_destroy();

// Redireciona para a home
header("Location: ../index.php");
exit;
?>
