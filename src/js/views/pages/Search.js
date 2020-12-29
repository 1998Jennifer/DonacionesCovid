// @flow
/**
 * @file Página de búsqueda.
 * @author Jennifer Intriago <jennifergabriela52@gmail.com>
 */

import { html, render, TemplateResult } from 'lit-html';
import { app } from '../..';
import '../../../css/search.css';

const Search = {
  /**
   * @description Datos de la página de búsqueda.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de búsqueda,
   * y que cambiarán datos dentro del template.
   */
  methods: {},

  /**
   * @description Función que retorna el template HTML para la página de búsqueda.
   * @returns {TemplateResult} Template de la página de búsqueda.
   */
  template: (): TemplateResult => {
    const view = html` <h1>Holi</h1> `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(Search.template(), app);
  },
};

export default Search;
