// @flow
/**
 * @file Página de inicio.
 *
 */

import { html } from 'lit-html';
import '../../../css/search.css';

const Search = {
  /**
   * @description Función que retorna el template HTML para la página de inicio.
   * @returns {string} Template de la página de inicio.
   */
  getSearchTemplate: (): string => {
    const view = html` <h1>holi</h1> `;
    return view;
  },
};

export default Search;
