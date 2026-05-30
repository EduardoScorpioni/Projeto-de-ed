<?php
/* pages/login.php */
require_once '../includes/conexao.php';
require_once '../includes/sessao.php';

// Redireciona se já estiver logado
exigirDeslogado();

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $senha = isset($_POST['senha']) ? $_POST['senha'] : '';

    if (empty($email) || empty($senha)) {
        $erro = 'Por favor, preencha todos os campos.';
    } else {
        // Busca o usuário pelo email
        $stmt = $conn->prepare("SELECT id, nome, senha_hash FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {
            // Verifica a senha
            if (password_verify($senha, $user['senha_hash'])) {
                // Inicia a sessão do usuário
                $_SESSION['usuario_id'] = $user['id'];
                $_SESSION['usuario_nome'] = $user['nome'];
                
                // Regenera ID da sessão por segurança
                session_regenerate_id(true);

                // Registra log de acesso
                $ip = $_SERVER['REMOTE_ADDR'];
                $log_stmt = $conn->prepare("INSERT INTO sessoes_log (usuario_id, ip) VALUES (?, ?)");
                $log_stmt->bind_param("is", $user['id'], $ip);
                $log_stmt->execute();

                header("Location: dashboard.php");
                exit;
            } else {
                $erro = 'E-mail ou senha inválidos.';
            }
        } else {
            $erro = 'E-mail ou senha inválidos.';
        }
        $stmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Projeto Estrutura de Dados</title>
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/login.css">
</head>
<body>
    <header class="topbar">
        <a href="../index.php" class="brand">
            <span class="brand-mark">ED</span>
            <span>Estrutura de Dados</span>
        </a>
        <nav class="main-nav">
            <a href="../index.php">Início</a>
            <a href="cadastro.php">Cadastro</a>
        </nav>
    </header>

    <main class="auth-container">
        <section class="auth-card">
            <div class="eyebrow" style="text-align: center;">Bem-vindo de volta</div>
            <h1 data-typed="Acessar conta">Acessar conta</h1>
            <p class="subtitle">Entre para acessar a área restrita do aluno.</p>

            <?php if ($erro): ?>
                <div class="alert alert-danger">
                    <?php echo clean($erro); ?>
                </div>
            <?php endif; ?>

            <form action="login.php" method="POST">
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" class="form-control" 
                           value="<?php echo isset($email) ? clean($email) : ''; ?>" required autofocus>
                </div>
                
                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" class="form-control" required>
                </div>

                <button type="submit" class="button primary">Entrar</button>
            </form>

            <div class="auth-footer">
                Não tem uma conta? <a href="cadastro.php">Cadastre-se</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Estrutura de Dados. <a href="../index.php">Voltar ao início</a></p>
    </footer>
    <script src="../assets/js/typed-title.js"></script>
</body>
</html>
