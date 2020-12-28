// @flow
/**
 * @file Página de inicio.
 *
 */

import { html } from 'lit-html';
import '../../../css/donar.css';

const Donate = {
  /**
   * @description Función que retorna el template HTML para la página de inicio.
   * @returns {string} Template de la página de inicio.
   */
  getDonateTemplate: (): string => {
    const view = html`
      <h1>¿Qué deseas donar?</h1>
      <div class="prueba">
        <section class="container-flex">
          <div class="item">
            <div class="item-card">
              <i class="fas fa-hamburger"></i>
              <a>Comida</a>
            </div>
          </div>
          <div class="item">
            <div class="item-card">
              <i class="fas fa-couch"></i>
              <a>Bien</a>
            </div>
          </div>
          <div class="item">
            <div class="item-card">
              <i class="fas fa-money-bill"></i>
              <a>Dinero</a>
            </div>
          </div>
        </section>

        <section class="container-form-donate">
          <form class="form-donate">
            <label for="usuario">
              <span class="title-input">Nombre del donador</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" placeholder="Ej. Jennifer" />
              </div>
              <span>Máximo 32 caracteres</span>
            </label>

            <label for="cedulaDonador">
              <span class="title-input">Cedula del donador</span>
              <div class="main-donate">
                <i class="fas fa-id-card"></i>
                <input type="number" id="usuario" placeholder="Escriba aquí" />
              </div>
              <span>Solo números</span>
            </label>
            <label for="beneficiario">
              <span class="title-input">Nombre del beneficiario</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" placeholder="Ej. Jesús" />
              </div>
              <span>Máximo 32 caracteres</span>
            </label>

            <label for="descripcion">
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

            <input
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
};

export default Donate;
