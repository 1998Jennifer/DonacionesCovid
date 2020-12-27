// @flow
/**
 * @file Archivo que se encarga de las rutas de la página.
 * @author Jesus Moreira <jesusromc8@gmail.com>
 */

import Router from 'vanilla-router';
import { render } from 'lit-html';

// Vistas
import Home from './views/pages/Home';
import About from './views/pages/About';

// Obtener elemento raíz
const app = document.querySelector('#app');

// Objeto de Router
export const router = new Router({
  mode: 'history',
  page404: function (path) {
    console.log(`/${path} no existe`);
  },
});

// Home
router.add('', () => {
  render(Home.getHomeTemplate(), app);
});

// About
router.add('/about', () => {
  render(About.getAboutTemplate(), app);
});

/**
 * @description Función que se ejecutará cada vez que la ruta cambie.
 */
const routeHandler = () => {
  console.log(router.check());
};

/**
 * @description Función que inicializa el objeto de router, añadiendo el handler.
 */
const routerInit = () => {
  router.addUriListener(routeHandler);

  const currentURI = router.check()._current;

  router.navigateTo(`/${currentURI}`);
};

export default routerInit;
