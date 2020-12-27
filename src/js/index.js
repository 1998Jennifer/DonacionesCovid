// @flow
const media = window.matchMedia('(max-width: 930px)');
const hamburguer = document.getElementById('navHamburguer');

if (hamburguer !== null) {
  hamburguer.addEventListener('click', openNav);
}

function openNav() {
  if (media.matches) {
    const navbar = document.getElementById('navbarLink');

    if (navbar !== null) {
      const linkTexts = navbar.querySelectorAll('.link-text');

      if (navbar.classList.contains('navFull')) {
        linkTexts.forEach((linkText) => {
          linkText.style.display = 'none';
        });
        navbar.classList.remove('navFull');
      } else {
        navbar.classList.add('navFull');
        linkTexts.forEach((linkText) => {
          linkText.style.display = 'block';
        });
      }
    }
  }
}

function onResizeCheck() {
  if (!media.matches) {
    const navbar = document.getElementById('navbarLink');
    if (navbar !== null) {
      const linkTexts = navbar.querySelectorAll('.link-text');

      linkTexts.forEach((linkText) => {
        linkText.removeAttribute('style');
      });
      navbar.classList.remove('navFull');
    }
  }
}
media.addListener(onResizeCheck);
