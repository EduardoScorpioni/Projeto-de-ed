/**
 * assets/js/dashboard-perguntas.js
 * Lógica interativa, fofa e completa do Dashboard de Perguntas de ED
 */

(function () {
  'use strict';

  // Chaves de persistência local integradas com o PonteiroQuest
  const STORAGE_KEY = 'grupo6_brunocoins_v1';
  const LEGACY_STORAGE_KEY = 'ed_perguntas_respostas_v2';
  const SOUND_KEY = 'ed_perguntas_sound_enabled';

  // Obter raiz de configuração de gamificação
  const root = document.querySelector('[data-gamification-root]') || document.body;
  const apiUrl = root.dataset.apiUrl || null;
  const isLoggedIn = root.dataset.loggedIn === 'true';
  const forceAdminCoins = root.dataset.forceAdminCoins === 'true';
  const initialCoins = parseInt(root.dataset.initialCoins || '350', 10);

  // Obter perguntas embutidas no DOM
  const rawDataEl = document.getElementById('dados-questoes');
  let QUESTIONS = [];
  try {
    QUESTIONS = rawDataEl ? JSON.parse(rawDataEl.textContent) : [];
  } catch (e) {
    console.error('Erro ao ler perguntas:', e);
    QUESTIONS = [];
  }

  // Estado do jogo e progresso do usuário
  let gameState = loadGameState();
  let userProgress = gameState.questionsProgress || {};
  let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';

  // Filtros ativos
  let currentFilters = {
    search: '',
    category: 'todas',
    difficulty: 'todas',
    status: 'todas',
  };

  // Estado do Simulado Rápido
  let simuladoState = {
    active: false,
    questions: [],
    currentIndex: 0,
    answers: {},
    correctCount: 0,
  };

  // Frases do mascote Nóbinho
  const MASCOT_PHRASES = [
    'Oi! Eu sou o Nóbinho. Cada pergunta respondida fortalece seus neurônios e seus ponteiros! 🤖✨',
    'Dica de ouro: em listas encadeadas, nunca perca a referência do próximo antes de religar!',
    'Fila é FIFO, Pilha é LIFO! Lembra da pilha de pratos e da fila do bandejão? 🍽️',
    'Sabia que a Árvore Patricia compacta nós de grau 1? Pura economia de memória!',
    'Mandando ver nos estudos! O Grupo 6 está orgulhoso do seu progresso! 🚀',
  ];

  /* ==========================================================
     Sons Fofos Nativos via Web Audio API (100% offline)
  ========================================================== */
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'correct') {
        // Acorde alegre de 2 notas (Mi -> Sol#)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'wrong') {
        // Tom suave de erro
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(220, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.29);
      } else if (type === 'fanfare') {
        // Fanfarra de conclusão de simulado
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.09);
          g.gain.setValueAtTime(0.1, now + i * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.3);
          o.start(now + i * 0.09);
          o.stop(now + i * 0.09 + 0.31);
        });
      }
    } catch (e) {
      // Ignora falhas de áudio silenciosamente
    }
  }

  /* ==========================================================
     Confetes Fofos Nativos via Canvas
  ========================================================== */
  function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];
    const particles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1.2) * 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
        life: 1,
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravidade
        p.rotation += p.vRot;
        p.life -= 0.012;

        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }
    render();
  }

  /* ==========================================================
     Persistência & Integração com PonteiroQuest
  ========================================================== */
  function freshGameState() {
    return {
      coins: initialCoins,
      xp: 0,
      combo: 0,
      bestCombo: 0,
      answered: 0,
      correct: 0,
      purchases: 0,
      owned: ['camiseta-grupo-6', 'calca-base-ed'],
      equipped: {
        tronco: 'camiseta-grupo-6',
        pernas: 'calca-base-ed',
      },
      upgrades: {},
      claimedMissions: [],
      chestReadyAt: 0,
      abilityCharges: {},
      questionsProgress: {},
    };
  }

  function loadGameState() {
    let state = freshGameState();

    // 1. Tentar ler do localStorage do PonteiroQuest
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === 'object') {
        state = {
          ...state,
          ...saved,
          equipped: { ...state.equipped, ...(saved.equipped || {}) },
          upgrades: { ...(saved.upgrades || {}) },
          owned: Array.isArray(saved.owned) ? saved.owned : state.owned,
          claimedMissions: Array.isArray(saved.claimedMissions) ? saved.claimedMissions : [],
          abilityCharges: { ...(saved.abilityCharges || {}) },
          questionsProgress: { ...(saved.questionsProgress || {}) },
        };
      }
    } catch (e) {}

    // 2. Se houver perfil injetado pelo PHP no DOM (para usuario logado)
    const profileEl = document.getElementById('dados-perfil-gamificacao');
    if (profileEl && profileEl.textContent.trim()) {
      try {
        const serverProfile = JSON.parse(profileEl.textContent);
        if (serverProfile && typeof serverProfile === 'object') {
          state = {
            ...state,
            ...serverProfile,
            equipped: { ...state.equipped, ...(serverProfile.equipped || {}) },
            upgrades: { ...(serverProfile.upgrades || {}) },
            owned: Array.isArray(serverProfile.owned)
              ? Array.from(new Set([...state.owned, ...serverProfile.owned]))
              : state.owned,
            questionsProgress: {
              ...(state.questionsProgress || {}),
              ...(serverProfile.questionsProgress || {}),
            },
          };
        }
      } catch (e) {}
    }

    // 3. Mesclar progresso legado do dashboard caso exista
    try {
      const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
      if (legacy && typeof legacy === 'object') {
        state.questionsProgress = { ...legacy, ...(state.questionsProgress || {}) };
      }
    } catch (e) {}

    if (forceAdminCoins) {
      state.coins = Math.max(state.coins, initialCoins);
    }

    return state;
  }

  let syncTimeout = null;

  function saveGameState() {
    if (forceAdminCoins) {
      gameState.coins = Math.max(gameState.coins, initialCoins);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
      console.warn('Não foi possível salvar no localStorage');
    }

    agendarSincronizacaoServidor();
  }

  function agendarSincronizacaoServidor() {
    if (!isLoggedIn || !apiUrl) return;

    const syncStatusEl = document.getElementById('pqSyncStatus');
    if (syncStatusEl) {
      syncStatusEl.textContent = '⟳ Salvando...';
      syncStatusEl.style.color = '#f59e0b';
    }

    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState),
      })
        .then((r) => {
          if (syncStatusEl) {
            if (r.ok) {
              syncStatusEl.textContent = '● Conectado';
              syncStatusEl.style.color = '#10b981';
            } else {
              syncStatusEl.textContent = '⚠️ Erro sync';
              syncStatusEl.style.color = '#ef4444';
            }
          }
        })
        .catch(() => {
          if (syncStatusEl) {
            syncStatusEl.textContent = '○ Offline (local)';
            syncStatusEl.style.color = '#6b7280';
          }
        });
    }, 600);
  }

  function hidratarComServidor() {
    if (!isLoggedIn || !apiUrl) return;

    fetch(apiUrl)
      .then((r) => (r.ok ? r.json() : null))
      .then((servidor) => {
        if (!servidor || servidor.erro) return;

        gameState = {
          ...gameState,
          ...servidor,
          equipped: { ...gameState.equipped, ...(servidor.equipped || {}) },
          upgrades: { ...(gameState.upgrades || {}), ...(servidor.upgrades || {}) },
          owned: Array.isArray(servidor.owned)
            ? Array.from(new Set([...gameState.owned, ...servidor.owned]))
            : gameState.owned,
          claimedMissions: Array.isArray(servidor.claimedMissions)
            ? servidor.claimedMissions
            : gameState.claimedMissions,
          questionsProgress: {
            ...(gameState.questionsProgress || {}),
            ...(servidor.questionsProgress || {}),
          },
        };

        if (forceAdminCoins) {
          gameState.coins = Math.max(gameState.coins, initialCoins);
        }

        userProgress = gameState.questionsProgress || {};

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
          localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(userProgress));
        } catch (e) {}

        updateKPICards();
        renderQuestionsGrid();

        const syncStatusEl = document.getElementById('pqSyncStatus');
        if (syncStatusEl) {
          syncStatusEl.textContent = '● Conectado';
          syncStatusEl.style.color = '#10b981';
        }
      })
      .catch(() => {});
  }

  function getLevel() {
    return Math.max(1, Math.floor((gameState.xp || 0) / 420) + 1);
  }

  function calculateStats() {
    const total = QUESTIONS.length;
    let answered = 0;
    let correct = 0;
    let currentStreak = 0;
    let maxStreak = 0;

    // Estatísticas por categoria
    const categoryStats = {};

    QUESTIONS.forEach((q, idx) => {
      const qId = q.id || 'q-' + idx;
      const cat = q.categoria;

      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, correct: 0, answered: 0 };
      }
      categoryStats[cat].total++;

      if (userProgress[qId] !== undefined) {
        answered++;
        categoryStats[cat].answered++;
        if (userProgress[qId].correct) {
          correct++;
          categoryStats[cat].correct++;
          currentStreak++;
          if (currentStreak > maxStreak) maxStreak = currentStreak;
        } else {
          currentStreak = 0;
        }
      }
    });

    const effectiveAnswered = Math.max(answered, Number(gameState.answered) || 0);
    const effectiveCorrect = Math.max(correct, Number(gameState.correct) || 0);

    const accuracy = effectiveAnswered > 0 ? Math.round((effectiveCorrect / effectiveAnswered) * 100) : 0;
    const progressPct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const level = getLevel();
    let masteryLevel = `Nível ${level} 🌱`;
    if (accuracy >= 90 && effectiveAnswered >= 20) masteryLevel = `Nível ${level} • Mestre 🏆`;
    else if (accuracy >= 75 && effectiveAnswered >= 10) masteryLevel = `Nível ${level} • Explorador ⚡`;
    else if (effectiveAnswered >= 5) masteryLevel = `Nível ${level} • Praticante 📚`;

    return {
      total,
      answered,
      correct,
      effectiveAnswered,
      effectiveCorrect,
      accuracy,
      progressPct,
      coins: gameState.coins || 0,
      xp: gameState.xp || 0,
      level,
      maxStreak,
      masteryLevel,
      categoryStats,
    };
  }

  function updateKPICards() {
    const stats = calculateStats();

    const elTotal = document.getElementById('kpiTotalQuestions');
    const elAccuracy = document.getElementById('kpiAccuracy');
    const elAnswered = document.getElementById('kpiAnswered');
    const elStreak = document.getElementById('kpiStreak');
    const elCoins = document.getElementById('kpiCoins');
    const elMastery = document.getElementById('kpiMastery');

    if (elTotal) elTotal.textContent = stats.total;
    if (elAccuracy) elAccuracy.textContent = stats.accuracy + '%';
    if (elAnswered) elAnswered.textContent = `${stats.answered} / ${stats.total}`;
    if (elStreak) elStreak.textContent = `${stats.effectiveCorrect} acertos`;
    if (elCoins) elCoins.textContent = stats.coins.toLocaleString('pt-BR');
    if (elMastery) elMastery.textContent = stats.masteryLevel;

    // Atualiza pílula no Hero
    const pqPlayerCoins = document.getElementById('pqPlayerCoins');
    const pqPlayerLevel = document.getElementById('pqPlayerLevel');
    if (pqPlayerCoins) pqPlayerCoins.textContent = stats.coins.toLocaleString('pt-BR');
    if (pqPlayerLevel) pqPlayerLevel.textContent = stats.level;

    // Atualiza badges das abas
    const tabBankCount = document.getElementById('tabBankCount');
    if (tabBankCount) tabBankCount.textContent = stats.total;

    // Atualiza frase do mascote se tiver bom aproveitamento
    const mascotBubble = document.getElementById('mascotBubbleText');
    if (mascotBubble) {
      if (stats.effectiveAnswered === 0) {
        mascotBubble.innerHTML = '<strong>Olá!</strong> Seus dados estão conectados ao PonteiroQuest! Escolha uma questão ou inicie um Simulado para ganhar moedas!';
      } else if (stats.accuracy >= 80) {
        mascotBubble.innerHTML = `<strong>Incrível!</strong> Você está com ${stats.accuracy}% de acerto no PonteiroQuest! Continue assim para gabaritar a disciplina! 🎉`;
      } else if (stats.accuracy >= 50) {
        mascotBubble.innerHTML = `<strong>Bom ritmo!</strong> Você já respondeu ${stats.effectiveAnswered} questões. Revise as explicações das que errou! 💡`;
      } else {
        mascotBubble.innerHTML = '<strong>Não desanime!</strong> Errar faz parte do aprendizado. Leia cada explicação com calma!';
      }
    }

    renderMasterySection(stats);
  }

  /* ==========================================================
     Renderização do Banco de Questões
  ========================================================== */
  function getCategorySlug(cat) {
    return (cat || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  function renderQuestionsGrid() {
    const gridEl = document.getElementById('questionsGrid');
    if (!gridEl) return;

    // Filtrar questões
    const searchLow = currentFilters.search.toLowerCase().trim();

    const filtered = QUESTIONS.filter((q, idx) => {
      const qId = q.id || 'q-' + idx;
      const userRes = userProgress[qId];

      // Filtro de busca
      if (searchLow) {
        const matchesQ = q.question.toLowerCase().includes(searchLow);
        const matchesOpt = q.options.some((o) => o.toLowerCase().includes(searchLow));
        const matchesCat = q.categoria.toLowerCase().includes(searchLow);
        if (!matchesQ && !matchesOpt && !matchesCat) return false;
      }

      // Filtro de categoria
      if (currentFilters.category !== 'todas') {
        const slug = getCategorySlug(q.categoria);
        if (slug !== currentFilters.category) return false;
      }

      // Filtro de dificuldade
      if (currentFilters.difficulty !== 'todas') {
        const diff = (q.dificuldade || 'Médio').toLowerCase();
        if (diff !== currentFilters.difficulty.toLowerCase()) return false;
      }

      // Filtro de status
      if (currentFilters.status === 'nao-respondidas' && userRes !== undefined) return false;
      if (currentFilters.status === 'acertadas' && (!userRes || !userRes.correct)) return false;
      if (currentFilters.status === 'erradas' && (!userRes || userRes.correct)) return false;

      return true;
    });

    const emptyStateEl = document.getElementById('questionsEmptyState');
    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';

    gridEl.innerHTML = filtered
      .map((q, filteredIndex) => {
        const globalIndex = QUESTIONS.indexOf(q);
        const qId = q.id || 'q-' + globalIndex;
        const userRes = userProgress[qId];
        const catSlug = getCategorySlug(q.categoria);
        const difficulty = q.dificuldade || 'Médio';
        const diffClass = 'diff-' + difficulty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let cardStatusClass = '';
        if (userRes) {
          cardStatusClass = userRes.correct ? 'status-correct' : 'status-wrong';
        }

        const letters = ['A', 'B', 'C', 'D'];

        const optionsHtml = q.options
          .map((opt, optIndex) => {
            let optClass = '';
            let isSelected = false;

            if (userRes) {
              if (optIndex === userRes.chosen) {
                isSelected = true;
                optClass = userRes.correct ? 'is-selected-correct' : 'is-selected-wrong';
              } else if (!userRes.correct && optIndex === q.answer) {
                optClass = 'is-revealed-correct';
              }
            }

            return `
              <button 
                type="button" 
                class="option-btn ${optClass}" 
                data-qid="${qId}" 
                data-opt="${optIndex}"
                ${userRes ? 'disabled' : ''}
              >
                <span class="opt-letter">${letters[optIndex]}</span>
                <span class="opt-text">${escapeHtml(opt)}</span>
              </button>
            `;
          })
          .join('');

        const explanationHtml = userRes
          ? `
          <div class="explanation-box">
            <strong>${userRes.correct ? '✨ Excelente! Explicação:' : '💡 Explicação didática:'}</strong>
            ${escapeHtml(q.explicacao || 'Revise a teoria referente a este módulo nos menus de conteúdo.')}
          </div>
        `
          : '';

        return `
          <article class="question-card ${cardStatusClass}" id="card-${qId}">
            <div class="card-topbar">
              <span class="category-badge badge-${catSlug}">${escapeHtml(q.categoria)}</span>
              <span class="difficulty-badge ${diffClass}">
                <span class="diff-dot"></span>
                ${escapeHtml(difficulty)}
              </span>
            </div>

            <h3 class="card-question-text">${escapeHtml(q.question)}</h3>

            <div class="card-options-list">
              ${optionsHtml}
            </div>

            ${explanationHtml}

            <div class="card-footer">
              <span class="reward-tag">🪙 +${q.reward || 100} BC &bull; ${q.xp || 50} XP</span>
              ${
                userRes
                  ? `<button type="button" class="card-action-btn btn-retry" data-qid="${qId}">Refazer questão</button>`
                  : `<span class="card-status-hint">Selecione uma alternativa</span>`
              }
            </div>
          </article>
        `;
      })
      .join('');

    // Listener para opções de resposta
    gridEl.querySelectorAll('.option-btn:not(:disabled)').forEach((btn) => {
      btn.addEventListener('click', handleAnswerClick);
    });

    // Listener para refazer questão
    gridEl.querySelectorAll('.btn-retry').forEach((btn) => {
      btn.addEventListener('click', handleRetryClick);
    });
  }

  function handleAnswerClick(e) {
    const btn = e.currentTarget;
    const qId = btn.getAttribute('data-qid');
    const optIndex = parseInt(btn.getAttribute('data-opt'), 10);

    const question = QUESTIONS.find((q, i) => (q.id || 'q-' + i) === qId);
    if (!question) return;

    const isCorrect = optIndex === question.answer;

    userProgress[qId] = {
      chosen: optIndex,
      correct: isCorrect,
      answeredAt: Date.now(),
    };

    gameState.questionsProgress = userProgress;
    gameState.answered = Math.max((gameState.answered || 0) + 1, Object.keys(userProgress).length);

    if (isCorrect) {
      gameState.correct = (gameState.correct || 0) + 1;
      gameState.combo = (gameState.combo || 0) + 1;
      gameState.bestCombo = Math.max(gameState.bestCombo || 0, gameState.combo);

      const reward = question.reward || 100;
      const xpReward = question.xp || 55;
      gameState.coins = (gameState.coins || 0) + reward;
      gameState.xp = (gameState.xp || 0) + xpReward;

      playSound('correct');
      launchConfetti();
      showToast(`🎉 Correto! +${reward} BrunoCoins e +${xpReward} XP no PonteiroQuest!`);
    } else {
      gameState.combo = 0;
      playSound('wrong');
      showToast('❌ Quase lá! Veja a explicação para fixar o conceito.');
    }

    saveGameState();
    updateKPICards();
    renderQuestionsGrid();
  }

  function handleRetryClick(e) {
    const qId = e.currentTarget.getAttribute('data-qid');
    if (!qId) return;

    delete userProgress[qId];
    gameState.questionsProgress = userProgress;

    saveGameState();
    updateKPICards();
    renderQuestionsGrid();
    showToast('🔄 Questão resetada para praticar novamente!');
  }

  /* ==========================================================
     Aba de Maestria por Estrutura de Dados
  ========================================================== */
  function renderMasterySection(stats) {
    const container = document.getElementById('masteryContentArea');
    if (!container) return;

    const cats = stats.categoryStats;
    const catKeys = Object.keys(cats);

    if (catKeys.length === 0) {
      container.innerHTML = '<p>Nenhum dado disponível ainda.</p>';
      return;
    }

    const itemsHtml = catKeys
      .map((cat) => {
        const item = cats[cat];
        const pct = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
        const slug = getCategorySlug(cat);

        return `
          <div class="mastery-bar-item">
            <div class="mastery-bar-info">
              <span>${escapeHtml(cat)}</span>
              <span><strong>${item.correct}/${item.total}</strong> (${pct}%)</span>
            </div>
            <div class="mastery-track">
              <div class="mastery-fill fill-${slug}" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="mastery-layout">
        <div class="mastery-card">
          <h3>Progresso por Estrutura</h3>
          <p>Acompanhe sua taxa de aproveitamento em cada tema de Estrutura de Dados.</p>
          ${itemsHtml}
        </div>
        <div class="mastery-card">
          <h3>Dicas de Estudo Personalizadas</h3>
          <div class="study-tips-list" style="display: flex; flex-direction: column; gap: 14px; margin-top: 14px;">
            <div style="background: #f4f8f5; border-radius: 12px; padding: 14px; border-left: 4px solid #10b981;">
              <strong style="color: #065f46; display: block; margin-bottom: 4px;">🚀 Complexidades Assintóticas</strong>
              <span style="font-size: 0.88rem; color: #37463f;">Em listas encadeadas, ponteiros de início e fim garantem inserções em O(1), mas buscas sem índice custam O(n).</span>
            </div>
            <div style="background: #eff6ff; border-radius: 12px; padding: 14px; border-left: 4px solid #3b82f6;">
              <strong style="color: #1e40af; display: block; margin-bottom: 4px;">🔄 LIFO vs FIFO</strong>
              <span style="font-size: 0.88rem; color: #37463f;">Lembre-se: Pilhas (Stack) atuam no topo (LIFO) e Filas (Queue) inserem no fim e removem no início (FIFO).</span>
            </div>
            <div style="background: #fdf4ff; border-radius: 12px; padding: 14px; border-left: 4px solid #a855f7;">
              <strong style="color: #6b21a8; display: block; margin-bottom: 4px;">🌳 Trie vs Patricia</strong>
              <span style="font-size: 0.88rem; color: #37463f;">A Patricia é uma Trie compactada: qualquer sequência de nós sem ramificações vira um único nó longo, poupando ponteiros!</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================
     Modo Simulado Rápido
  ========================================================== */
  function startSimulado(numQuestoes = 5) {
    // Escolhe aleatoriamente numQuestoes
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    simuladoState.questions = shuffled.slice(0, Math.min(numQuestoes, QUESTIONS.length));
    simuladoState.currentIndex = 0;
    simuladoState.answers = {};
    simuladoState.correctCount = 0;
    simuladoState.active = true;

    renderSimuladoScreen();
  }

  function renderSimuladoScreen() {
    const container = document.getElementById('simuladoViewArea');
    if (!container) return;

    if (!simuladoState.active) {
      container.innerHTML = `
        <div class="simulado-result-screen">
          <div class="result-trophy">⚡</div>
          <h2 class="result-score-title">Pronto para o Simulado Rápido?</h2>
          <p class="result-score-desc">Teste seus conhecimentos com questões aleatórias selecionadas na hora com pontuação instantânea.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="button-cute primary" id="btnStartSimulado5">Simulado de 5 Questões</button>
            <button type="button" class="button-cute secondary" id="btnStartSimulado10">Simulado de 10 Questões</button>
          </div>
        </div>
      `;

      const b5 = document.getElementById('btnStartSimulado5');
      const b10 = document.getElementById('btnStartSimulado10');
      if (b5) b5.addEventListener('click', () => startSimulado(5));
      if (b10) b10.addEventListener('click', () => startSimulado(10));
      return;
    }

    // Se finalizou
    if (simuladoState.currentIndex >= simuladoState.questions.length) {
      finishSimulado(container);
      return;
    }

    const currentQ = simuladoState.questions[simuladoState.currentIndex];
    const totalQ = simuladoState.questions.length;
    const progressPct = Math.round((simuladoState.currentIndex / totalQ) * 100);
    const catSlug = getCategorySlug(currentQ.categoria);
    const letters = ['A', 'B', 'C', 'D'];

    container.innerHTML = `
      <div class="quiz-mode-container">
        <div class="simulado-header">
          <span class="category-badge badge-${catSlug}">${escapeHtml(currentQ.categoria)}</span>
          <span style="font-weight: 800; font-size: 0.95rem; color: var(--dp-muted);">Questão ${simuladoState.currentIndex + 1} de ${totalQ}</span>
        </div>

        <div class="simulado-progress-bar">
          <div class="simulado-progress-fill" style="width: ${progressPct}%"></div>
        </div>

        <div class="simulado-question-box">
          <h3 class="simulado-question-title">${escapeHtml(currentQ.question)}</h3>
          <div class="simulado-options-grid">
            ${currentQ.options
              .map(
                (opt, i) => `
              <button type="button" class="simulado-option-btn" data-opt="${i}">
                <span class="opt-letter">${letters[i]}</span>
                <span>${escapeHtml(opt)}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="simulado-footer-actions">
          <button type="button" class="button-cute secondary" id="btnCancelSimulado">Sair do simulado</button>
          <span style="font-size: 0.85rem; color: var(--dp-muted);">Selecione uma resposta para avançar</span>
        </div>
      </div>
    `;

    container.querySelectorAll('.simulado-option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const opt = parseInt(e.currentTarget.getAttribute('data-opt'), 10);
        handleSimuladoAnswer(opt);
      });
    });

    const btnCancel = document.getElementById('btnCancelSimulado');
    if (btnCancel) {
      btnCancel.addEventListener('click', () => {
        if (confirm('Deseja realmente sair do simulado? O progresso da rodada não será salvo.')) {
          simuladoState.active = false;
          renderSimuladoScreen();
        }
      });
    }
  }

  function handleSimuladoAnswer(chosenOpt) {
    const currentQ = simuladoState.questions[simuladoState.currentIndex];
    const isCorrect = chosenOpt === currentQ.answer;

    if (isCorrect) {
      simuladoState.correctCount++;
      playSound('correct');
    } else {
      playSound('wrong');
    }

    // Salva também no progresso geral e no PonteiroQuest
    const qId = currentQ.id || 'q-' + QUESTIONS.indexOf(currentQ);
    userProgress[qId] = {
      chosen: chosenOpt,
      correct: isCorrect,
      answeredAt: Date.now(),
    };

    gameState.questionsProgress = userProgress;
    gameState.answered = Math.max((gameState.answered || 0) + 1, Object.keys(userProgress).length);

    if (isCorrect) {
      gameState.correct = (gameState.correct || 0) + 1;
      gameState.combo = (gameState.combo || 0) + 1;
      gameState.bestCombo = Math.max(gameState.bestCombo || 0, gameState.combo);

      const reward = currentQ.reward || 100;
      const xpReward = currentQ.xp || 55;
      gameState.coins = (gameState.coins || 0) + reward;
      gameState.xp = (gameState.xp || 0) + xpReward;
    } else {
      gameState.combo = 0;
    }

    saveGameState();

    simuladoState.currentIndex++;
    renderSimuladoScreen();
  }

  function finishSimulado(container) {
    const total = simuladoState.questions.length;
    const correct = simuladoState.correctCount;
    const pct = Math.round((correct / total) * 100);

    playSound('fanfare');
    launchConfetti();
    updateKPICards();

    let feedbackTitle = 'Sensacional! 🌟';
    let feedbackDesc = 'Você demonstrou excelente domínio das estruturas de dados do Grupo 6!';
    if (pct < 60) {
      feedbackTitle = 'Bom esforço! 📚';
      feedbackDesc = 'Revise os tópicos com menor aproveitamento no Banco de Questões!';
    } else if (pct < 80) {
      feedbackTitle = 'Muito bem! 🚀';
      feedbackDesc = 'Você está no caminho certo para dominar todas as estruturas!';
    }

    container.innerHTML = `
      <div class="quiz-mode-container simulado-result-screen">
        <div class="result-trophy">🏆</div>
        <h2 class="result-score-title">${feedbackTitle}</h2>
        <p class="result-score-desc">${feedbackDesc}</p>

        <div class="result-stats-row">
          <div class="result-stat-pill">
            <span>Acertos</span>
            <strong>${correct} / ${total}</strong>
          </div>
          <div class="result-stat-pill">
            <span>Aproveitamento</span>
            <strong>${pct}%</strong>
          </div>
          <div class="result-stat-pill">
            <span>BrunoCoins Ganhas</span>
            <strong>+${correct * 120} BC</strong>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="button-cute primary" id="btnRestartSimulado">Fazer Outro Simulado</button>
          <button type="button" class="button-cute secondary" id="btnBackToBank">Ir ao Banco de Questões</button>
        </div>
      </div>
    `;

    const bRestart = document.getElementById('btnRestartSimulado');
    if (bRestart) {
      bRestart.addEventListener('click', () => {
        startSimulado(total);
      });
    }

    const bBack = document.getElementById('btnBackToBank');
    if (bBack) {
      bBack.addEventListener('click', () => {
        simuladoState.active = false;
        switchTab('banco');
      });
    }
  }

  /* ==========================================================
     Alternador de Abas
  ========================================================== */
  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabId);
    });

    const bankSec = document.getElementById('tabContentBanco');
    const simuladoSec = document.getElementById('tabContentSimulado');
    const masterySec = document.getElementById('tabContentMaestria');

    if (bankSec) bankSec.style.display = tabId === 'banco' ? 'block' : 'none';
    if (simuladoSec) {
      simuladoSec.style.display = tabId === 'simulado' ? 'block' : 'none';
      if (tabId === 'simulado') renderSimuladoScreen();
    }
    if (masterySec) {
      masterySec.style.display = tabId === 'maestria' ? 'block' : 'none';
      if (tabId === 'maestria') updateKPICards();
    }
  }

  /* ==========================================================
     Toast de Notificação
  ========================================================== */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('cuteToast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('is-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================
     Inicialização dos Eventos
  ========================================================== */
  function init() {
    // 1. Abas
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchTab(btn.getAttribute('data-tab'));
      });
    });

    // 2. Busca com debounce
    const searchInput = document.getElementById('searchQuestions');
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          currentFilters.search = e.target.value;
          renderQuestionsGrid();
        }, 200);
      });
    }

    // 3. Pílulas de Categoria
    document.querySelectorAll('.cat-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        currentFilters.category = pill.getAttribute('data-cat');
        renderQuestionsGrid();
      });
    });

    // 4. Select de Dificuldade
    const selectDiff = document.getElementById('selectDifficulty');
    if (selectDiff) {
      selectDiff.addEventListener('change', (e) => {
        currentFilters.difficulty = e.target.value;
        renderQuestionsGrid();
      });
    }

    // 5. Select de Status
    const selectStatus = document.getElementById('selectStatus');
    if (selectStatus) {
      selectStatus.addEventListener('change', (e) => {
        currentFilters.status = e.target.value;
        renderQuestionsGrid();
      });
    }

    // 6. Botão de Som
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      function updateSoundBtn() {
        btnSound.innerHTML = soundEnabled ? '🔊 Sons: Ligados' : '🔇 Sons: Mudos';
      }
      updateSoundBtn();

      btnSound.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem(SOUND_KEY, soundEnabled);
        updateSoundBtn();
        showToast(soundEnabled ? '🔊 Efeitos sonoros ativados!' : '🔇 Efeitos sonoros desativados!');
      });
    }

    // 7. Botão Limpar Progresso
    const btnReset = document.getElementById('btnResetProgress');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja resetar todo o seu histórico de respostas?')) {
          userProgress = {};
          gameState.questionsProgress = {};
          saveGameState();
          updateKPICards();
          renderQuestionsGrid();
          showToast('🧹 Progresso zerado com sucesso!');
        }
      });
    }

    // 8. Clique no Mascote para trocar frase
    const mascotWrap = document.getElementById('mascotWrapper');
    if (mascotWrap) {
      mascotWrap.addEventListener('click', () => {
        launchConfetti();
        playSound('correct');
        const bubble = document.getElementById('mascotBubbleText');
        if (bubble) {
          const randomPhrase = MASCOT_PHRASES[Math.floor(Math.random() * MASCOT_PHRASES.length)];
          bubble.innerHTML = `<strong>Nóbinho:</strong> ${randomPhrase}`;
        }
      });
    }

    // 9. Sincronização entre abas com o PonteiroQuest
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (updated && typeof updated === 'object') {
            gameState = { ...gameState, ...updated };
            userProgress = gameState.questionsProgress || {};
            updateKPICards();
            renderQuestionsGrid();
          }
        } catch (err) {}
      }
    });

    // Renderização inicial
    updateKPICards();
    renderQuestionsGrid();

    // Sincroniza com servidor (MySQL) se usuário estiver logado
    hidratarComServidor();
  }

  // Executa ao carregar o DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
