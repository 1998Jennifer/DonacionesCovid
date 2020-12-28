// @flow

import routerInit, { router } from './router';

const media = window.matchMedia('(max-width: 930px)');
const hamburguer = document.getElementById('navHamburguer');

if (hamburguer !== null) {
  hamburguer.addEventListener('click', openNav);
}

/**
 * @description Función que se ejecuta al hacer clic en el menú hamburguesa.
 */
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

/**
 * @description Función que se ejecuta cada vez que el navegador cambie de tamaño.
 */
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

// Al cargar la página, inicializar el router y los eventos de menú
window.addEventListener('load', () => {
  routerInit();

  // Elementos de menú
  const navHome = document.querySelector('#navHome');
  const navLogIn = document.querySelector('#navLogin');
  const navAcerca = document.querySelector('#navAcerca');
  const navDonar = document.querySelector('#navDonar');

  // Eventos de click
  if (
    navHome !== null &&
    navAcerca !== null &&
    navLogIn !== null &&
    navDonar !== null
  ) {
    navHome.addEventListener('click', () => {
      router.navigateTo('/');
    });

    navLogIn.addEventListener('click', () => {
      router.navigateTo('/login');
    });

    navAcerca.addEventListener('click', () => {
      router.navigateTo('/about');
    });

    navDonar.addEventListener('click', () => {
      router.navigateTo('/donate');
    });
  }
});
