<?php
/**
 * app/Views/dashboard-perguntas.php
 * Dashboard de Perguntas & Questões Interativas — Grupo 6 (Estrutura de Dados)
 */

$usuarioNome = isset($usuarioNome) ? $usuarioNome : (estaLogado() ? $_SESSION['usuario_nome'] : 'Aluno visitante');
$isAdminGame = isset($isAdminGame) ? $isAdminGame : false;
$initialBrunoCoins = isset($initialBrunoCoins) ? $initialBrunoCoins : 350;
$perfilGamificacao = isset($perfilGamificacao) ? $perfilGamificacao : null;

$coinsExibir = $perfilGamificacao ? (int) $perfilGamificacao['coins'] : (int) $initialBrunoCoins;
$xpExibir = $perfilGamificacao ? (int) $perfilGamificacao['xp'] : 0;
$nivelExibir = $perfilGamificacao && isset($perfilGamificacao['nivel'])
    ? (int) $perfilGamificacao['nivel']
    : max(1, (int) floor($xpExibir / 420) + 1);

// Questões respondidas registradas no perfil
$questionsProgress = $perfilGamificacao && isset($perfilGamificacao['questionsProgress']) && is_array($perfilGamificacao['questionsProgress'])
    ? $perfilGamificacao['questionsProgress']
    : [];

