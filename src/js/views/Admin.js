// @flow
/**
 * @file Página de administración.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import { html, render, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/admin.css';

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
    const view = html`
      <h1>Administra donaciones</h1>
      <section class="container-section-admin">
        <div class="item-admin">
          <form class="form-donate-search">
            <label for="donador" title="Nombre de donador">
              <span class="title-input">Donador</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" placeholder="Ej. Jennifer" />
              </div>
            </label>
            <label for="cedula" title="Cédula">
              <span class="title-input">Cédula del donador</span>
              <div class="main-donate">
                <i class="fas fa-id-card"></i>
                <input
                  type="number"
                  id="usuario"
                  placeholder="Escriba aquí"
                  step="1"
                  min="0"
                />
              </div>
            </label>
            <label for="beneficiario" title="Beneficiario">
              <span class="title-input">Beneficiario</span>
              <div class="main-donate">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Ej. Jesús" />
              </div>
            </label>

            <label for="fechaDesde" title="Fecha">
              <span class="title-input">Desde</span>
              <div class="main-donate">
                <i class="fas fa-calendar"></i>
                <input type="date" class="input-calendar" required />
              </div>
            </label>

            <label for="fechaHasta" title="Fecha">
              <span class="title-input">Hasta</span>
              <div class="main-donate">
                <i class="fas fa-calendar"></i>
                <input type="date" class="input-calendar" required />
              </div>
            </label>

            <input type="submit" value="Consultar" class="button-send-donate" title="Boton para consultar"/>
          </form>
        </div>
        <div class="item-admin">
          <div class="item-admin-data">
            <label class="item-search-admin">
              <p><strong>Donador:</strong></p>
              <input type="text" value="Jennifer Intriago" />
            </label>
            <label class="item-search-admin">
              <p><strong>Beneficiario:</strong></p>
              <input type="text" value="Jesús Moreira" />
            </label>
            <label class="item-search-admin">
              <p><strong>Descripción:</strong></p>
              <input type="text" value="Atún y arroz" />
            </label>
            <label class="item-search-admin">
              <p><strong>Fecha:</strong></p>
              <input type="date" value="2020-12-29" required />
            </label>

            <div class="buttons-admin">
              <button class="accept button-admin" title="Boton aceptar">
                <i class="fas fa-check"></i>
              </button>
              <button class="deny button-admin" title="Boton denegar">
                <i class="fas fa-times"></i>
              </button>
              <button class="change button-admin" title="Boton editar">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div class="item-admin-data">
            <label class="item-search-admin">
              <p><strong>Donador:</strong></p>
              <input type="text" value="Jennifer Intriago" />
            </label>
            <label class="item-search-admin">
              <p><strong>Beneficiario:</strong></p>
              <input type="text" value="Jesús Moreira" />
            </label>
            <label class="item-search-admin">
              <p><strong>Descripción:</strong></p>
              <input type="text" value="Atún y arroz" />
            </label>
            <label class="item-search-admin">
              <p><strong>Fecha:</strong></p>
              <input type="date" value="2020-12-29" required />
            </label>

            <div class="buttons-admin">
              <button class="accept button-admin">
                <i class="fas fa-check"></i>
              </button>
              <button class="deny button-admin">
                <i class="fas fa-times"></i>
              </button>
              <button class="change button-admin">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div class="item-admin-data">
            <label class="item-search-admin">
              <p><strong>Donador:</strong></p>
              <input type="text" value="Jennifer Intriago" />
            </label>
            <label class="item-search-admin">
              <p><strong>Beneficiario:</strong></p>
              <input type="text" value="Jesús Moreira" />
            </label>
            <label class="item-search-admin">
              <p><strong>Descripción:</strong></p>
              <input type="text" value="Atún y arroz" />
            </label>
            <label class="item-search-admin">
              <p><strong>Fecha:</strong></p>
              <input type="date" value="2020-12-29" required />
            </label>

            <div class="buttons-admin">
              <button class="accept button-admin">
                <i class="fas fa-check"></i>
              </button>
              <button class="deny button-admin">
                <i class="fas fa-times"></i>
              </button>
              <button class="change button-admin">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div class="item-admin-data">
            <label class="item-search-admin">
              <p><strong>Donador:</strong></p>
              <input type="text" value="Jennifer Intriago" />
            </label>
            <label class="item-search-admin">
              <p><strong>Beneficiario:</strong></p>
              <input type="text" value="Jesús Moreira" />
            </label>
            <label class="item-search-admin">
              <p><strong>Descripción:</strong></p>
              <input type="text" value="Atún y arroz" />
            </label>
            <label class="item-search-admin">
              <p><strong>Fecha:</strong></p>
              <input type="date" value="2020-12-29" required />
            </label>

            <div class="buttons-admin">
              <button class="accept button-admin">
                <i class="fas fa-check"></i>
              </button>
              <button class="deny button-admin">
                <i class="fas fa-times"></i>
              </button>
              <button class="change button-admin">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="grilla">
        <div class="grilla-item title"><p>Donador</p></div>
        <div class="grilla-item title"><p>Beneficiario</p></div>
        <div class="grilla-item title"><p>Descripción</p></div>
        <div class="grilla-item title"><p>Fecha</p></div>
        <div class="grilla-item title"><p>Action</p></div>

        <div class="grilla-item">
          <input type="text" value="Jennifer Intriago" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Jesus Moreira" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Atún y arroz" />
        </div>
        <div class="grilla-item"><input type="date" value="2020-12-28" required /></div>
        <div class="grilla-item">
          <div class="button-grid">
            <button class="accept button-admin" title="Boton aceptar">
              <i class="fas fa-check"></i>
            </button>
            <button class="deny button-admin" title="Boton denegar">
              <i class="fas fa-times"></i>
            </button>
            <button class="change button-admin" title="Boton modificar">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <div class="grilla-item">
        <input type="text" value="Jennifer Intriago" />
        </div>
        <div class="grilla-item">
        <input type="text" value="Jesus Moreira" />
        </div>
        <div class="grilla-item">
        <input type="text" value="Atún y arroz" />
        </div>
        <div class="grilla-item"><input type="date" value="2020-12-28" required /></div>
        <div class="grilla-item">
        <div class="button-grid">
          <button class="accept button-admin">
            <i class="fas fa-check"></i>
          </button>
          <button class="deny button-admin">
            <i class="fas fa-times"></i>
          </button>
          <button class="change button-admin">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        </div>
        <div class="grilla-item">
          <input type="text" value="Jennifer Intriago" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Jesus Moreira" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Atún y arroz" />
        </div>
        <div class="grilla-item"><input type="date" value="2020-12-28" required /></div>
        <div class="grilla-item">
          <div class="button-grid">
            <button class="accept button-admin">
              <i class="fas fa-check"></i>
            </button>
            <button class="deny button-admin">
              <i class="fas fa-times"></i>
            </button>
            <button class="change button-admin">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <div class="grilla-item">
          <input type="text" value="Jennifer Intriago" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Jesus Moreira" />
        </div>
        <div class="grilla-item">
          <input type="text" value="Atún y arroz" />
        </div>
        <div class="grilla-item"><input type="date" value="2020-12-28" required /></div>
        <div class="grilla-item">
          <div class="button-grid">
            <button class="accept button-admin">
              <i class="fas fa-check"></i>
            </button>
            <button class="deny button-admin">
              <i class="fas fa-times"></i>
            </button>
            <button class="change button-admin">
              <i class="fas fa-edit"></i>
            </button>
          </div>
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
    render(Admin.template(), app);
  },
};

export default Admin;
