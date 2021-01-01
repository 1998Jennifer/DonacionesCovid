// @flow
/**
 * @file Página de inicio.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html, render, TemplateResult } from 'lit-html';
import { app } from '..';
import { router } from '../router';
import { activateMenuFromRoute } from '../utils/handlers';

const Home = {
  /**
   * @description Datos de la página de inicio.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de inicio,
   * y que cambiarán datos dentro del template.
   */
  methods: {
    /**
     * @description Función que se encarga de manejar el evento de clic en
     * el botón de "Quiero donar".
     * @param {MouseEvent} e Evento de mouse.
     */
    handleDonateButton(e: MouseEvent) {
      e.preventDefault();
      router.navigateTo('/donate');
      activateMenuFromRoute('donate');
    },
  },

  /**
   * @description Función que retorna el template HTML para la página de inicio.
   * @returns {TemplateResult} Template de la página de inicio.
   */
  template: (): TemplateResult => {
    const view = html`
      <main>
        <section class="main-section">
          <div class="main-section-container">
            <h1>Donaciones Covid</h1>
            <h3>
              Con tu donación nos ayudas a actuar inmediatamente en esta
              emergencia y seguir trabajando en su prevención.
            </h3>
            <p>Súmate a la respuesta ante el Coronavirus</p>
            <a
              title="Boton quiero donar"
              href="/donate"
              class="boton-donar"
              @click="${Home.methods.handleDonateButton}"
              >Quiero donar <i class="fas fa-chevron-down"></i
            ></a>
          </div>

          <div class="backgroundImg" title="Ilustración"></div>

          <div class="main-section-container">
            <div class="main-section-card">
              <div class="section-title-heart">
                <i class="far fa-heart"></i>
                <h2>Donar ahora</h2>
              </div>
              <p>
                El mundo entero se enfrenta a un reto sin precedentes por la
                creciente pandemia de COVID-19, que afecta a comunidades y
                economías por doquier. La sociedad se ha movilizado para
                combatir la pandemia promoviendo la unión de gobiernos,
                organizaciones de diferentes industrias y sectores.
              </p>
            </div>
            <div class="main-section-card">
              <div class="section-title-heart">
                <i class="fas fa-viruses"></i>
                <h2>¡Necesitamos donaciones!</h2>
              </div>
              <p>
                Ayuda a la Salud pide donaciones para asistir a los valientes
                trabajadores de primera línea. Actualmente, necesitamos apoyo
                financiero, además de artículos enlatados, café instantáneo,
                jabón de manos, desinfectantes y otros productos. Con las
                donaciones, se armarán kits que se distribuirán en los
                hospitales de Fairhill.
              </p>
            </div>
          </div>
        </section>
      </main>
    `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(Home.template(), app);
  },
};

export default Home;
