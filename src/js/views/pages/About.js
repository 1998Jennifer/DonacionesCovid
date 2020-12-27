// @flow
/**
 * @file Página de información.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html } from 'lit-html';

const About = {
  /**
   * @description Función que retorna el template HTML para la página de información.
   * @returns {string} Template de la página de información.
   */
  getAboutTemplate: (): string => {
    const view = html`
      <main>
        <p>Hola</p>
      </main>
    `;
    return view;
  },
};

export default About;
