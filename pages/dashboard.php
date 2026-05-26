<?php
/* pages/dashboard.php */
require_once '../includes/sessao.php';
exigirLogin();
?>
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
            <a href="logout.php">Sair</a>
        </nav>
    </header>

    <main>
        <section class="dashboard-header">
            <div class="welcome-info">
                <div class="eyebrow">Área do aluno</div>
                <h1>Olá, <?php echo clean($_SESSION['usuario_nome']); ?>!</h1>
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
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Grupo 6 - Disciplina de Estrutura de Dados. <a href="logout.php">Sair da conta</a></p>
    </footer>
</body>
</html>
