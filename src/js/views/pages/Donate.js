// @flow
/**
 * @file Página de donación.
 *
 */

import { html, render, TemplateResult } from 'lit-html';
import { app } from '../..';
import '../../../css/donar.css';

const Donate = {
  /**
   * @description Datos de la página de donación.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de donación,
   * y que cambiarán datos dentro del template.
   */
  methods: {},

  /**
   * @description Función que retorna el template HTML para la página de donación.
   * @returns {TemplateResult} Template de la página de donación.
   */
  template: (): TemplateResult => {
    const view = html`
      <h1>¿Qué deseas donar?</h1>
      <div class="prueba">
        <section class="container-flex">
          <div class="item" title="Dona comida">
            <div class="item-card">
              <i class="fas fa-hamburger"></i>
              <a>Comida</a>
            </div>
          </div>
          <div class="item" title="Dona un bien material">
            <div class="item-card">
              <i class="fas fa-couch"></i>
              <a>Objeto</a>
            </div>
          </div>
          <div class="item" title="Dona dinero">
            <div class="item-card">
              <i class="fas fa-money-bill"></i>
              <a>Dinero</a>
            </div>
          </div>
        </section>

        <section class="container-form-donate">
          <form class="form-donate">
            <label for="usuario" title="Escribe tu nombre">
              <span class="title-input">Nombre del donador</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" placeholder="Ej. Jennifer" />
              </div>
              <span>Máximo 32 caracteres</span>
            </label>

            <label for="cedulaDonador" title="Escribe tu cedula">
              <span class="title-input">Cedula del donador</span>
              <div class="main-donate">
                <i class="fas fa-id-card"></i>
                <input type="number" id="usuario" placeholder="Escriba aquí" />
              </div>
              <span>Solo números</span>
            </label>
            <label for="beneficiario" title="Escribe nombre del beneficiario">
              <span class="title-input">Nombre del beneficiario</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" placeholder="Ej. Jesús" />
              </div>
              <span>Máximo 32 caracteres</span>
            </label>

            <label for="descripcion" title="Ejemplo: arroz">
              <span class="title-input">Descripción de la donación</span>
              <div class="main-donate">
                <i class="fas fa-comment-alt"></i>
                <input
                  type="text"
                  id="usuario"
                  placeholder="Ej. Atún, arroz, ropa, etc."
                />
              </div>
              <span>Máximo 120 caracteres</span>
            </label>

            <label for="monto" title="Ejemplo: $45.00">
              <span class="title-input">Monto de la donación</span>
              <div class="main-donate">
                <i class="fas fa-dollar-sign"></i>
                <input type="number" id="usuario" placeholder="Ej. 10" />
              </div>
              <span>Solo números</span>
            </label>

            <input
              title="Boton enviar donación"
              type="submit"
              value="Enviar donación"
              class="button-send-donate"
            />
          </form>
        </section>
      </div>
    `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(Donate.template(), app);
  },
};

export default Donate;
