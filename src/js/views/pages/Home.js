// @flow
/**
 * @file Página de inicio.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html } from 'lit-html';

const Home = {
  /**
   * @description Función que retorna el template HTML para la página de inicio.
   * @returns {string} Template de la página de inicio.
   */
  getHomeTemplate: (): string => {
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
            <a href="" class="boton-donar">Quiero Donar <span></span></a>
          </div>

          <div class="backgroundImg"></div>

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
          </div>
        </section>
      </main>
    `;
    return view;
  },
};

export default Home;
