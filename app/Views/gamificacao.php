<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gameficacao BrunoCoins | Grupo 6</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/gamificacao.css">
</head>
<body>
  <?php $paginaAtual = 'gamificacao'; require APP_PATH . '/Views/partials/header.php'; ?>

  <main
    class="game-page"
    data-gamification-root
    data-player-name="<?php echo clean($usuarioNome); ?>"
    data-initial-coins="<?php echo (int) $initialBrunoCoins; ?>"
    data-force-admin-coins="<?php echo $isAdminGame ? 'true' : 'false'; ?>"
    data-logged-in="<?php echo estaLogado() ? 'true' : 'false'; ?>"
    data-api-url="../api/gamificacao.php"
  >
    <section class="game-hud" aria-labelledby="game-title">
      <div class="game-title-block">
        <p class="eyebrow">Gameficacao</p>
        <h1 id="game-title" data-typed="BrunoCoins e guarda-roupa ED">BrunoCoins e guarda-roupa ED</h1>
        <p>
          Responda desafios de Estrutura de Dados, ganhe BrunoCoins, compre roupas,
          monte combos de atributos e evolua o personagem do Grupo 6.
        </p>
        <?php if (!estaLogado()): ?>
          <p class="game-guest-note">
            Jogando como visitante: seu progresso fica só neste navegador.
            <a href="login.php">Entre na conta</a> para salvar BrunoCoins, roupas e nível no seu perfil.
          </p>
        <?php endif; ?>
      </div>

      <aside class="wallet-panel" aria-label="Carteira BrunoCoins">
        <div class="wallet-main">
          <div class="brunocoin-3d" id="brunoCoin3d" role="button" tabindex="0" aria-label="Girar a moeda BrunoCoin" title="Clique para girar">
            <div class="brunocoin-3d__inner">
              <span class="brunocoin-3d__face brunocoin-3d__face--front">BC</span>
              <span class="brunocoin-3d__face brunocoin-3d__face--back">ED</span>
            </div>
          </div>
          <div>
            <span class="wallet-label">Saldo</span>
            <strong id="coinBalance">0</strong>
            <span class="wallet-unit">BrunoCoins</span>
          </div>
        </div>
        <div class="wallet-row">
          <span>Nivel <strong id="playerLevel">1</strong></span>
          <span>Combo <strong id="comboCount">0</strong></span>
        </div>
      </aside>
    </section>

    <section class="game-layout" aria-label="Area principal da gameficacao">
      <section class="avatar-panel" aria-labelledby="avatar-title">
        <div class="panel-heading">
          <p class="eyebrow">Personagem</p>
          <h2 id="avatar-title">Aluno de ED</h2>
        </div>

        <div class="avatar-stage">
          <div id="characterAvatar" class="character-avatar-3d" aria-label="Avatar 3D com roupas equipadas"></div>
          <span class="avatar-stage__hint" aria-hidden="true">Arraste para girar</span>
        </div>

        <div class="equipped-summary">
          <h3>Equipado agora</h3>
          <div id="equippedSlots" class="equipment-grid"></div>
        </div>

        <div class="stats-grid" aria-label="Atributos do personagem">
          <div>
            <span>Multiplicador</span>
            <strong id="coinMultiplier">1.00x</strong>
          </div>
          <div>
            <span>XP</span>
            <strong id="xpMultiplier">1.00x</strong>
          </div>
          <div>
            <span>Sorte</span>
            <strong id="luckStat">0%</strong>
          </div>
          <div>
            <span>Foco</span>
            <strong id="focusStat">0</strong>
          </div>
        </div>
      </section>

      <section class="challenge-panel" aria-labelledby="challenge-title">
        <div class="panel-heading">
          <p class="eyebrow">Treino valendo BrunoCoins</p>
          <h2 id="challenge-title">Desafio rapido</h2>
          <p id="challengeReward">Recompensa base: 0 BrunoCoins</p>
        </div>

        <div class="challenge-box" aria-live="polite">
          <p id="challengeQuestion">Carregando desafio...</p>
          <div id="challengeOptions" class="option-grid"></div>
        </div>

        <div class="action-row">
          <button id="nextChallenge" class="button primary" type="button">Novo desafio</button>
          <button id="claimChest" class="button secondary" type="button">Abrir cofre</button>
        </div>

        <div id="gameMessage" class="game-message" role="status" aria-live="polite"></div>

        <div class="progress-panel">
          <div>
            <span>Acertos</span>
            <strong id="correctCount">0</strong>
          </div>
          <div>
            <span>Respondidos</span>
            <strong id="answeredCount">0</strong>
          </div>
          <div>
            <span>Melhor combo</span>
            <strong id="bestCombo">0</strong>
          </div>
        </div>
      </section>
    </section>

    <section class="section wardrobe-section alt-section" aria-labelledby="wardrobe-title">
      <div class="section-heading">
        <p class="eyebrow">Loja de roupas</p>
        <h2 id="wardrobe-title">Guarda-roupa BrunoCoins</h2>
        <p>Itens comprados podem ser equipados por slot e melhorados ate o nivel 3.</p>
      </div>

      <div id="shopFilters" class="filter-bar" aria-label="Filtros da loja">
        <button class="filter-button is-active" type="button" data-filter="todos">Todos</button>
        <button class="filter-button" type="button" data-filter="cabeca">Cabeca</button>
        <button class="filter-button" type="button" data-filter="tronco">Tronco</button>
        <button class="filter-button" type="button" data-filter="pernas">Pernas</button>
        <button class="filter-button" type="button" data-filter="acessorio">Acessorio</button>
        <button class="filter-button" type="button" data-filter="aura">Aura</button>
        <button class="filter-button" type="button" data-filter="conjunto">Conjunto</button>
      </div>

      <div id="shopGrid" class="shop-grid"></div>
    </section>

    <section class="section missions-section" aria-labelledby="missions-title">
      <div class="section-heading">
        <p class="eyebrow">Missoes</p>
        <h2 id="missions-title">Contratos de BrunoCoins</h2>
      </div>

      <div id="missionGrid" class="mission-grid"></div>
    </section>

    <section class="section badges-section alt-section" aria-labelledby="badges-title">
      <div class="section-heading">
        <p class="eyebrow">Coleção</p>
        <h2 id="badges-title">Emblemas</h2>
        <p>Desbloqueiam sozinhos conforme você joga — não precisa resgatar, é só reconhecimento.</p>
      </div>

      <div id="badgeGrid" class="badge-grid"></div>
    </section>

    <section class="section inventory-section" aria-labelledby="inventory-title">
      <div class="section-heading">
        <p class="eyebrow">Inventario</p>
        <h2 id="inventory-title">Colecao desbloqueada</h2>
      </div>

      <div id="inventoryList" class="inventory-list"></div>

      <div class="danger-zone">
        <button id="resetProgress" class="button secondary" type="button">Resetar progresso local</button>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p><a href="../index.php">Voltar para a pagina inicial</a></p>
  </footer>

  <!-- Banco de desafios do quiz, gerado pelo GamificacaoPerfil::bancoDesafios() (PHP) -->
  <script type="application/json" id="dados-desafios"><?php echo json_encode($desafios, JSON_UNESCAPED_UNICODE); ?></script>

  <script src="../assets/js/typed-title.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
  <script src="../assets/js/avatar3d.js"></script>
  <script src="../assets/js/gamificacao.js"></script>
</body>
</html>
