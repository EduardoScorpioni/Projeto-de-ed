<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Senha - Projeto Estrutura de Dados</title>
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
            <a href="login.php">Login</a>
            <a href="cadastro.php">Cadastro</a>
        </nav>
    </header>

    <main class="auth-container">
        <section class="auth-card">
            <div class="eyebrow" style="text-align: center;">Atualização de Senha</div>
            <h1 data-typed="Nova Senha">Nova Senha</h1>
            <p class="subtitle">Defina uma nova credencial segura para a sua conta.</p>

            <?php if (!empty($erro)): ?>
                <div class="alert alert-danger">
                    <?php echo clean($erro); ?>
                </div>
            <?php endif; ?>

            <?php if ($recuperacao): ?>
                <div style="margin-bottom: 20px; font-size: 0.9rem; color: var(--muted); text-align: center;">
                    Redefinindo senha para: <strong><?php echo clean($recuperacao['nome']); ?></strong><br>
                    <span style="font-size: 0.82rem; color: var(--text);">(<?php echo clean($recuperacao['email']); ?>)</span>
                </div>

                <form action="redefinir-senha.php" method="POST">
                    <input type="hidden" name="token" value="<?php echo clean($token); ?>">

                    <div class="form-group">
                        <label for="nova_senha">Nova Senha</label>
                        <input type="password" id="nova_senha" name="nova_senha" class="form-control" required autofocus>
                        <small style="display:block; margin-top: 6px; font-size: 0.8rem; color: var(--muted);">
                            Mínimo de 8 caracteres, com pelo menos uma letra maiúscula e um número.
                        </small>
                    </div>

                    <div class="form-group">
                        <label for="confirma_nova_senha">Confirme a Nova Senha</label>
                        <input type="password" id="confirma_nova_senha" name="confirma_nova_senha" class="form-control" required>
                    </div>

                    <button type="submit" class="button primary">Atualizar Senha</button>
                </form>
            <?php else: ?>
                <div style="margin-top: 20px; text-align: center;">
                    <a href="esqueci-senha.php" class="button primary" style="display:inline-block; text-decoration:none;">
                        Solicitar Novo Link de Recuperação
                    </a>
                </div>
            <?php endif; ?>

            <div class="auth-footer">
                Lembrou sua senha antiga? <a href="login.php">Voltar ao login</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Estrutura de Dados. <a href="../index.php">Voltar ao início</a></p>
    </footer>
    <script src="../assets/js/typed-title.js"></script>
</body>
</html>
