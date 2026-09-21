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
            <a href="gamificacao.php">Gameficacao</a>
            <a href="cadastro.php">Cadastro</a>
        </nav>
    </header>

    <main class="auth-container">
        <section class="auth-card">
            <div class="eyebrow" style="text-align: center;">Bem-vindo de volta</div>
            <h1 data-typed="Acessar conta">Acessar conta</h1>
            <p class="subtitle">Entre para acessar a área restrita do aluno.</p>

            <?php if (!empty($sucesso)): ?>
                <div class="alert alert-success">
                    <?php echo clean($sucesso); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($erro)): ?>
                <div class="alert alert-danger">
                    <?php echo clean($erro); ?>
                </div>
            <?php endif; ?>

            <form action="login.php" method="POST">
                <div class="form-group">
                    <label for="email">E-mail ou usuario</label>
                    <input type="text" id="email" name="email" class="form-control"
                           value="<?php echo isset($email) ? clean($email) : ''; ?>" required autofocus>
                </div>

                <div class="form-group">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <label for="senha" style="margin-bottom: 0;">Senha</label>
                        <a href="esqueci-senha.php" style="font-size: 0.85rem; color: var(--green); text-decoration: none;">Esqueceu a senha?</a>
                    </div>
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