$respondidasExibir = count($questionsProgress);
$corretasExibir = 0;
foreach ($questionsProgress as $qp) {
    if (!empty($qp['correct'])) {
        $corretasExibir++;
    }
}
// Se o perfil tiver correct/answered globais maiores, usa como base
if ($perfilGamificacao) {
    if (isset($perfilGamificacao['answered']) && $perfilGamificacao['answered'] > $respondidasExibir) {
        $respondidasExibir = (int) $perfilGamificacao['answered'];
    }
    if (isset($perfilGamificacao['correct']) && $perfilGamificacao['correct'] > $corretasExibir) {
        $corretasExibir = (int) $perfilGamificacao['correct'];
    }
}
$taxaAcertoExibir = $respondidasExibir > 0 ? (int) round(($corretasExibir / $respondidasExibir) * 100) : 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard de Perguntas & Desafios | Estrutura de Dados</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/dashboard-perguntas.css">
</head>
<body>
  <?php require APP_PATH . '/Views/partials/header.php'; ?>

  <!-- Hero Section com Mascote Fofo -->
  <header class="questions-hero">
    <div class="hero-wrapper">
      <div class="hero-text">
        <div class="hero-pill">
          <span class="dot"></span>
          <span>Central de Prática & Fixação</span>
        </div>
        <h1 class="hero-title">
          Dashboard de <span class="gradient-text">Perguntas & Desafios</span>
        </h1>
        <p class="hero-subtitle">
          Pratique conceitos fundamentais de TAD, Listas, Filas, Pilhas e Árvores. 
          Resolva questões interativas com feedback didático imediato e ganhe BrunoCoins!
        </p>
        <div class="hero-actions">
          <button type="button" class="button-cute primary" onclick="document.querySelector('[data-tab=simulado]').click();">
            ⚡ Fazer Simulado Rápido
          </button>
          <a href="gamificacao.php" class="button-cute secondary">
            🎮 Ir para o PonteiroQuest
          </a>
          <div class="hero-game-pill" id="heroGamePill" title="Progresso sincronizado com o PonteiroQuest">
            <span class="game-pill-icon">🎮</span>
            <span class="game-pill-text">PonteiroQuest: <strong id="pqPlayerCoins"><?php echo number_format($coinsExibir, 0, ',', '.'); ?></strong> BC &bull; Nível <strong id="pqPlayerLevel"><?php echo $nivelExibir; ?></strong></span>
            <span class="game-pill-sync" id="pqSyncStatus">● Conectado</span>
          </div>
        </div>
      </div>

      <!-- Mascote Nóbinho -->
      <div class="hero-mascot-box" id="mascotWrapper" style="cursor: pointer;" title="Clique no Nóbinho para ouvir uma dica!">
        <div class="mascot-avatar">
          <!-- SVG Fofo do Robôzinho Nóbinho de Ponteiros -->
          <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" fill="#E8F5EF" stroke="#10B981" stroke-width="4"/>
            <!-- Antena -->
            <line x1="50" y1="20" x2="50" y2="10" stroke="#1F7A55" stroke-width="4" stroke-linecap="round"/>
            <circle cx="50" cy="8" r="5" fill="#F59E0B"/>
            <!-- Cabeça / Rosto -->
            <rect x="26" y="24" width="48" height="42" rx="14" fill="#14241C"/>
            <!-- Visor / Olhos brilhantes -->
            <circle cx="40" cy="42" r="5.5" fill="#34D399"/>
            <circle cx="60" cy="42" r="5.5" fill="#34D399"/>
            <!-- Sorriso fofo -->
            <path d="M43 54C47 58 53 58 57 54" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
            <!-- Nó / Ponteirinho fofo -->
            <path d="M20 74C20 74 34 88 50 88C66 88 80 74 80 74" stroke="#1F7A55" stroke-width="4" stroke-linecap="round"/>
            <circle cx="20" cy="74" r="4" fill="#10B981"/>
            <circle cx="80" cy="74" r="4" fill="#10B981"/>
          </svg>
        </div>
        <div class="mascot-bubble" id="mascotBubbleText">
          <strong>Nóbinho:</strong>
          Pronto para testar seus ponteiros? Clique em uma alternativa para ver a explicação na hora! ✨
        </div>
      </div>
    </div>
  </header>

  <main
    class="questions-container"
    data-gamification-root
    data-player-name="<?php echo clean($usuarioNome); ?>"
    data-initial-coins="<?php echo (int) $initialBrunoCoins; ?>"
    data-force-admin-coins="<?php echo $isAdminGame ? 'true' : 'false'; ?>"
    data-logged-in="<?php echo estaLogado() ? 'true' : 'false'; ?>"
    data-api-url="../api/gamificacao.php"
  >
    <!-- KPIs / Cards de Resumo -->
    <section class="kpi-grid" aria-label="Estatísticas de Resolução">
      <div class="kpi-card" style="--card-color: #10b981; --icon-bg: #ecfdf5; --icon-color: #059669;">
        <div class="kpi-icon-wrap">📚</div>
        <div class="kpi-info">
          <span class="kpi-label">Banco de Questões</span>
          <strong class="kpi-value" id="kpiTotalQuestions"><?php echo count($desafios); ?></strong>
          <span class="kpi-sub">Questões comentadas</span>
        </div>
      </div>

      <div class="kpi-card" style="--card-color: #3b82f6; --icon-bg: #eff6ff; --icon-color: #2563eb;">
        <div class="kpi-icon-wrap">🎯</div>
        <div class="kpi-info">
          <span class="kpi-label">Taxa de Acerto</span>
          <strong class="kpi-value" id="kpiAccuracy"><?php echo $taxaAcertoExibir; ?>%</strong>
          <span class="kpi-sub" id="kpiStreak"><?php echo $corretasExibir; ?> acertos</span>
        </div>
      </div>

      <div class="kpi-card" style="--card-color: #f59e0b; --icon-bg: #fef3c7; --icon-color: #d97706;">
        <div class="kpi-icon-wrap">🪙</div>
        <div class="kpi-info">
          <span class="kpi-label">Saldo BrunoCoins</span>
          <strong class="kpi-value" id="kpiCoins"><?php echo number_format($coinsExibir, 0, ',', '.'); ?></strong>
          <span class="kpi-sub" id="kpiCoinsSub">Sincronizado com PonteiroQuest</span>
        </div>
      </div>

      <div class="kpi-card" style="--card-color: #8b5cf6; --icon-bg: #f3e8ff; --icon-color: #7c3aed;">
        <div class="kpi-icon-wrap">🏆</div>
        <div class="kpi-info">
          <span class="kpi-label">Nível no PonteiroQuest</span>
          <strong class="kpi-value" id="kpiMastery" style="font-size: 1.3rem;">Nível <?php echo $nivelExibir; ?> 🌱</strong>
          <span class="kpi-sub" id="kpiAnswered"><?php echo $respondidasExibir; ?> / <?php echo count($desafios); ?> respondidas</span>
        </div>
      </div>
    </section>

    <!-- Abas de Navegação -->
    <nav class="nav-tabs-bar" aria-label="Abas do Dashboard">
      <div class="tabs-group">
        <button type="button" class="tab-btn is-active" data-tab="banco">
          📑 Banco de Questões
          <span class="tab-counter" id="tabBankCount"><?php echo count($desafios); ?></span>
        </button>
        <button type="button" class="tab-btn" data-tab="simulado">
          ⚡ Simulado Rápido
        </button>
        <button type="button" class="tab-btn" data-tab="maestria">
          📊 Maestria & Desempenho
        </button>
      </div>

      <div class="tab-tools">
        <button type="button" class="tool-toggle-btn" id="btnToggleSound">
          🔊 Sons: Ligados
        </button>
        <button type="button" class="tool-toggle-btn" id="btnResetProgress" title="Zerar respostas locais">
          🧹 Zerar Progresso
        </button>
      </div>
    </nav>

    <!-- ABA 1: Banco de Questões -->
    <section id="tabContentBanco" class="tab-panel">
      <!-- Filtros e Busca -->
      <div class="filters-container">
        <div class="search-box-row">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              id="searchQuestions" 
              class="search-input" 
              placeholder="Pesquisar por enunciado, complexidade O(n), código ou conceito..." 
              autocomplete="off"
            >
          </div>

          <select id="selectDifficulty" class="filter-select" aria-label="Filtrar por dificuldade">
            <option value="todas">Dificuldade: Todas</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>

          <select id="selectStatus" class="filter-select" aria-label="Filtrar por status">
            <option value="todas">Status: Todas</option>
            <option value="nao-respondidas">Não respondidas</option>
            <option value="acertadas">Acertadas ✨</option>
            <option value="erradas">A revisar 💡</option>
          </select>
        </div>

        <!-- Pílulas de Categoria -->
        <div class="category-pills-row" aria-label="Filtro de categorias">
          <button type="button" class="cat-pill is-active" data-cat="todas">
            Todas <span class="cat-pill-count"><?php echo count($desafios); ?></span>
          </button>
          <button type="button" class="cat-pill" data-cat="tad">
            TAD & Struct
          </button>
          <button type="button" class="cat-pill" data-cat="lista-simples">
            Lista Simples
          </button>
          <button type="button" class="cat-pill" data-cat="lista-dupla">
            Lista Dupla
          </button>
          <button type="button" class="cat-pill" data-cat="fila">
            Fila (FIFO)
          </button>
          <button type="button" class="cat-pill" data-cat="fila-de-prioridades">
            Fila de Prioridades
          </button>
          <button type="button" class="cat-pill" data-cat="pilha">
            Pilha (LIFO)
          </button>
          <button type="button" class="cat-pill" data-cat="arvore-trie">
            Árvore Trie
          </button>
          <button type="button" class="cat-pill" data-cat="arvore-patricia">
            Árvore Patricia
          </button>
        </div>
      </div>

      <!-- Grade Dinâmica de Perguntas -->
      <div id="questionsGrid" class="questions-grid">
        <!-- Renderizado via JavaScript -->
      </div>

      <!-- Estado vazio se nenhum filtro combinar -->
      <div id="questionsEmptyState" style="display: none; text-align: center; padding: 60px 20px; background: #fff; border-radius: 18px; border: 1px dashed var(--dp-line);">
        <p style="font-size: 2.5rem; margin: 0 0 12px 0;">🔍</p>
        <h3 style="margin: 0 0 8px 0; font-size: 1.3rem;">Nenhuma pergunta encontrada</h3>
        <p style="color: var(--dp-muted); margin: 0 0 16px 0;">Tente alterar os termos da busca ou redefinir os filtros.</p>
        <button type="button" class="button-cute secondary" onclick="document.getElementById('searchQuestions').value = ''; document.querySelector('.cat-pill[data-cat=todas]').click();">
          Limpar filtros
        </button>
      </div>
    </section>

    <!-- ABA 2: Simulado Rápido -->
    <section id="tabContentSimulado" class="tab-panel" style="display: none;">
      <div id="simuladoViewArea">
        <!-- Renderizado dinamicamente via JS -->
      </div>
    </section>

    <!-- ABA 3: Maestria & Desempenho -->
    <section id="tabContentMaestria" class="tab-panel" style="display: none;">
      <div id="masteryContentArea">
        <!-- Renderizado dinamicamente via JS -->
      </div>
    </section>
  </main>

  <!-- Perfil do PonteiroQuest injetado para hidratação imediata -->
  <script id="dados-perfil-gamificacao" type="application/json">
    <?php echo json_encode($perfilGamificacao, JSON_UNESCAPED_UNICODE); ?>
  </script>

  <!-- Dados das questões injetados como JSON seguro -->
  <script id="dados-questoes" type="application/json">
    <?php echo json_encode($desafios, JSON_UNESCAPED_UNICODE); ?>
  </script>

  <!-- Canvas para Confetes Animados -->
  <canvas id="confettiCanvas"></canvas>

  <!-- Toast Flutuante Fofo -->
  <div id="cuteToast" class="cute-toast" role="status" aria-live="polite"></div>

  <!-- Scripts -->
  <script src="../assets/js/dashboard-perguntas.js"></script>
</body>
</html>
