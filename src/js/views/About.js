// @flow
/**
 * @file Página de información.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html, render, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/aboutUs.css';

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
    const view = html`
      <h1>Acerca de</h1>
      <section class="imagen-container">
        <figure style="margin: 0;" class="imagen-fig">
          <img
            src="https://ik.imagekit.io/hpmztn0eqra/LOGO-ULEAM-HORIZONTAL__2__FhP2OS__w.png"
            alt="Imagen de logo uleam"
          />
        </figure>
      </section>
      <section class="titles">
        <h2>Facultad de Ciencias Informáticas</h2>
      </section>

      <section class="container-about">
        <h2>Optativa I</h2>
        <h2 style="color: #6c5ce7">Prueba práctica del primer parcial</h2>
        <p>
          Esta página web fue realizada como un proyecto para la materia de
          Optativa I.
        </p>
      </section>
      <section class="container-about-members">
        <div class="container-about-member">
          <img
            src="https://ik.imagekit.io/hpmztn0eqra/user-circle-solid_C-_b6mfxs.svg"
            alt="Integrante"
          />
          <div class="about-text">
            <p>Jesus Ricardo Moreira Cedeño</p>
            <p>Estudiante de ingeniería en sistemas</p>
            <p>7mo "A"</p>
          </div>
        </div>
        <div class="container-about-member">
          <img
            src="https://ik.imagekit.io/hpmztn0eqra/user-circle-solid_C-_b6mfxs.svg"
            alt="Integrante"
          />
          <div class="about-text">
            <p>Jennifer Gabriela Intriago Reyes</p>
            <p>Estudiante de ingeniería en sistemas</p>
            <p>7mo "A"</p>
          </div>
        </div>
      </section>
    `;
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
