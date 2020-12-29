// @flow
/**
 * @file Página de información.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html, render, TemplateResult } from 'lit-html';
import { app } from '../..';

const About = {
  /**
   * @description Datos de la página de información.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de información,
   * y que cambiarán datos dentro del template.
   */
  methods: {},

  /**
   * @description Función que retorna el template HTML para la página de información.
   * @returns {TemplateResult} Template de la página de información.
   */
  template: (): TemplateResult => {
    const view = html` <h1>Acerca de</h1> `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(About.template(), app);
  },
};

export default About;
