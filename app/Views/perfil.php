<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu perfil - Projeto Estrutura de Dados</title>
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
            <a href="dashboard.php">Dashboard</a>
            <a href="gamificacao.php">Gameficacao</a>
            <a href="logout.php">Sair</a>
        </nav>
    </header>

    <main class="auth-container" style="padding: 40px 20px;">
        <section class="auth-card">
            <div class="eyebrow" style="text-align: center;">Área do aluno</div>
            <h1 data-typed="Meu perfil">Meu perfil</h1>
            <p class="subtitle">Atualize seus dados de cadastro.</p>

            <?php if ($sucesso): ?>
                <div class="alert alert-success">
                    Perfil atualizado com sucesso.
                </div>
            <?php endif; ?>

            <?php if (!empty($erros)): ?>
                <div class="alert alert-danger">
                    <ul class="error-list">
                        <?php foreach ($erros as $erro): ?>
                            <li><?php echo clean($erro); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form action="perfil.php" method="POST">
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

                <hr style="border: none; border-top: 1px solid var(--line); margin: 22px 0;">

                <p class="subtitle" style="margin-top: 0;">Deixe os campos abaixo em branco para manter a senha atual.</p>

                <div class="form-group">
                    <label for="senha_atual">Senha atual</label>
                    <input type="password" id="senha_atual" name="senha_atual" class="form-control"
                           placeholder="Só é obrigatória se for trocar a senha">
                </div>

                <div class="form-group">
                    <label for="nova_senha">Nova senha</label>
                    <input type="password" id="nova_senha" name="nova_senha" class="form-control"
                           placeholder="Mín. 8 caracteres, 1 maiúscula, 1 número">
                </div>

                <div class="form-group">
                    <label for="confirma_nova_senha">Confirmar nova senha</label>
                    <input type="password" id="confirma_nova_senha" name="confirma_nova_senha" class="form-control">
                </div>

                <button type="submit" class="button primary">Salvar alterações</button>
            </form>

            <div class="auth-footer">
                <a href="dashboard.php">Voltar ao painel</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Estrutura de Dados. <a href="../index.php">Voltar ao início</a></p>
    </footer>
    <script src="../assets/js/typed-title.js"></script>
</body>
</html>
