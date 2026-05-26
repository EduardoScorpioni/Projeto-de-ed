<?php
/* includes/conexao.php */

// Define constantes para conexão
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ed_grupo6');

// Impede acesso direto ao arquivo
if (basename($_SERVER['PHP_SELF']) == 'conexao.php') {
    die('Acesso negado');
}

// Cria a conexão MySQLi
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    // Em produção, não mostramos o erro detalhado para o usuário
    error_log("Falha na conexão: " . $conn->connect_error);
    die("Desculpe, ocorreu um erro de conexão com o banco de dados. Tente novamente mais tarde.");
}

// Configura o charset para evitar problemas com acentuação
$conn->set_charset("utf8mb4");

// Define uma constante para indicar que o app foi inicializado corretamente (opcional, mas boa prática)
define('APP_ROOT', true);
?>
