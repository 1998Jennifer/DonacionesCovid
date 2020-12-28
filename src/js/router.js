// @flow
/**
 * @file Archivo que se encarga de las rutas de la página.
 * @author Jesus Moreira <jesusromc8@gmail.com>
 */

import Router from 'vanilla-router';
import { render } from 'lit-html';

// Vistas
import Home from './views/pages/Home';
import Login from './views/pages/Login';
import About from './views/pages/About';
import Donate from './views/pages/Donate';

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

// Login
router.add('/login', () => {
  render(Login.getLogInTemplate(), app);
});

// Donate
router.add('/donate', () => {
  render(Donate.getDonateTemplate(), app);
});

// About
router.add('/about', () => {
  render(About.getAboutTemplate(), app);
});

/**
 * @description Función que inicializa el objeto de router, añadiendo el handler.
 */
const routerInit = () => {
  router.addUriListener();

  // Obtiene la ruta actual
  const currentURI = router.check()._current;

  // Navega hacia la ruta actual
  router.navigateTo(`/${currentURI}`);
};

export default routerInit;
