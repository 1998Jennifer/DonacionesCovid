// @flow
/**
 * @file Archivo que se encarga de las rutas de la página.
 * @author Jesus Moreira <jesusromc8@gmail.com>
 */

import Router from 'vanilla-router';

// Vistas
import Home from './views/Home';
import Login from './views/Login';
import About from './views/About';
import Donate from './views/Donate';
import Search from './views/Search';
import Admin from './views/Admin';
import { activateMenuFromRoute } from './utils/handlers';

// Objeto de Router
export const router = new Router({
  mode: 'history',
  page404: function (path) {
    console.log(`/${path} no existe`);
  },
});

// Home
router.add('', () => {
  Home.update();
});

// Login
router.add('/login', () => {
  Login.update();
});

// Donate
router.add('/donate', () => {
  Donate.update();
});

// About
router.add('/about', () => {
  About.update();
});

// Search
router.add('/search', () => {
  // Reiniciar los datos
  Search.data.donations = [];
  Search.update();
});

// Admin
router.add('/admin', () => {
  Admin.update();
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

  // Coloca la clase activa al item del menú de la ruta correspondiente
  activateMenuFromRoute(currentURI);
};

export default routerInit;
