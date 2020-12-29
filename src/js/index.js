// @flow
/**
 * @file Archivo inicial de la página.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import routerInit from './router';
import {
  handleMenuClick,
  handleOpenNav,
  handleResize,
  media,
} from './utils/handlers';

// Obtener elemento raíz, y exportarlo para su uso en toda la app
export const app = document.querySelector('#app');

// Obtener el elemento del menú hamburgesa
const hamburguer = document.querySelector('#navHamburguer');

// Se comprueba que no sea nulo, y al evento de clic se
// le añade la función para abrir el menú
if (hamburguer !== null) {
  hamburguer.addEventListener('click', handleOpenNav);
}

// Añadir evento de cambio de tamaño de pantalla
media.addListener(handleResize);

// Al cargar la página, inicializar el router y los eventos de menú
window.addEventListener('load', () => {
  // Inicializar router
  routerInit();

  // Obtener todos los elementos del menú
  const navItems = document.querySelectorAll('.nav-link');

  // Recorrer cada item
  navItems.forEach((item) => {
    // Comprobar que no sea nulo
    if (item !== null) {
      // Añadir evento de clic a los items del menú
      item.addEventListener('click', (e: MouseEvent) => {
        handleMenuClick(e, item);
      });
    }
  });
});
