<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Aluno - Projeto Estrutura de Dados</title>
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/dashboard.css">
</head>
<body>
    <header class="topbar">
        <a href="../index.php" class="brand">
            <span class="brand-mark">ED</span>
            <span>Estrutura de Dados</span>
        </a>
        <nav class="main-nav">
            <a href="../index.php">Início</a>
            <a href="#" aria-current="page">Dashboard</a>
            <a href="gamificacao.php">Gameficacao</a>
            <a href="logout.php">Sair</a>
        </nav>
    </header>

    <main>
        <section class="dashboard-header">
            <div class="welcome-info">
                <div class="eyebrow">Área do aluno</div>
                <h1 data-typed="Olá, <?php echo clean($_SESSION['usuario_nome']); ?>!">Olá, <?php echo clean($_SESSION['usuario_nome']); ?>!</h1>
                <p>Bem-vindo ao seu painel educacional. Escolha um módulo abaixo para continuar seus estudos sobre Estrutura de Dados.</p>
            </div>
        </section>

        <section class="dashboard-content">
            <h2 class="section-heading">Seus Módulos de Estudo</h2>

            <div class="module-grid">
                <!-- Card TAD -->
                <a href="tad.php" class="module-card">
                    <span>Módulo 01</span>
                    <h3>Tipos Abstratos de Dados (TAD)</h3>
                    <p>Entenda o conceito de abstração e como organizar dados de forma lógica antes da implementação.</p>
                    <div class="card-action">Acessar conteúdo</div>
                </a>

                <!-- Card Lista Simples -->
                <a href="lista-simples.php" class="module-card">
                    <span>Módulo 02</span>
                    <h3>Lista Simplesmente Encadeada</h3>
                    <p>Aprenda a estrutura básica de nós e ponteiros para criar coleções dinâmicas de dados.</p>
                    <div class="card-action">Acessar conteúdo</div>
                </a>

                <!-- Card Lista Dupla -->
                <a href="lista-dupla.php" class="module-card">
                    <span>Módulo 03</span>
                    <h3>Lista Duplamente Encadeada</h3>
                    <p>Explore a navegação bidirecional e as vantagens de ponteiros para o elemento anterior.</p>
                    <div class="card-action">Acessar conteúdo</div>
                </a>

                <!-- Card Fila -->
                <a href="fila.php" class="module-card">
                    <span>Módulo 04</span>
                    <h3>Fila Encadeada (FIFO)</h3>
                    <p>O primeiro elemento a entrar é o primeiro a sair: enfileirar, desenfileirar e fila de prioridades.</p>
                    <div class="card-action">Acessar conteúdo</div>
                </a>

                <!-- Card Pilha -->
                <a href="pilha.php" class="module-card">
                    <span>Módulo 05</span>
                    <h3>Pilha Encadeada (LIFO)</h3>
                    <p>O último elemento a entrar é o primeiro a sair: empilhar e desempilhar pelo topo.</p>
                    <div class="card-action">Acessar conteúdo</div>
                </a>
            </div>
        </section>
        <section class="gamification-cta">
            <div class="gamification-cta__inner">
                <div>
                    <p class="eyebrow">BrunoCoins</p>
                    <h2>Continue estudando no modo gameficado</h2>
                    <p>Entre na loja, responda desafios e use suas BrunoCoins para montar o personagem mais forte do Grupo 6.</p>
                    <div class="gamification-cta__actions">
                        <a class="button primary" href="gamificacao.php">Abrir gameficacao</a>
                    </div>
                </div>
                <span class="gamification-cta__coins">BC</span>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Disciplina de Estrutura de Dados. <a href="logout.php">Sair da conta</a></p>
    </footer>
  <script src="../assets/js/typed-title.js"></script>
</body>
</html>
