// @flow
/**
 * @file Página de Log In.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html } from 'lit-html';

const LogIn = {
  /**
   * @description Función que retorna el template HTML para la página de login.
   * @returns {string} Template de la página de login.
   */
  getLogInTemplate: (): string => {
    const view = html`
      <main>
        <p>Login</p>
      </main>
    `;
    return view;
  },
};

export default LogIn;
