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
    const view = html`
      <h1>¡Busca donaciones!</h1>
      <section class="container-form-donate">
        <form class="form-donate-search">
          <label for="donador">
            <span class="title-input">Donador</span>
            <div class="main-donate">
              <i class="fas fa-user"></i>
              <input type="text" id="usuario" placeholder="Ej. Jennifer" />
            </div>
          </label>
          <label for="cedula">
            <span class="title-input">Cédula del donador</span>
            <div class="main-donate">
              <i class="fas fa-id-card"></i>
              <input type="number" id="usuario" placeholder="Escriba aquí" />
            </div>
          </label>
          <label for="beneficiario">
            <span class="title-input">Beneficiario</span>
            <div class="main-donate">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Ej. Jesús" />
            </div>
          </label>

          <label for="fechaDesde">
            <span class="title-input">Desde</span>
            <div class="main-donate">
              <i class="fas fa-user" style="color: #F3F3F3;"></i>
              <input type="date" class="input-calendar" />
            </div>
          </label>

          <label for="fechaHasta">
            <span class="title-input">Hasta</span>
            <div class="main-donate">
              <i class="fas fa-user" style="color: #F3F3F3;"></i>
              <input type="date" class="input-calendar" />
            </div>
          </label>

          <input type="submit" value="Consultar" class="button-send-donate" />
          <div class="container-card-search">
            <div class="item-search">
              <label class="item-search-data">
                <p><strong>Donador:</strong></p>
                <p>Jennifer Intriago</p>
              </label>
              <label class="item-search-data">
                <p><strong>Beneficiario:</strong></p>
                <p>Jesús Moreira</p>
              </label>
              <label class="item-search-data">
                <p><strong>Descripción:</strong></p>
                <p>Atún y arroz</p>
              </label>

              <label class="item-search-data">
                <p><strong>Fecha:</strong></p>
                <p>07/12/2020</p>
              </label>
            </div>
            <div class="item-search">
              <label class="item-search-data">
                <p><strong>Donador:</strong></p>
                <p>Jennifer Intriago</p>
              </label>
              <label class="item-search-data">
                <p><strong>Beneficiario:</strong></p>
                <p>Jesús Moreira</p>
              </label>
              <label class="item-search-data">
                <p><strong>Descripción:</strong></p>
                <p>Atún y arroz</p>
              </label>

              <label class="item-search-data">
                <p><strong>Fecha:</strong></p>
                <p>07/12/2020</p>
              </label>
            </div>
            <div class="item-search">
              <label class="item-search-data">
                <p><strong>Donador:</strong></p>
                <p>Jennifer Intriago</p>
              </label>
              <label class="item-search-data">
                <p><strong>Beneficiario:</strong></p>
                <p>Jesús Moreira</p>
              </label>
              <label class="item-search-data">
                <p><strong>Descripción:</strong></p>
                <p>Atún y arroz</p>
              </label>

              <label class="item-search-data">
                <p><strong>Fecha:</strong></p>
                <p>07/12/2020</p>
              </label>
            </div>
            <div class="item-search">
              <label class="item-search-data">
                <p><strong>Donador:</strong></p>
                <p>Jennifer Intriago</p>
              </label>
              <label class="item-search-data">
                <p><strong>Beneficiario:</strong></p>
                <p>Jesús Moreira</p>
              </label>
              <label class="item-search-data">
                <p><strong>Monto:</strong></p>
                <p>$45.00</p>
              </label>

              <label class="item-search-data">
                <p><strong>Fecha:</strong></p>
                <p>07/12/2020</p>
              </label>
            </div>
          </div>
        </form>
      </section>
    `;
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
