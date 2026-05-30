(() => {
  const selector = '.visual-card img, .topic-media img, .page-hero img[src*="docs/imagens-pdfs"]';
  const images = [...document.querySelectorAll(selector)];

  if (images.length === 0) {
    return;
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="image-lightbox__dialog" role="document">
      <button class="image-lightbox__close" type="button" aria-label="Fechar imagem em foco">
        <span aria-hidden="true">&times;</span>
      </button>
      <img class="image-lightbox__image" alt="">
      <p class="image-lightbox__caption"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const dialogImage = lightbox.querySelector('.image-lightbox__image');
  const caption = lightbox.querySelector('.image-lightbox__caption');
  const closeButton = lightbox.querySelector('.image-lightbox__close');
  let previousFocus = null;
  let closeTimer = null;

  const getCaption = (image) => {
    const figure = image.closest('figure');
    const figureCaption = figure?.querySelector('figcaption')?.innerText.trim();
    return figureCaption || image.alt || 'Imagem em foco';
  };

  const openLightbox = (image) => {
    window.clearTimeout(closeTimer);
    previousFocus = document.activeElement;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt || '';
    caption.textContent = getCaption(image);
    lightbox.classList.remove('is-closing');
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-lock');
    closeButton.focus();
  };

  const closeLightbox = () => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    lightbox.classList.add('is-closing');
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-lock');

    closeTimer = window.setTimeout(() => {
      lightbox.classList.remove('is-closing');
      dialogImage.removeAttribute('src');
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    }, 170);
  };

  images.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Abrir imagem em foco: ${image.alt || 'material visual'}`);

    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
})();
