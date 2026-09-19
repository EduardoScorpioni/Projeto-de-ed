<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Projeto Estrutura de Dados</title>
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
        </nav>
    </header>

    <main class="auth-container" style="padding: 40px 20px;">
        <section class="auth-card">
            <div class="eyebrow" style="text-align: center;">Comece agora</div>
            <h1 data-typed="Criar conta">Criar conta</h1>
            <p class="subtitle">Junte-se ao Grupo 6 e comece seus estudos.</p>

            <?php if (!empty($erros)): ?>
                <div class="alert alert-danger">
                    <ul class="error-list">
                        <?php foreach ($erros as $erro): ?>
                            <li><?php echo clean($erro); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form action="cadastro.php" method="POST">
                <div class="form-group">
                    <label for="nome">Nome completo</label>
                    <input type="text" id="nome" name="nome" class="form-control"
                           value="<?php echo clean($nome); ?>" required autofocus>
                </div>

                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="<?php echo clean($email); ?>" required>
                </div>

                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" class="form-control"
                           placeholder="Mín. 8 caracteres, 1 maiúscula, 1 número" required>
                </div>

                <div class="form-group">
                    <label for="confirma_senha">Confirmar Senha</label>
                    <input type="password" id="confirma_senha" name="confirma_senha" class="form-control" required>
                </div>

                <button type="submit" class="button primary">Cadastrar</button>
            </form>

            <div class="auth-footer">
                Já tem uma conta? <a href="login.php">Entrar</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Estrutura de Dados. <a href="../index.php">Voltar ao início</a></p>
    </footer>
    <script src="../assets/js/typed-title.js"></script>
</body>
</html>
