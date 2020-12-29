// @flow
/**
 * @file Página de administración.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import { html, render, TemplateResult } from 'lit-html';
import { app } from '../..';

const Admin = {
  /**
   * @description Datos de la página de administración.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de administración,
   * y que cambiarán datos dentro del template.
   */
  methods: {},

  /**
   * @description Función que retorna el template HTML para la página de administración.
   * @returns {TemplateResult} Template de la página de administración.
   */
  template: (): TemplateResult => {
    const view = html` <h1>Administración</h1> `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(Admin.template(), app);
  },
};

export default Admin;
