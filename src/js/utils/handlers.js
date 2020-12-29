// @flow
/**
 * @file Archivo con manejadores de eventos.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import { router } from '../router';

// Guardar en una constante el tamaño del dispositivo
export const media = window.matchMedia('(max-width: 930px)');

/**
 * @description Función que elimina la clase de CSS que activa el botón del menú
 * a cada uno de los items del menú.
 */
function removeActiveClassOnMenuItems() {
  // Obtener todos los elementos del menú
  const navItems = document.querySelectorAll('.nav-link');

  // Remover clase a cada uno
  navItems.forEach((item) => {
    item.classList.contains('nav-link-activated')
      ? item.classList.remove('nav-link-activated')
      : null;
  });
}

/**
 * @description Función que se encarga de manejar el clic de los botones del menú,
 * llevando a la ruta correspondiente.
 * @param {MouseEvent} e Evento de mouse.
 * @param {Element} item Elemento del menú.
 */
export function handleMenuClick(e: MouseEvent, item: Element) {
  // Evitar recargar la página
  e.preventDefault();

  // Comprobar que no sea el menú hamburguesa
  if (item.id !== 'navHamburguer') {
    // Remover la clase activa de los items del menú
    removeActiveClassOnMenuItems();

    // Ir a la ruta correspondiente
    switch (item.id) {
      case 'navHome':
        router.navigateTo('/');
        break;
      case 'navLogin':
        router.navigateTo('/login');
        break;
      case 'navDonar':
        router.navigateTo('/donate');
        break;
      case 'navSearch':
        router.navigateTo('/search');
        break;
      case 'navAdmin':
        // router.navigateTo('/admin');
        break;
      case 'navAcerca':
        router.navigateTo('/about');
        break;
      default:
        break;
    }

    // Agregar clase activa al botón de menú correspondiente
    item.classList.add('nav-link-activated');
  }
}

/**
 * @description Función que se ejecuta al hacer clic en el menú hamburguesa,
 * para abrir enteramente el menú.
 */
export function handleOpenNav() {
  // Abrir el menú únicamente si se encuentra en móvil
  if (media.matches) {
    // Obtener el navbar
    const navbar = document.querySelector('#navbarLink');

    // Verificar que no sea nulo
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
export function handleResize() {
  // Comprobar que no se encuentre en móvil
  if (!media.matches) {
    // Obtener el navbar
    const navbar = document.querySelector('#navbarLink');

    // Comprobar que no sea nulo
    if (navbar !== null) {
      const linkTexts = navbar.querySelectorAll('.link-text');

      linkTexts.forEach((linkText) => {
        linkText.removeAttribute('style');
      });
      navbar.classList.remove('navFull');
    }
  }
}
