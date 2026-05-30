(() => {
  // Efeito de digitação para os títulos marcados com data-typed.
  const targets = document.querySelectorAll('[data-typed]');
  if (!targets.length) {
    return;
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  targets.forEach((target) => {
    const fullText = target.getAttribute('data-typed') || target.textContent.trim();

    if (reduce) {
      target.textContent = fullText;
      target.classList.add('typed-done');
      return;
    }

    let charIndex = 0;
    const typeSpeed = 70;

    target.textContent = '';
    target.classList.add('is-typing');

    const type = () => {
      if (charIndex <= fullText.length) {
        target.textContent = fullText.slice(0, charIndex);
        charIndex += 1;
        window.setTimeout(type, typeSpeed);
      } else {
        target.classList.remove('is-typing');
        target.classList.add('typed-done');
      }
    };

    type();
  });
})();
