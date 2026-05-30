(() => {
  // Escapa caracteres especiais antes de injetar no HTML.
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const KEYWORDS = new Set('public private protected internal static void struct class namespace new return if else for foreach while do using this base true false null break continue switch case default in out ref const readonly get set'.split(' '));
  const TYPES = new Set('string int double bool char float long decimal var object byte short uint ulong'.split(' '));

  // Realce de sintaxe simples para C#: comentários, strings, números, palavras-chave, tipos e chamadas.
  function highlight(code) {
    const re = /(\/\/[^\n]*)|(\$?@?"(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      out += esc(code.slice(last, m.index));
      if (m[1]) {
        out += `<span class="tok-com">${esc(m[1])}</span>`;
      } else if (m[2]) {
        out += `<span class="tok-str">${esc(m[2])}</span>`;
      } else if (m[3]) {
        out += `<span class="tok-num">${esc(m[3])}</span>`;
      } else {
        const w = m[4];
        if (KEYWORDS.has(w)) {
          out += `<span class="tok-kw">${w}</span>`;
        } else if (TYPES.has(w)) {
          out += `<span class="tok-type">${w}</span>`;
        } else if (code[re.lastIndex] === '(') {
          out += `<span class="tok-fn">${w}</span>`;
        } else {
          out += esc(w);
        }
      }
      last = re.lastIndex;
    }
    out += esc(code.slice(last));
    return out;
  }

  // Monta cada cartão de código a partir da fonte guardada em <script type="text/plain">.
  document.querySelectorAll('.code-card').forEach((card) => {
    const src = document.getElementById(card.getAttribute('data-src'));
    if (!src) {
      return;
    }

    const raw = src.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
    const codeEl = card.querySelector('code');
    if (codeEl) {
      codeEl.innerHTML = highlight(raw);
    }

    const copyBtn = card.querySelector('.code-card__copy');
    if (!copyBtn) {
      return;
    }

    const label = copyBtn.querySelector('.code-card__copy-label');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(raw);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = raw;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }

      copyBtn.classList.add('is-done');
      if (label) {
        label.textContent = 'Copiado!';
      }
      window.setTimeout(() => {
        copyBtn.classList.remove('is-done');
        if (label) {
          label.textContent = 'Copiar';
        }
      }, 1600);
    });
  });

  // "Mostrar Resolução": revela o código C# do exercício, inicialmente oculto.
  document.querySelectorAll('.practice__toggle').forEach((btn) => {
    const panel = btn.closest('.exercise__panel');
    const card = panel ? panel.querySelector('.code-card') : null;
    if (!card) {
      return;
    }

    btn.addEventListener('click', () => {
      const willOpen = card.classList.contains('is-collapsed');
      card.classList.toggle('is-collapsed', !willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      btn.textContent = willOpen ? 'Ocultar Resolução' : 'Mostrar Resolução';

      if (willOpen) {
        card.classList.add('is-revealing');
        card.addEventListener('animationend', () => card.classList.remove('is-revealing'), { once: true });
      }
    });
  });

  // Mini exercício interativo: escreve struct e vê o realce ao vivo (não compila).
  const pgInput = document.getElementById('pg-input');
  if (pgInput) {
    const pgOut = document.getElementById('pg-output');
    const placeholder = '<span class="tok-com">// seu código realçado aparece aqui…</span>';

    const render = () => {
      const value = pgInput.value || '';
      pgOut.innerHTML = value.trim() ? highlight(value) : placeholder;
    };

    pgInput.addEventListener('input', render);

    document.querySelectorAll('.chip[data-fill]').forEach((chip) => {
      chip.addEventListener('click', () => {
        pgInput.value = chip.getAttribute('data-fill');
        render();
        pgInput.focus();
      });
    });

    render();
  }

  // Animações sutis de entrada ao rolar a página.
  const reveals = [...document.querySelectorAll('.reveal')];
  if (reveals.length) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach((el) => io.observe(el));
    }
  }
})();
