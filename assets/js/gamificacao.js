(() => {
  const root = document.querySelector('[data-gamification-root]');
  if (!root) {
    return;
  }

  const STORAGE_KEY = 'grupo6_brunocoins_v1';
  const MAX_UPGRADE = 3;
  const CHEST_DELAY = 6 * 60 * 60 * 1000;
  const QUESTION_TIME_MS = 20000;
  const ABILITY_CHARGE_REGEN_EVERY = 6;
  const SECRET_ITEM_ID = 'camiseta-bruno-secreta';
  const SECRET_CHANCE = 0.1;
  const initialCoins = Number(root.dataset.initialCoins || 350);
  const forceAdminCoins = root.dataset.forceAdminCoins === 'true';
  const isLoggedIn = root.dataset.loggedIn === 'true';
  const apiUrl = root.dataset.apiUrl || null;

  // Moeda BrunoCoin em pseudo-3D: gira sozinha (CSS) e da um giro extra ao clicar/Enter.
  // Decorativo, nao depende do estado do jogo.
  const brunoCoin3d = document.getElementById('brunoCoin3d');
  if (brunoCoin3d) {
    const girar = () => {
      if (brunoCoin3d.classList.contains('is-flipping')) {
        return;
      }
      brunoCoin3d.classList.add('is-flipping');
    };

    brunoCoin3d.addEventListener('click', girar);
    brunoCoin3d.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        girar();
      }
    });
    brunoCoin3d.addEventListener('animationend', (event) => {
      if (event.target.classList.contains('brunocoin-3d__inner')) {
        brunoCoin3d.classList.remove('is-flipping');
      }
    });
  }

  const slots = [
    { id: 'cabeca', label: 'Cabeca' },
    { id: 'tronco', label: 'Tronco' },
    { id: 'pernas', label: 'Pernas' },
    { id: 'acessorio', label: 'Acessorio' },
    { id: 'aura', label: 'Aura' },
    { id: 'conjunto', label: 'Conjunto' },
  ];

  const items = [
    {
      id: 'camiseta-grupo-6',
      name: 'Camiseta Grupo 6',
      slot: 'tronco',
      rarity: 'comum',
      price: 0,
      unlockLevel: 1,
      perk: 'Base equilibrada para comecar os estudos.',
      stats: { coins: 0.02, xp: 0.02, focus: 1 },
      estilo: 'camiseta',
      visual: { torso: '#2f7d5a', accent: '#c4782b' },
    },
    {
      id: 'calca-base-ed',
      name: 'Calca Base ED',
      slot: 'pernas',
      rarity: 'comum',
      price: 0,
      unlockLevel: 1,
      perk: 'Mantem o personagem pronto para qualquer modulo.',
      stats: { focus: 1 },
      estilo: 'calca',
      visual: { legs: '#2e5e8c' },
    },
    {
      id: 'bone-ponteiro-inicial',
      name: 'Bone Ponteiro Inicial',
      slot: 'cabeca',
      rarity: 'comum',
      price: 120,
      unlockLevel: 1,
      perk: 'Ajuda a engatar combos no inicio do treino.',
      stats: { coins: 0.06, xp: 0.03, focus: 1 },
      estilo: 'bone',
      visual: { head: '#274d3c', accent: '#c4782b' },
    },
    {
      id: 'oculos-complexidade-o1',
      name: 'Oculos Complexidade O(1)',
      slot: 'acessorio',
      rarity: 'comum',
      price: 180,
      unlockLevel: 1,
      perk: 'Pequena chance extra de jackpot no desafio.',
      stats: { coins: 0.04, luck: 3, focus: 1 },
      estilo: 'oculos',
      visual: { accent: '#2e5e8c' },
      ability: 'dica',
    },
    {
      id: 'jaqueta-lista-simples',
      name: 'Jaqueta Lista Simples',
      slot: 'tronco',
      rarity: 'raro',
      price: 360,
      unlockLevel: 2,
      perk: 'Recompensa melhor quando voce acerta em sequencia.',
      stats: { coins: 0.12, xp: 0.04, focus: 2 },
      estilo: 'jaqueta',
      visual: { torso: '#245f45', accent: '#e09b4a' },
    },
    {
      id: 'tenis-inserir-inicio',
      name: 'Tenis InserirInicio',
      slot: 'pernas',
      rarity: 'raro',
      price: 420,
      unlockLevel: 2,
      perk: 'Mais foco para desafios de operacoes em listas.',
      stats: { coins: 0.08, xp: 0.05, focus: 3 },
      estilo: 'calca-esportiva',
      visual: { legs: '#254c75', head: '#203b5b' },
    },
    {
      id: 'capuz-recursivo',
      name: 'Capuz Recursivo',
      slot: 'cabeca',
      rarity: 'raro',
      price: 680,
      unlockLevel: 3,
      perk: 'Aumenta XP e deixa evoluir nivel mais rapido.',
      stats: { xp: 0.18, luck: 5, focus: 2 },
      estilo: 'capuz',
      visual: { head: '#4c3d57', accent: '#9b7ac2' },
      ability: 'pular',
    },
    {
      id: 'colete-duplo-encadeado',
      name: 'Colete Duplamente Encadeado',
      slot: 'tronco',
      rarity: 'epico',
      price: 980,
      unlockLevel: 4,
      perk: 'Bons ganhos de BrunoCoins e desconto leve na loja.',
      stats: { coins: 0.22, xp: 0.08, discount: 0.05, focus: 4 },
      estilo: 'colete',
      visual: { torso: '#854f2a', accent: '#2e5e8c' },
      ability: 'eliminar2',
    },
    {
      id: 'botas-percurso-binario',
      name: 'Botas Percurso Binario',
      slot: 'pernas',
      rarity: 'epico',
      price: 1220,
      unlockLevel: 4,
      perk: 'Melhora combo e sorte para bonus dobrado.',
      stats: { coins: 0.16, luck: 8, focus: 5 },
      estilo: 'bota',
      visual: { legs: '#3c4d2e', accent: '#7ea35d' },
    },
    {
      id: 'amuleto-tad',
      name: 'Amuleto TAD',
      slot: 'acessorio',
      rarity: 'epico',
      price: 1560,
      unlockLevel: 5,
      perk: 'Transforma abstracao em bonus de moedas.',
      stats: { coins: 0.2, xp: 0.12, luck: 9, discount: 0.03 },
      estilo: 'amuleto',
      visual: { accent: '#b84a4a' },
      ability: 'dobro',
    },
    {
      id: 'aura-stack-heap',
      name: 'Aura Stack & Heap',
      slot: 'aura',
      rarity: 'epico',
      price: 2100,
      unlockLevel: 5,
      perk: 'Faz o avatar brilhar e multiplica XP.',
      stats: { coins: 0.14, xp: 0.28, luck: 7, focus: 6 },
      estilo: 'aura-brilho',
      visual: { aura: 'rgba(46, 94, 140, 0.24)', accent: '#2e5e8c' },
      ability: 'congelar',
    },
    {
      id: 'kimono-struct-dourado',
      name: 'Kimono Struct Dourado',
      slot: 'tronco',
      rarity: 'lendario',
      price: 3200,
      unlockLevel: 6,
      perk: 'Grande ganho de moedas em acertos perfeitos.',
      stats: { coins: 0.36, xp: 0.16, luck: 12, focus: 8 },
      estilo: 'kimono',
      visual: { torso: '#b8752c', accent: '#23362c' },
      ability: 'segundachance',
    },
    {
      id: 'capa-big-o-lendaria',
      name: 'Capa Big-O Lendaria',
      slot: 'aura',
      rarity: 'lendario',
      price: 4600,
      unlockLevel: 7,
      perk: 'Desconto alto e jackpot mais frequente.',
      stats: { coins: 0.3, xp: 0.18, luck: 16, discount: 0.12, focus: 9 },
      estilo: 'capa',
      visual: { aura: 'rgba(196, 120, 43, 0.3)', accent: '#c4782b' },
      ability: 'recarga',
    },
    {
      id: 'armadura-bruno-infinito',
      name: 'Armadura Bruno Infinito',
      slot: 'conjunto',
      rarity: 'roubada',
      price: 99999,
      unlockLevel: 9,
      overpowered: true,
      perk: 'A roupa mais cara: multiplica moedas absurdamente, protege combo e transforma quase tudo em jackpot.',
      stats: { coins: 7.77, xp: 4.2, luck: 55, discount: 0.08, focus: 50 },
      estilo: 'armadura',
      visual: {
        head: '#101610',
        torso: '#182414',
        legs: '#111827',
        accent: '#f5b341',
        aura: 'rgba(245, 179, 65, 0.34)',
      },
    },
    {
      id: SECRET_ITEM_ID,
      name: 'Camiseta do Bruno',
      slot: 'tronco',
      rarity: 'secreto',
      price: 0,
      unlockLevel: 1,
      hidden: true,
      secretPhoto: true,
      perk: 'So se consegue descobrindo o segredo do professor no quiz.',
      stats: { xp: 0.05, luck: 2, focus: 1 },
      estilo: 'camiseta',
      visual: { torso: '#1c1c1c', accent: '#ffce5c' },
    },
  ];

  // Habilidades ativas destravadas por roupas raras+, usaveis durante o quiz.
  // Itens comuns continuam so com os bonus passivos de sempre (stats acima);
  // isso e uma camada extra, nao substitui o sistema de stats.
  const ABILITIES = {
    dica: { id: 'dica', icon: 'DC', label: 'Dica', desc: 'Elimina 1 alternativa errada.' },
    pular: { id: 'pular', icon: 'PL', label: 'Pular pergunta', desc: 'Troca de pergunta sem penalidade.' },
    eliminar2: { id: 'eliminar2', icon: 'EL', label: 'Eliminacao dupla', desc: 'Elimina 2 alternativas erradas.' },
    dobro: { id: 'dobro', icon: '2X', label: 'Pontos em dobro', desc: 'A proxima resposta certa vale o dobro.' },
    congelar: { id: 'congelar', icon: 'FR', label: 'Congelar tempo', desc: 'Pausa o cronometro da pergunta atual.' },
    segundachance: { id: 'segundachance', icon: 'SC', label: 'Segunda chance', desc: 'Um erro nao vai contar contra voce agora.' },
    recarga: { id: 'recarga', icon: 'RC', label: 'Recarga total', desc: 'Recarrega as outras habilidades na hora.' },
  };

  const SECRET_CHALLENGE = {
    question: 'Pergunta secreta: o que o Bruno mais gosta de fazer?',
    options: ['Lavar o carro', 'Aplicar P5', 'Correr', 'Ficar de feriado'],
    answer: 0,
    reward: 260,
    xp: 90,
    categoria: 'Segredo',
  };

  // Banco de desafios: vem do PHP (App\Models\GamificacaoPerfil::bancoDesafios()),
  // injetado no HTML como JSON. Assim a lista de perguntas tem uma unica fonte
  // (facil de estender com Fila/Pilha/Fila de Prioridades sem tocar neste arquivo).
  const challengesDataEl = document.getElementById('dados-desafios');
  const challenges = challengesDataEl ? JSON.parse(challengesDataEl.textContent) : [];

  const missions = [
    {
      id: 'primeiro-acerto',
      title: 'Primeiro no ligado',
      description: 'Acerte 1 desafio.',
      goal: 1,
      reward: 180,
      progress: (gameState) => gameState.correct,
    },
    {
      id: 'combo-cinco',
      title: 'Combo encadeado',
      description: 'Alcance combo 5.',
      goal: 5,
      reward: 420,
      progress: (gameState) => gameState.bestCombo,
    },
    {
      id: 'colecionador',
      title: 'Guarda-roupa de aluno',
      description: 'Tenha 5 roupas no inventario.',
      goal: 5,
      reward: 520,
      progress: (gameState) => gameState.owned.length,
    },
    {
      id: 'nivel-cinco',
      title: 'Monitor de ED',
      description: 'Chegue ao nivel 5.',
      goal: 5,
      reward: 760,
      progress: () => getLevel(),
    },
    {
      id: 'cofre-cheio',
      title: 'Banco BrunoCoins',
      description: 'Guarde 5000 BrunoCoins.',
      goal: 5000,
      reward: 900,
      progress: (gameState) => gameState.coins,
    },
    {
      id: 'bruno-infinito',
      title: 'Modo roubado liberado',
      description: 'Compre a Armadura Bruno Infinito.',
      goal: 1,
      reward: 7777,
      progress: (gameState) => (gameState.owned.includes('armadura-bruno-infinito') ? 1 : 0),
    },
    {
      id: 'estudante-dedicado',
      title: 'Estudante dedicado',
      description: 'Responda 15 desafios (acertando ou errando).',
      goal: 15,
      reward: 520,
      progress: (gameState) => gameState.answered,
    },
    {
      id: 'comprador-frequente',
      title: 'Comprador frequente',
      description: 'Compre 5 itens na loja.',
      goal: 5,
      reward: 480,
      progress: (gameState) => gameState.purchases,
    },
    {
      id: 'upgrade-master',
      title: 'Upgrade master',
      description: 'Melhore um item ate o nivel maximo (3).',
      goal: MAX_UPGRADE,
      reward: 650,
      progress: (gameState) => Math.max(0, ...Object.values(gameState.upgrades || {})),
    },
    {
      id: 'maratona-ed',
      title: 'Maratona de ED',
      description: 'Responda 30 desafios no total.',
      goal: 30,
      reward: 900,
      progress: (gameState) => gameState.answered,
    },
    {
      id: 'milionario',
      title: 'Milionario BrunoCoins',
      description: 'Guarde 50000 BrunoCoins.',
      goal: 50000,
      reward: 1500,
      progress: (gameState) => gameState.coins,
    },
  ];

  // Colecao de emblemas: diferente das missoes, nao tem botao de "receber" —
  // desbloqueia sozinho quando a condicao passa a ser verdadeira (derivado do
  // estado atual, nao precisa guardar nada novo). E' só reconhecimento/colecao.
  const badges = [
    {
      id: 'recruta',
      tier: 'bronze',
      name: 'Recruta de ED',
      description: 'Jogou pela primeira vez.',
      icon: '01',
      condition: () => true,
    },
    {
      id: 'combo-5',
      tier: 'bronze',
      name: 'Sequencia Encadeada',
      description: 'Alcance combo 5.',
      icon: '05',
      condition: (gameState) => gameState.bestCombo >= 5,
    },
    {
      id: 'combo-10',
      tier: 'prata',
      name: 'Combo Perfeito',
      description: 'Alcance combo 10.',
      icon: '10',
      condition: (gameState) => gameState.bestCombo >= 10,
    },
    {
      id: 'acertos-20',
      tier: 'bronze',
      name: 'Gabaritando',
      description: 'Acumule 20 respostas certas.',
      icon: 'OK',
      condition: (gameState) => gameState.correct >= 20,
    },
    {
      id: 'nivel-5',
      tier: 'prata',
      name: 'Monitor de ED',
      description: 'Chegue ao nivel 5.',
      icon: 'N5',
      condition: () => getLevel() >= 5,
    },
    {
      id: 'nivel-10',
      tier: 'ouro',
      name: 'Mestre de ED',
      description: 'Chegue ao nivel 10.',
      icon: 'N10',
      condition: () => getLevel() >= 10,
    },
    {
      id: 'colecionador-8',
      tier: 'prata',
      name: 'Guarda-roupa Cheio',
      description: 'Tenha 8 itens no inventario.',
      icon: '08',
      condition: (gameState) => gameState.owned.length >= 8,
    },
    {
      id: 'guarda-roupa-completo',
      tier: 'ouro',
      name: 'Colecao Completa',
      description: 'Tenha todos os itens da loja.',
      icon: 'ALL',
      condition: (gameState) => gameState.owned.length >= items.filter((item) => !item.hidden).length,
    },
    {
      id: 'lendario',
      tier: 'ouro',
      name: 'Toque Lendario',
      description: 'Possua um item Lendario.',
      icon: 'LG',
      condition: (gameState) => gameState.owned.some((id) => getItem(id)?.rarity === 'lendario'),
    },
    {
      id: 'todas-missoes',
      tier: 'ouro',
      name: 'Cumpridor de Contratos',
      description: 'Receba a recompensa de todas as missoes.',
      icon: 'ALL',
      condition: (gameState) => gameState.claimedMissions.length >= missions.length,
    },
    {
      id: 'secreto-roubado',
      tier: 'secreto',
      name: '???',
      description: 'Emblema secreto. Descubra jogando.',
      icon: '?',
      condition: (gameState) => gameState.owned.includes('armadura-bruno-infinito'),
    },
    {
      id: 'segredo-bruno',
      tier: 'secreto',
      name: '???',
      description: 'Emblema secreto. Descubra jogando.',
      icon: 'BR',
      condition: (gameState) => gameState.owned.includes(SECRET_ITEM_ID),
    },
  ];

  const elements = {
    coinBalance: document.getElementById('coinBalance'),
    playerLevel: document.getElementById('playerLevel'),
    comboCount: document.getElementById('comboCount'),
    xpBarFill: document.getElementById('xpBarFill'),
    coinMultiplier: document.getElementById('coinMultiplier'),
    xpMultiplier: document.getElementById('xpMultiplier'),
    luckStat: document.getElementById('luckStat'),
    focusStat: document.getElementById('focusStat'),
    correctCount: document.getElementById('correctCount'),
    answeredCount: document.getElementById('answeredCount'),
    bestCombo: document.getElementById('bestCombo'),
    challengeReward: document.getElementById('challengeReward'),
    challengeCategory: document.getElementById('challengeCategory'),
    challengeQuestion: document.getElementById('challengeQuestion'),
    challengeOptions: document.getElementById('challengeOptions'),
    timerFill: document.getElementById('timerFill'),
    timerBar: document.getElementById('timerBar'),
    abilityGrid: document.getElementById('abilityGrid'),
    quizStartScreen: document.getElementById('quizStartScreen'),
    quizPlayArea: document.getElementById('quizPlayArea'),
    quizActions: document.getElementById('quizActions'),
    startQuiz: document.getElementById('startQuiz'),
    nextChallenge: document.getElementById('nextChallenge'),
    claimChest: document.getElementById('claimChest'),
    gameMessage: document.getElementById('gameMessage'),
    shopGrid: document.getElementById('shopGrid'),
    shopFilters: document.getElementById('shopFilters'),
    missionGrid: document.getElementById('missionGrid'),
    badgeGrid: document.getElementById('badgeGrid'),
    inventoryList: document.getElementById('inventoryList'),
    equippedSlots: document.getElementById('equippedSlots'),
    avatar: document.getElementById('characterAvatar'),
    resetProgress: document.getElementById('resetProgress'),
  };

  let activeFilter = 'todos';
  let state = loadState();
  let questionEffects = { eliminated: [], doublePoints: false, shielded: false };
  let isSecretChallengeActive = false;
  let timerInterval = null;
  let timerStartedAt = 0;
  let timerFrozen = false;

  function freshState() {
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
      challengeIndex: randomChallengeIndex(),
      answeredCurrent: false,
      lastAnswer: null,
      abilityCharges: {},
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== 'object') {
        return freshState();
      }

      const base = freshState();
      const merged = {
        ...base,
        ...saved,
        equipped: { ...base.equipped, ...(saved.equipped || {}) },
        upgrades: { ...(saved.upgrades || {}) },
        owned: Array.isArray(saved.owned) ? saved.owned : base.owned,
        claimedMissions: Array.isArray(saved.claimedMissions) ? saved.claimedMissions : [],
        abilityCharges: { ...(saved.abilityCharges || {}) },
      };

      merged.owned = Array.from(new Set([...base.owned, ...merged.owned]));
      if (!Number.isInteger(merged.challengeIndex) || !challenges[merged.challengeIndex]) {
        merged.challengeIndex = randomChallengeIndex();
      }

      if (forceAdminCoins) {
        merged.coins = Math.max(merged.coins, initialCoins);
      }

      return merged;
    } catch (error) {
      return freshState();
    }
  }

  function saveState() {
    if (forceAdminCoins) {
      state.coins = Math.max(state.coins, initialCoins);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    agendarSincronizacaoServidor();
  }

  // Sincronizacao com o backend (api/gamificacao.php -> GamificacaoController -> GamificacaoPerfil).
  // So roda para usuario logado. O localStorage continua sendo a copia instantanea/local
  // (visitante e fallback offline); o servidor e' o que amarra o progresso ao perfil do usuario.
  let idAgendamentoSincronizacao = null;

  function agendarSincronizacaoServidor() {
    if (!isLoggedIn || !apiUrl) {
      return;
    }

    window.clearTimeout(idAgendamentoSincronizacao);
    idAgendamentoSincronizacao = window.setTimeout(() => {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      }).catch(() => {
        // Sem conexao: o progresso continua seguro no localStorage deste navegador.
      });
    }, 500);
  }

  function hidratarComServidor() {
    if (!isLoggedIn || !apiUrl) {
      return;
    }

    fetch(apiUrl)
      .then((resposta) => (resposta.ok ? resposta.json() : null))
      .then((estadoServidor) => {
        if (!estadoServidor || estadoServidor.erro) {
          return;
        }

        state = {
          ...state,
          ...estadoServidor,
          equipped: { ...state.equipped, ...(estadoServidor.equipped || {}) },
          owned: Array.isArray(estadoServidor.owned)
            ? Array.from(new Set([...state.owned, ...estadoServidor.owned]))
            : state.owned,
          claimedMissions: Array.isArray(estadoServidor.claimedMissions)
            ? estadoServidor.claimedMissions
            : state.claimedMissions,
        };

        if (!Number.isInteger(state.challengeIndex) || !challenges[state.challengeIndex]) {
          state.challengeIndex = randomChallengeIndex();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        renderAll();
      })
      .catch(() => {
        // Sem conexao com a API: continua com o que ja foi carregado do localStorage.
      });
  }

  function getLevel() {
    return Math.max(1, Math.floor(state.xp / 420) + 1);
  }

  function randomChallengeIndex() {
    return Math.floor(Math.random() * challenges.length);
  }

  function getCurrentChallenge() {
    return isSecretChallengeActive ? SECRET_CHALLENGE : challenges[state.challengeIndex];
  }

  function getItem(itemId) {
    return items.find((item) => item.id === itemId);
  }

  function isOwned(itemId) {
    return state.owned.includes(itemId);
  }

  function isEquipped(item) {
    return state.equipped[item.slot] === item.id;
  }

  function getUpgradeLevel(itemId) {
    return Math.min(MAX_UPGRADE, Number(state.upgrades[itemId] || 0));
  }

  function getUpgradedStats(item) {
    const level = getUpgradeLevel(item.id);
    const factor = 1 + level * 0.22;
    return Object.entries(item.stats || {}).reduce((accumulator, [key, value]) => {
      const discountFactor = key === 'discount' ? 1 + level * 0.08 : factor;
      accumulator[key] = value * discountFactor;
      return accumulator;
    }, {});
  }

  function getEquippedItems() {
    return Object.values(state.equipped)
      .map(getItem)
      .filter(Boolean);
  }

  function getTotals() {
    const totals = {
      coinMultiplier: 1,
      xpMultiplier: 1,
      luck: 0,
      focus: 0,
      discount: 0,
      comboMultiplier: 1 + Math.min(state.combo, 12) * 0.04,
      overpowered: false,
    };

    getEquippedItems().forEach((item) => {
      const stats = getUpgradedStats(item);
      totals.coinMultiplier += stats.coins || 0;
      totals.xpMultiplier += stats.xp || 0;
      totals.luck += stats.luck || 0;
      totals.focus += stats.focus || 0;
      totals.discount += stats.discount || 0;
      totals.overpowered = totals.overpowered || Boolean(item.overpowered);
    });

    totals.discount = Math.min(totals.discount, 0.45);
    totals.luck = Math.min(totals.luck, totals.overpowered ? 92 : 42);
    return totals;
  }

  // === Habilidades ativas (P2): itens raro+ destravam 1 habilidade cada, usavel
  // durante o quiz, com cargas limitadas que recarregam jogando. A Armadura
  // Bruno Infinito (overpowered) da acesso a todas, uso ilimitado. ===
  function getActiveAbilities() {
    const totals = getTotals();

    if (totals.overpowered) {
      const armadura = getEquippedItems().find((item) => item.overpowered);
      return Object.keys(ABILITIES).map((id) => ({ id, unlimited: true, sourceItem: armadura }));
    }

    return getEquippedItems()
      .filter((item) => item.ability)
      .map((item) => ({ id: item.ability, unlimited: false, sourceItem: item }));
  }

  function getAbilityMaxCharges(sourceItem) {
    return 1 + getUpgradeLevel(sourceItem.id);
  }

  function ensureAbilityCharges() {
    getActiveAbilities().forEach(({ id, unlimited, sourceItem }) => {
      if (!unlimited && !(id in state.abilityCharges)) {
        state.abilityCharges[id] = getAbilityMaxCharges(sourceItem);
      }
    });
  }

  function getAbilityCharges(abilityId) {
    return Math.max(0, Number(state.abilityCharges[abilityId] || 0));
  }

  function consumeAbilityCharge(abilityId, unlimited) {
    if (unlimited) {
      return true;
    }

    const current = getAbilityCharges(abilityId);
    if (current <= 0) {
      return false;
    }

    state.abilityCharges[abilityId] = current - 1;
    return true;
  }

  function regenAbilityCharges() {
    getActiveAbilities().forEach(({ id, unlimited, sourceItem }) => {
      if (unlimited) {
        return;
      }

      const max = getAbilityMaxCharges(sourceItem);
      state.abilityCharges[id] = Math.min(max, getAbilityCharges(id) + 1);
    });
  }

  function remainingWrongOptions(challenge) {
    return challenge.options
      .map((_, index) => index)
      .filter((index) => index !== challenge.answer && !questionEffects.eliminated.includes(index));
  }

  function eliminateWrongOptions(count) {
    const challenge = getCurrentChallenge();
    const pool = remainingWrongOptions(challenge);
    for (let taken = 0; taken < count && pool.length > 0; taken += 1) {
      const pickIndex = Math.floor(Math.random() * pool.length);
      questionEffects.eliminated.push(pool.splice(pickIndex, 1)[0]);
    }
  }

  function isAbilityBlocked(abilityId) {
    if (state.answeredCurrent) {
      return true;
    }

    if (abilityId === 'dobro') {
      return questionEffects.doublePoints;
    }

    if (abilityId === 'segundachance') {
      return questionEffects.shielded;
    }

    if (abilityId === 'congelar') {
      return timerFrozen;
    }

    if (abilityId === 'dica' || abilityId === 'eliminar2') {
      return remainingWrongOptions(getCurrentChallenge()).length === 0;
    }

    return false;
  }

  function useAbility(abilityId) {
    const active = getActiveAbilities().find((entry) => entry.id === abilityId);
    if (!active || isAbilityBlocked(abilityId)) {
      return;
    }

    if (!consumeAbilityCharge(abilityId, active.unlimited)) {
      showMessage('Sem cargas dessa habilidade agora. Acerte mais desafios para recarregar.');
      renderAbilities();
      return;
    }

    const ability = ABILITIES[abilityId];

    switch (abilityId) {
      case 'dica':
        eliminateWrongOptions(1);
        showMessage('Dica usada: 1 alternativa errada eliminada.');
        break;
      case 'eliminar2':
        eliminateWrongOptions(2);
        showMessage('Eliminacao dupla usada: 2 alternativas erradas sumiram.');
        break;
      case 'dobro':
        questionEffects.doublePoints = true;
        showMessage('Pontos em dobro ativado para a proxima resposta certa.');
        break;
      case 'congelar':
        freezeTimer();
        showMessage('Cronometro congelado nesta pergunta.');
        break;
      case 'segundachance':
        questionEffects.shielded = true;
        showMessage('Escudo ativo: essa resposta esta protegida.');
        break;
      case 'recarga':
        regenAbilityChargesExcept('recarga');
        showMessage('Recarga total: as outras habilidades foram recarregadas.');
        break;
      case 'pular':
        showMessage('Pergunta pulada com a habilidade.');
        nextChallenge({ silent: true });
        break;
      default:
        break;
    }

    if (abilityId !== 'pular') {
      saveState();
      renderAll();
    }
  }

  function regenAbilityChargesExcept(excludeId) {
    getActiveAbilities().forEach(({ id, unlimited, sourceItem }) => {
      if (unlimited || id === excludeId) {
        return;
      }

      state.abilityCharges[id] = getAbilityMaxCharges(sourceItem);
    });
  }

  // === Cronometro visual do desafio (bonus de velocidade, sem punir quem estoura o tempo) ===
  function startTimer() {
    window.clearInterval(timerInterval);
    timerStartedAt = Date.now();
    timerFrozen = false;

    if (elements.timerBar) {
      elements.timerBar.classList.remove('is-frozen');
    }

    updateTimerUI(0);
    timerInterval = window.setInterval(tickTimer, 200);
  }

  function tickTimer() {
    if (timerFrozen || state.answeredCurrent) {
      return;
    }

    const elapsed = Date.now() - timerStartedAt;
    updateTimerUI(elapsed);

    if (elapsed >= QUESTION_TIME_MS) {
      window.clearInterval(timerInterval);
    }
  }

  function updateTimerUI(elapsed) {
    if (!elements.timerFill) {
      return;
    }

    const percent = Math.max(0, 100 - (elapsed / QUESTION_TIME_MS) * 100);
    elements.timerFill.style.width = `${percent}%`;
  }

  function freezeTimer() {
    timerFrozen = true;
    if (elements.timerBar) {
      elements.timerBar.classList.add('is-frozen');
    }
  }

  function getSpeedBonus() {
    const elapsed = Date.now() - timerStartedAt;
    if (elapsed < QUESTION_TIME_MS * 0.4) {
      return 25;
    }
    if (elapsed < QUESTION_TIME_MS * 0.75) {
      return 10;
    }
    return 0;
  }

  function unlockSecretSkin() {
    if (isOwned(SECRET_ITEM_ID)) {
      return;
    }

    state.owned.push(SECRET_ITEM_ID);
    state.equipped.tronco = SECRET_ITEM_ID;
    showMessage('Segredo descoberto! Camiseta exclusiva do Bruno desbloqueada e equipada.');
    celebrateAvatar();
  }

  function getDiscountedPrice(item) {
    if (item.price === 0) {
      return 0;
    }

    const totals = getTotals();
    const discountCap = item.overpowered ? 0.08 : 0.45;
    const discount = Math.min(totals.discount, discountCap);
    return Math.max(1, Math.ceil(item.price * (1 - discount)));
  }

  function getUpgradeCost(item) {
    const currentLevel = getUpgradeLevel(item.id);
    if (currentLevel >= MAX_UPGRADE) {
      return 0;
    }

    const base = item.price > 0 ? item.price : 180;
    return Math.ceil(base * (0.38 + currentLevel * 0.26));
  }

  function formatCoins(value) {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, Math.round(value)));
  }

  function formatMultiplier(value) {
    return `${value.toFixed(2)}x`;
  }

  function formatPercent(value) {
    return `${Math.round(value * 100)}%`;
  }

  function showMessage(message) {
    elements.gameMessage.textContent = message;
  }

  function celebrateAvatar() {
    if (window.Avatar3D) {
      window.Avatar3D.celebrar();
    }
  }

  function addCoins(baseAmount, reason, options = {}) {
    const totals = getTotals();
    const comboMultiplier = options.ignoreCombo ? 1 : totals.comboMultiplier;
    const lucky = !options.noJackpot && Math.random() * 100 < totals.luck;
    const jackpotMultiplier = lucky ? (totals.overpowered ? 3 : 2) : 1;
    const earned = Math.max(1, Math.round(baseAmount * totals.coinMultiplier * comboMultiplier * jackpotMultiplier));

    state.coins += earned;
    if (options.xp) {
      state.xp += Math.round(options.xp * totals.xpMultiplier);
    }

    showMessage(`${reason}: +${formatCoins(earned)} BrunoCoins${lucky ? ' com jackpot' : ''}.`);
    celebrateAvatar();
    saveState();
    renderAll();
  }

  function answerChallenge(optionIndex) {
    if (state.answeredCurrent) {
      return;
    }

    const challenge = getCurrentChallenge();
    const correct = optionIndex === challenge.answer;

    if (isSecretChallengeActive) {
      state.answeredCurrent = true;
      state.lastAnswer = { selected: optionIndex, answer: challenge.answer, accepted: correct, savedByArmor: false };
      window.clearInterval(timerInterval);

      if (correct) {
        unlockSecretSkin();
      } else {
        showMessage('Quase! O Bruno ama mesmo e lavar o carro dele. Continue jogando.');
      }

      saveState();
      renderAll();
      return;
    }

    const totals = getTotals();
    const savedByArmor = !correct && totals.overpowered && state.combo >= 2;
    const savedByShield = !correct && questionEffects.shielded;
    const accepted = correct || savedByArmor || savedByShield;

    state.answered += 1;
    state.answeredCurrent = true;
    state.lastAnswer = {
      selected: optionIndex,
      answer: challenge.answer,
      accepted,
      savedByArmor: savedByArmor || savedByShield,
    };
    window.clearInterval(timerInterval);

    if (accepted) {
      state.correct += 1;
      state.combo += 1;
      state.bestCombo = Math.max(state.bestCombo, state.combo);

      if (state.correct % ABILITY_CHARGE_REGEN_EVERY === 0) {
        regenAbilityCharges();
      }

      const speedBonus = getSpeedBonus();
      let rewardBase = challenge.reward + totals.focus * 2 + speedBonus;
      if (questionEffects.doublePoints) {
        rewardBase *= 2;
      }

      const reason = savedByShield ? 'Escudo protegeu a resposta' : savedByArmor ? 'A armadura salvou o combo' : 'Resposta correta';
      addCoins(rewardBase, reason, { xp: challenge.xp });
      return;
    }

    state.combo = 0;
    state.coins = Math.max(0, state.coins - 5);
    showMessage('Resposta incorreta. O combo zerou e voce perdeu 5 BrunoCoins.');
    saveState();
    renderAll();
  }

  function nextChallenge(options = {}) {
    questionEffects = { eliminated: [], doublePoints: false, shielded: false };

    const canRollSecret = !isOwned(SECRET_ITEM_ID);
    isSecretChallengeActive = canRollSecret && Math.random() < SECRET_CHANCE;

    if (!isSecretChallengeActive) {
      let nextIndex = randomChallengeIndex();
      if (challenges.length > 1) {
        while (nextIndex === state.challengeIndex) {
          nextIndex = randomChallengeIndex();
        }
      }
      state.challengeIndex = nextIndex;
    }

    state.answeredCurrent = false;
    state.lastAnswer = null;
    saveState();
    renderChallenge();
    renderAbilities();
    startTimer();

    if (!options.silent) {
      showMessage(isSecretChallengeActive ? 'Uma pergunta misteriosa apareceu...' : 'Novo desafio carregado.');
    }
  }

  function buyItem(itemId) {
    const item = getItem(itemId);
    if (!item || isOwned(item.id)) {
      return;
    }

    if (getLevel() < item.unlockLevel) {
      showMessage(`Este item libera no nivel ${item.unlockLevel}.`);
      return;
    }

    const price = getDiscountedPrice(item);
    if (state.coins < price) {
      showMessage(`Faltam ${formatCoins(price - state.coins)} BrunoCoins para comprar ${item.name}.`);
      return;
    }

    state.coins -= price;
    state.owned.push(item.id);
    state.purchases += 1;
    state.equipped[item.slot] = item.id;
    state.xp += item.overpowered ? 1000 : 90;
    showMessage(`${item.name} comprado e equipado.`);
    celebrateAvatar();
    saveState();
    renderAll();
  }

  function equipItem(itemId) {
    const item = getItem(itemId);
    if (!item || !isOwned(item.id)) {
      return;
    }

    state.equipped[item.slot] = item.id;
    showMessage(`${item.name} equipado.`);
    celebrateAvatar();
    saveState();
    renderAll();
  }

  function unequipItem(itemId) {
    const item = getItem(itemId);
    if (!item || state.equipped[item.slot] !== item.id) {
      return;
    }

    delete state.equipped[item.slot];
    showMessage(`${item.name} removido do personagem.`);
    saveState();
    renderAll();
  }

  function upgradeItem(itemId) {
    const item = getItem(itemId);
    if (!item || !isOwned(item.id)) {
      return;
    }

    const currentLevel = getUpgradeLevel(item.id);
    if (currentLevel >= MAX_UPGRADE) {
      showMessage(`${item.name} ja esta no nivel maximo.`);
      return;
    }

    const cost = getUpgradeCost(item);
    if (state.coins < cost) {
      showMessage(`Faltam ${formatCoins(cost - state.coins)} BrunoCoins para melhorar ${item.name}.`);
      return;
    }

    state.coins -= cost;
    state.upgrades[item.id] = currentLevel + 1;
    state.xp += 120;
    showMessage(`${item.name} melhorado para o nivel ${currentLevel + 1}.`);
    celebrateAvatar();
    saveState();
    renderAll();
  }

  function claimMission(missionId) {
    const mission = missions.find((entry) => entry.id === missionId);
    if (!mission || state.claimedMissions.includes(mission.id)) {
      return;
    }

    const progress = mission.progress(state);
    if (progress < mission.goal) {
      showMessage('Essa missao ainda nao foi concluida.');
      return;
    }

    state.claimedMissions.push(mission.id);
    state.coins += mission.reward;
    state.xp += 160;
    showMessage(`Missao concluida: +${formatCoins(mission.reward)} BrunoCoins.`);
    celebrateAvatar();
    saveState();
    renderAll();
  }

  function claimChest() {
    const now = Date.now();
    if (now < state.chestReadyAt) {
      showMessage(`O cofre ainda esta recarregando: ${formatRemaining(state.chestReadyAt - now)}.`);
      return;
    }

    state.chestReadyAt = now + CHEST_DELAY;
    addCoins(240, 'Cofre aberto', { xp: 45, ignoreCombo: true });
  }

  function resetProgress() {
    const confirmed = window.confirm('Resetar BrunoCoins, roupas, missoes e progresso salvos neste navegador?');
    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    state = freshState();
    showMessage('Progresso local resetado.');
    saveState();
    renderAll();
  }

  function renderAll() {
    renderHud();
    renderChallenge();
    renderAbilities();
    renderEquippedSlots();
    renderAvatar();
    renderShop();
    renderMissions();
    renderBadges();
    renderInventory();
    renderChestLabel();
  }

  function renderHud() {
    const totals = getTotals();
    elements.coinBalance.textContent = formatCoins(state.coins);
    elements.playerLevel.textContent = getLevel();
    elements.comboCount.textContent = state.combo;
    elements.coinMultiplier.textContent = formatMultiplier(totals.coinMultiplier * totals.comboMultiplier);
    elements.xpMultiplier.textContent = formatMultiplier(totals.xpMultiplier);
    elements.luckStat.textContent = `${Math.round(totals.luck)}%`;
    elements.focusStat.textContent = Math.round(totals.focus);
    elements.correctCount.textContent = state.correct;
    elements.answeredCount.textContent = state.answered;
    elements.bestCombo.textContent = state.bestCombo;

    if (elements.xpBarFill) {
      const xpIntoLevel = state.xp % 420;
      elements.xpBarFill.style.width = `${Math.round((xpIntoLevel / 420) * 100)}%`;
    }
  }

  function renderChallenge() {
    const challenge = getCurrentChallenge();
    elements.challengeReward.textContent = `Recompensa base: ${formatCoins(challenge.reward)} BrunoCoins`;
    elements.challengeQuestion.textContent = challenge.question;

    if (elements.challengeCategory) {
      elements.challengeCategory.textContent = challenge.categoria || 'ED';
      elements.challengeCategory.classList.toggle('is-secret', isSecretChallengeActive);
    }

    elements.challengeOptions.innerHTML = challenge.options.map((option, index) => {
      if (questionEffects.eliminated.includes(index)) {
        return '';
      }

      const answerState = getAnswerClass(index);
      return `
        <button
          class="option-button ${answerState}"
          type="button"
          data-answer="${index}"
          ${state.answeredCurrent ? 'disabled' : ''}
        >${option}</button>
      `;
    }).join('');
  }

  function renderAbilities() {
    if (!elements.abilityGrid) {
      return;
    }

    ensureAbilityCharges();
    const active = getActiveAbilities();

    if (!active.length) {
      elements.abilityGrid.innerHTML = '<p class="ability-empty">Equipe roupas raras ou melhores pra destravar habilidades ativas de quiz.</p>';
      return;
    }

    elements.abilityGrid.innerHTML = active.map(({ id, unlimited, sourceItem }) => {
      const ability = ABILITIES[id];
      const charges = unlimited ? '∞' : getAbilityCharges(id);
      const blocked = isAbilityBlocked(id) || (!unlimited && getAbilityCharges(id) <= 0);

      return `
        <article class="ability-card ${blocked ? 'is-disabled' : ''}">
          <span class="ability-card__icon" aria-hidden="true">${ability.icon}</span>
          <div class="ability-card__body">
            <h4>${ability.label} <span class="ability-charges">${charges}</span></h4>
            <p>${ability.desc}</p>
            <span class="ability-source">via ${sourceItem ? sourceItem.name : '?'}</span>
          </div>
          <button type="button" data-ability="${id}" ${blocked ? 'disabled' : ''}>Usar</button>
        </article>
      `;
    }).join('');
  }

  function getAnswerClass(index) {
    if (!state.answeredCurrent || !state.lastAnswer) {
      return '';
    }

    if (index === state.lastAnswer.answer) {
      return 'is-correct';
    }

    if (index === state.lastAnswer.selected && !state.lastAnswer.accepted) {
      return 'is-wrong';
    }

    return '';
  }

  function renderEquippedSlots() {
    elements.equippedSlots.innerHTML = slots.map((slot) => {
      const item = getItem(state.equipped[slot.id]);
      const accent = item ? (item.visual.accent || item.visual.torso || '#3fe08c') : 'transparent';
      return `
        <div class="equipment-slot ${item ? '' : 'is-empty'}" style="--slot-accent:${accent}">
          <span class="slot-label">${slot.label}</span>
          <span class="slot-value">${item ? item.name : 'Vazio'}</span>
        </div>
      `;
    }).join('');
  }

  function renderAvatar() {
    const visual = {
      head: '#27312c',
      torso: '#2f7d5a',
      legs: '#2e5e8c',
      accent: '#c4782b',
      aura: 'rgba(47, 125, 90, 0.18)',
    };

    getEquippedItems().forEach((item) => {
      Object.assign(visual, item.visual || {});
    });

    if (window.Avatar3D) {
      window.Avatar3D.atualizar(visual, {
        temAcessorio: Boolean(state.equipped.acessorio),
        temAura: Boolean(state.equipped.aura),
        overpowered: getTotals().overpowered,
        temSkinSecreta: state.equipped.tronco === SECRET_ITEM_ID,
        estiloCabeca: getItem(state.equipped.cabeca)?.estilo || 'nenhum',
        estiloTronco: getItem(state.equipped.tronco)?.estilo || 'camiseta',
        estiloPernas: getItem(state.equipped.pernas)?.estilo || 'calca',
        estiloAcessorio: getItem(state.equipped.acessorio)?.estilo || 'nenhum',
        estiloAura: getItem(state.equipped.aura)?.estilo || 'nenhum',
      });
    }
  }

  function renderShop() {
    const level = getLevel();
    const visibleItems = items
      .filter((item) => !item.hidden)
      .filter((item) => activeFilter === 'todos' || item.slot === activeFilter);

    elements.shopGrid.innerHTML = visibleItems.map((item) => {
      const owned = isOwned(item.id);
      const equipped = isEquipped(item);
      const price = getDiscountedPrice(item);
      const upgradeLevel = getUpgradeLevel(item.id);
      const upgradeCost = getUpgradeCost(item);
      const locked = level < item.unlockLevel;
      const cardClass = [
        'shop-card',
        `rarity-${item.rarity}`,
        owned ? 'is-owned' : '',
        equipped ? 'is-equipped' : '',
        item.overpowered ? 'is-overpowered' : '',
      ].filter(Boolean).join(' ');

      return `
        <article class="${cardClass}" style="${getPreviewVars(item)}">
          <div class="item-preview" aria-hidden="true">${renderItemCube(item)}</div>
          <div class="item-topline">
            <h3>${item.name}</h3>
            <span class="rarity-badge">${item.rarity}</span>
          </div>
          <div class="item-meta">
            <span>${slotLabel(item.slot)}</span>
            <span>${locked ? `Nivel ${item.unlockLevel}` : `${formatCoins(price)} BC`}</span>
            <span>Upgrade ${upgradeLevel}/${MAX_UPGRADE}</span>
          </div>
          <p class="item-perk">${item.perk}</p>
          <div class="stat-list">${renderStatPills(item)}</div>
          <div class="card-actions">
            ${renderShopActions(item, { owned, equipped, locked, price, upgradeLevel, upgradeCost })}
          </div>
        </article>
      `;
    }).join('');
  }

  // Itens com modelo 3D real (glTF baixado do Poly Pizza, ver assets/models/ e
  // os creditos no rodape) usam o preview giratorio de verdade; os demais
  // continuam com o cubo generico em CSS (fallback automatico e sem quebra).
  const MODEL_PREVIEWS = {
    'bone-ponteiro-inicial': 'bone',
    'oculos-complexidade-o1': 'oculos',
    'jaqueta-lista-simples': 'jaqueta',
    'tenis-inserir-inicio': 'tenis',
    'botas-percurso-binario': 'bota',
    'amuleto-tad': 'amuleto',
    'capa-big-o-lendaria': 'capa',
    'armadura-bruno-infinito': 'armadura',
    'camiseta-grupo-6': 'camiseta',
    'camiseta-bruno-secreta': 'camiseta',
  };

  // O modelo baixado vem com as proprias cores/estampa; repintamos com a cor
  // do item (por slot) pra cada card ficar coerente com o resto do visual.
  function corDoModelo(item) {
    const v = item.visual || {};
    if (item.slot === 'cabeca') {
      return v.head || v.accent;
    }
    if (item.slot === 'pernas') {
      return v.legs || v.accent;
    }
    if (item.slot === 'tronco' || item.slot === 'conjunto') {
      return v.torso || v.accent;
    }
    return v.accent || v.torso;
  }

  function renderItemCube(item) {
    const modelKey = MODEL_PREVIEWS[item.id];
    if (modelKey) {
      const cor = corDoModelo(item) || '#3fe08c';
      return `<div class="item-model-preview" data-model-preview="${modelKey}" data-model-color="${cor}" aria-hidden="true"></div>`;
    }

    return `
      <div class="item-cube">
        <span class="item-cube__face item-cube__face--front"></span>
        <span class="item-cube__face item-cube__face--back"></span>
        <span class="item-cube__face item-cube__face--right"></span>
        <span class="item-cube__face item-cube__face--left"></span>
        <span class="item-cube__face item-cube__face--top"></span>
        <span class="item-cube__face item-cube__face--bottom"></span>
      </div>
    `;
  }

  function getPreviewVars(item) {
    const visual = {
      head: item.visual.head || '#27312c',
      torso: item.visual.torso || '#2f7d5a',
      legs: item.visual.legs || '#2e5e8c',
      accent: item.visual.accent || '#c4782b',
    };

    return [
      `--preview-head:${visual.head}`,
      `--preview-torso:${visual.torso}`,
      `--preview-legs:${visual.legs}`,
      `--preview-accent:${visual.accent}`,
    ].join(';');
  }

  function renderShopActions(item, context) {
    if (!context.owned) {
      const disabled = context.locked || state.coins < context.price;
      return `
        <button class="wide-action" type="button" data-action="buy" data-item="${item.id}" ${disabled ? 'disabled' : ''}>
          ${context.locked ? 'Bloqueado' : 'Comprar'}
        </button>
      `;
    }

    return `
      <button type="button" data-action="equip" data-item="${item.id}" ${context.equipped ? 'disabled' : ''}>
        ${context.equipped ? 'Equipado' : 'Equipar'}
      </button>
      <button type="button" data-action="upgrade" data-item="${item.id}" ${context.upgradeLevel >= MAX_UPGRADE || state.coins < context.upgradeCost ? 'disabled' : ''}>
        ${context.upgradeLevel >= MAX_UPGRADE ? 'Maximo' : `Melhorar ${formatCoins(context.upgradeCost)}`}
      </button>
    `;
  }

  function renderStatPills(item) {
    const stats = getUpgradedStats(item);
    const pills = [];

    if (stats.coins) {
      pills.push(`+${formatPercent(stats.coins)} BrunoCoins`);
    }

    if (stats.xp) {
      pills.push(`+${formatPercent(stats.xp)} XP`);
    }

    if (stats.luck) {
      pills.push(`+${Math.round(stats.luck)}% sorte`);
    }

    if (stats.focus) {
      pills.push(`+${Math.round(stats.focus)} foco`);
    }

    if (stats.discount) {
      pills.push(`-${Math.round(stats.discount * 100)}% loja`);
    }

    return pills.map((pill) => `<span class="stat-pill">${pill}</span>`).join('');
  }

  function renderMissions() {
    elements.missionGrid.innerHTML = missions.map((mission) => {
      const progress = Math.min(mission.progress(state), mission.goal);
      const percent = Math.round((progress / mission.goal) * 100);
      const done = progress >= mission.goal;
      const claimed = state.claimedMissions.includes(mission.id);

      return `
        <article class="mission-card ${claimed ? 'is-claimed' : ''}">
          <h3>${mission.title}</h3>
          <p>${mission.description}</p>
          <div class="mission-progress" aria-label="Progresso ${percent}%">
            <span style="width:${percent}%"></span>
          </div>
          <div class="mission-tags">
            <span class="mission-tag">${formatCoins(progress)} / ${formatCoins(mission.goal)}</span>
            <span class="mission-tag mission-tag--reward">+${formatCoins(mission.reward)} BC</span>
          </div>
          <button type="button" data-action="mission" data-mission="${mission.id}" ${!done || claimed ? 'disabled' : ''}>
            ${claimed ? 'Recebida' : 'Receber'}
          </button>
        </article>
      `;
    }).join('');
  }

  function renderBadges() {
    if (!elements.badgeGrid) {
      return;
    }

    elements.badgeGrid.innerHTML = badges.map((badge) => {
      const desbloqueado = Boolean(badge.condition(state));
      const ehSecreto = badge.tier === 'secreto' && !desbloqueado;

      return `
        <article class="badge-card tier-${badge.tier} ${desbloqueado ? 'is-unlocked' : 'is-locked'}">
          <span class="badge-card__icon" aria-hidden="true">${ehSecreto ? '?' : badge.icon}</span>
          <h3>${ehSecreto ? 'Emblema secreto' : badge.name}</h3>
          <p>${ehSecreto ? 'Continue jogando para descobrir.' : badge.description}</p>
        </article>
      `;
    }).join('');
  }

  function renderInventory() {
    const ownedItems = state.owned.map(getItem).filter(Boolean);
    const grouped = slots
      .map((slot) => ({ slot, slotItems: ownedItems.filter((item) => item.slot === slot.id) }))
      .filter((group) => group.slotItems.length > 0);

    if (!grouped.length) {
      elements.inventoryList.innerHTML = '<p class="ability-empty">Sua colecao ainda esta vazia.</p>';
      return;
    }

    elements.inventoryList.innerHTML = grouped.map(({ slot, slotItems }) => `
      <div class="inventory-slot-group">
        <h3 class="inventory-slot-heading">${slot.label}</h3>
        <div class="inventory-grid">
          ${slotItems.map((item) => {
            const equipped = isEquipped(item);
            return `
              <article class="inventory-card rarity-${item.rarity} ${equipped ? 'is-equipped' : ''}" style="${getPreviewVars(item)}">
                <div class="item-preview" aria-hidden="true">${renderItemCube(item)}</div>
                <div class="inventory-card__body">
                  <strong>${item.name}</strong>
                  <span class="rarity-badge">${item.rarity}</span>
                  <span>Upgrade ${getUpgradeLevel(item.id)}/${MAX_UPGRADE}</span>
                </div>
                <button type="button" data-action="${equipped ? 'unequip' : 'equip'}" data-item="${item.id}">
                  ${equipped ? 'Remover' : 'Equipar'}
                </button>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderChestLabel() {
    const remaining = state.chestReadyAt - Date.now();
    elements.claimChest.textContent = remaining > 0 ? `Cofre ${formatRemaining(remaining)}` : 'Abrir cofre';
  }

  function slotLabel(slotId) {
    const slot = slots.find((entry) => entry.id === slotId);
    return slot ? slot.label : slotId;
  }

  function formatRemaining(ms) {
    const totalMinutes = Math.ceil(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
  }

  elements.challengeOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (!button) {
      return;
    }

    answerChallenge(Number(button.dataset.answer));
  });

  elements.nextChallenge.addEventListener('click', () => nextChallenge());
  elements.claimChest.addEventListener('click', claimChest);
  elements.resetProgress.addEventListener('click', resetProgress);

  if (elements.abilityGrid) {
    elements.abilityGrid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-ability]');
      if (!button) {
        return;
      }

      useAbility(button.dataset.ability);
    });
  }

  elements.shopFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) {
      return;
    }

    activeFilter = button.dataset.filter;
    elements.shopFilters.querySelectorAll('.filter-button').forEach((filterButton) => {
      filterButton.classList.toggle('is-active', filterButton === button);
    });
    renderShop();
  });

  elements.shopGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action][data-item]');
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const itemId = button.dataset.item;

    if (action === 'buy') {
      buyItem(itemId);
    } else if (action === 'equip') {
      equipItem(itemId);
    } else if (action === 'upgrade') {
      upgradeItem(itemId);
    }
  });

  elements.missionGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="mission"]');
    if (button) {
      claimMission(button.dataset.mission);
    }
  });

  elements.inventoryList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action][data-item]');
    if (!button) {
      return;
    }

    if (button.dataset.action === 'equip') {
      equipItem(button.dataset.item);
    } else if (button.dataset.action === 'unequip') {
      unequipItem(button.dataset.item);
    }
  });

  function startQuizNow() {
    if (elements.quizStartScreen) {
      elements.quizStartScreen.classList.add('is-hidden');
    }
    if (elements.quizPlayArea) {
      elements.quizPlayArea.classList.remove('is-hidden');
    }
    if (elements.quizActions) {
      elements.quizActions.classList.remove('is-hidden');
    }
    nextChallenge();
  }

  if (elements.startQuiz) {
    elements.startQuiz.addEventListener('click', startQuizNow);
  }

  if (window.Avatar3D) {
    window.Avatar3D.montar(elements.avatar);
  }

  window.setInterval(renderChestLabel, 60000);
  renderAll();
  hidratarComServidor();
})();
