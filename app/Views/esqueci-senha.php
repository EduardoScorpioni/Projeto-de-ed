<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Senha - Projeto Estrutura de Dados</title>
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
            <div class="eyebrow" style="text-align: center;">Segurança da Conta</div>
            <h1 data-typed="Recuperar Senha">Recuperar Senha</h1>
            <p class="subtitle">Informe seu e-mail cadastrado para gerar o link temporário de redefinição.</p>

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

            <?php if (!empty($linkSimulado)): ?>
                <div class="simulated-box">
                    <span class="simulated-box__badge">Simulação Acadêmica</span>
                    <div class="simulated-box__title">📬 Link de Recuperação Gerado!</div>
                    <p class="simulated-box__desc">
                        Como estamos rodando em ambiente local de desenvolvimento (sem servidor SMTP configurado), o token foi gravado no banco de dados e o link de acesso foi gerado abaixo para testes do avaliador:
                    </p>
                    <div class="simulated-box__link">
                        <?php echo clean($linkSimulado); ?>
                    </div>
                    <a href="<?php echo clean($linkSimulado); ?>" class="button primary" style="text-align:center; display:block; text-decoration:none;">
                        Prosseguir para Redefinir Senha &rarr;
                    </a>
                </div>
            <?php endif; ?>

            <form action="esqueci-senha.php" method="POST">
                <div class="form-group">
                    <label for="email">E-mail cadastrado</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="<?php echo isset($email) ? clean($email) : ''; ?>"
                           placeholder="seu-email@exemplo.com" required autofocus>
                </div>

                <button type="submit" class="button primary">
                    <?php echo !empty($linkSimulado) ? 'Gerar Outro Link' : 'Enviar Link de Recuperação'; ?>
                </button>
            </form>

            <div class="auth-footer">
                Lembrou sua senha? <a href="login.php">Voltar para o login</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Estrutura de Dados. <a href="../index.php">Voltar ao início</a></p>
    </footer>
    <script src="../assets/js/typed-title.js"></script>
</body>
</html>
