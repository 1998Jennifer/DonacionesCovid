// @flow
/**
 * @file Página de búsqueda.
 * @author Jennifer Intriago <jennifergabriela52@gmail.com>
 */

import { html, render, directive, Part, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/search.css';
import { DonationAPI } from '../services/donationAPI';
import { DonationResponse } from '../interfaces/DonationResponse';

const Search = {
  /**
   * @description Datos de la página de búsqueda.
   */
  data: {
    formValues: {
      donor: '',
      idcard: '',
      recipient: '',
      from: '',
      to: '',
    },
    formErrors: {
      donor: false,
      idcard: false,
      recipient: false,
      from: false,
      to: false,
    },
    donations: [],
    filteredDonations: [],
  },

  /**
   * @description Métodos disponibles para la página de búsqueda,
   * y que cambiarán datos dentro del template.
   */
  methods: {
    /**
     * @description Función para obtener donaciones.
     * @returns {Promise<DonationResponse[]>} Promesa con las donaciones
     */
    getDonations: async () => {
      return await DonationAPI.get();
    },

    /**
     * @description Función que se encarga de renderizar las donaciones
     * en la primera carga.
     */
    renderDonations: directive(
      (func: () => Promise<DonationResponse[]>) => async (part: Part) => {
        // Mostrar cargando
        part.setValue(
          html`<span style="text-align: center;">Cargando...</span>`
        );

        // Obtener los datos
        const data = await Promise.resolve(func());

        // Guardar los datos
        Search.data.donations = data;
        Search.data.filteredDonations = data;

        // Renderizar la lista con los datos
        part.setValue(
          html`${Search.data.donations.map(
            (item) => html`<div class="item-search">
              <label class="item-search-data">
                <p><strong>Cédula:</strong></p>
                <p>${item.idcard}</p>
              </label>
              <label class="item-search-data">
                <p><strong>Donador:</strong></p>
                <p>${item.donor}</p>
              </label>
              <label class="item-search-data">
                <p><strong>Beneficiario:</strong></p>
                <p>${item.recipient}</p>
              </label>
              ${item.type === 'material'
                ? html`<label class="item-search-data">
                    <p><strong>Descripción:</strong></p>
                    <p>${item.description}</p>
                  </label>`
                : html`<label class="item-search-data">
                    <p><strong>Monto:</strong></p>
                    <p>$${item.ammount}</p>
                  </label>`}

              <label class="item-search-data">
                <p><strong>Fecha:</strong></p>
                <p>
                  ${new Date(item.createdAt).toLocaleString('es-ES', {
                    dateStyle: 'medium',
                  })}
                </p>
              </label>
            </div>`
          )}`
        );

        part.commit();
      }
    ),

    /**
     * @description Función que se llama al pulsar en el botón Consultar.
     * Se comprueba que no hayan errores, y se filtran los datos correspondientes.
     * @param {Event} e Evento de submit.
     */
    submitForm: (e: Event) => {
      // Evitar recargar página
      e.preventDefault();

      // Variable para comprobar errores
      let errors = false;

      // Si existen errores, termina la ejecución
      Object.keys(Search.data.formErrors).forEach((key: string) => {
        if (Search.data.formErrors[key]) {
          errors = true;
        }
      });

      if (errors) return;

      // Arreglo con los filtros necesarios
      const filters = [];

      // Se recorre cada valor del formulario, y si contienen datos
      // se guarda el nombre del campo en el arreglo de filtros
      Object.keys(Search.data.formValues).forEach((key: string) => {
        if (Search.data.formValues[key].length !== 0) {
          filters.push(key);
        }
      });

      // Si no hay filtros, retorna todos los datos
      if (filters.length === 0) {
        Search.data.filteredDonations = Search.data.donations;
      } else {
        // Guarda los datos en una variable para filtrar
        let results = Search.data.donations;

        // Por cada filtro, cambiará el arreglo
        filters.forEach((filter: string) => {
          results = results.filter((value: DonationResponse) => {
            // Expresión regular con el valor del formulario
            const regex = new RegExp(`${Search.data.formValues[filter]}`, 'gi');

            // Filtra por el campo correspondiente
            if (filter === 'donor') {
              if (regex.test(value.donor)) return true;
              else return false;
            } else if (filter === 'idcard') {
              if (regex.test(value.idcard)) return true;
              else return false;
            } else if (filter === 'recipient') {
              if (regex.test(value.recipient)) return true;
              else return false;
            } else {
              // Si es fecha, se obtiene el valor actual
              const valueDate = new Date(value.createdAt);

              // Se filtra desde una fecha específica hasta otra fecha
              if (filter === 'from') {
                const fromDate = new Date(Search.data.formValues[filter]);
                if (valueDate < fromDate) return false;
                else return true;
              } else {
                const toDate = new Date(Search.data.formValues[filter]);
                if (valueDate > toDate) return false;
                else return true;
              }
            }
          });
        });

        // Se guardan los resultados en la variable que muestra
        // la lista en el template
        Search.data.filteredDonations = results;
      }

      // Actualizar en el DOM
      Search.update();
    },

    /**
     * @description Función que se encarga de escuchar los cambios en
     * los inputs, por medio del evento keyUp. Y valida los datos
     * correspondientes.
     * @param {KeyboardEvent} e Evento de teclado.
     */
    handleChange: (e: KeyboardEvent) => {
      // Obtiene el input
      const element = e.target;

      // Se confirma que sea un elemento input
      if (element instanceof HTMLInputElement) {
        // Por medio del id del input se obtiene el campo correspondiente,
        // para validar su valor
        switch (element.id) {
          case 'donor':
            // Se guarda el dato
            Search.data.formValues.donor = element.value;
            Search.methods.validateDonor(element.value);
            break;
          case 'idcard':
            Search.data.formValues.idcard = element.value;
            Search.methods.validateIdCard(element.value);
            break;
          case 'recipient':
            Search.data.formValues.recipient = element.value;
            Search.methods.validateRecipient(element.value);
            break;
          case 'from':
            Search.data.formValues.from = element.value;
            Search.methods.validateFrom(element.value);
            break;
          case 'to':
            Search.data.formValues.to = element.value;
            Search.methods.validateTo(element.value);
            break;
          default:
            break;
        }
      }
    },

    /**
     * @description Función para validar nombre del donador.
     * @param {string} name Nombre del donador.
     */
    validateDonor: (name: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.]{0,32}$/.test(name.trimStart())) {
        Search.data.formErrors.donor = false;
      } else {
        Search.data.formErrors.donor = true;
      }

      // Actualiza los cambios en el DOM
      Search.update();
    },

    /**
     * @description Función para validar nombre del beneficiario.
     * @param {string} name Nombre del beneficiario.
     */
    validateRecipient: (name: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.]{0,32}$/.test(name.trimStart())) {
        Search.data.formErrors.recipient = false;
      } else {
        Search.data.formErrors.recipient = true;
      }

      // Actualiza los cambios en el DOM
      Search.update();
    },

    /**
     * @description Función que valida la cédula.
     * @param {string} idcard Cédula ingresada.
     */
    validateIdCard: (idcard: string) => {
      // Se comprueba que sea dígitos y longitud 10
      if (/^[0-9]{10}$/.test(idcard.trim())) {
        let [suma, mul, chars] = [0, 2, idcard.length];

        // eslint-disable-next-line no-loops/no-loops
        for (let index = 0; index < chars - 1; index += 1) {
          let num = Number(idcard[index]) * mul;
          suma += num >= 10 ? num - 9 : num;
          mul = mul === 2 ? 1 : 2;
        }

        suma = suma - (suma % 10) + 10 - suma;
        suma = suma === 10 ? 0 : suma;

        if (suma === Number(idcard[chars - 1])) {
          Search.data.formErrors.idcard = false;
        } else {
          Search.data.formErrors.idcard = true;
        }
        // Si no se ingresó cédula, no marcar error
      } else if (idcard.length === 0) {
        Search.data.formErrors.idcard = false;
      } else {
        Search.data.formErrors.idcard = true;
      }

      // Actualizar en el DOM
      Search.update();
    },

    /**
     * @description Función que valida la fecha desde.
     * @param {string} date Fecha ingresada.
     */
    validateFrom: (date: string) => {
      // Si no se ingresó, no hay errores
      if (date.length !== 0) {
        const currentDate = new Date();
        const searchDate = new Date(date);

        // Si la fecha ingresada es mayor a la fecha actual, dar error
        if (searchDate < currentDate) {
          Search.data.formErrors.from = false;
        } else {
          Search.data.formErrors.from = true;
        }
      } else {
        Search.data.formErrors.from = false;
      }

      // Actualizar en el DOM
      Search.update();
    },

    /**
     * @description Función que valida la fecha hasta.
     * @param {string} date Fecha ingresada.
     */
    validateTo: (date: string) => {
      // Si no se ingresó, no hay errores
      if (date.length !== 0) {
        const currentDate = new Date();
        const searchDate = new Date(date);

        // Si la fecha ingresada es mayor a la fecha actual, dar error
        if (searchDate < currentDate) {
          Search.data.formErrors.to = false;
        } else {
          Search.data.formErrors.to = true;
        }
      } else {
        Search.data.formErrors.to = false;
      }

      // Actualizar en el DOM
      Search.update();
    },
  },

  /**
   * @description Función que retorna el template HTML para la página de búsqueda.
   * @returns {TemplateResult} Template de la página de búsqueda.
   */
  template: (): TemplateResult => {
    const { data, methods } = Search;

    const view = html`
      <h1>¡Busca donaciones!</h1>
      <section class="container-form-donate">
        <form @submit=${methods.submitForm} class="form-donate-search">
          <label for="donador" title="Tu nombre">
            <span
              class="title-input"
              style="${data.formErrors.donor ? 'color: var(--error);' : ''}"
              >Donador</span
            >
            <div
              class="main-donate ${data.formErrors.donor ? 'input-error' : ''}"
            >
              <i
                class="fas fa-user"
                style="${data.formErrors.donor ? 'color: var(--error);' : ''}"
              ></i>
              <input
                @keyup=${methods.handleChange}
                @change=${methods.handleChange}
                type="text"
                id="donor"
                placeholder="Ej. Jennifer"
              />
            </div>
            ${data.formErrors.donor
              ? html`<span style="color: var(--error);"
                  >Solo letras y máximo 32 caracteres</span
                >`
              : ''}
          </label>
          <label for="cedula" title="Tu cédula">
            <span
              class="title-input"
              style="${data.formErrors.idcard ? 'color: var(--error);' : ''}"
              >Cédula del donador</span
            >
            <div
              class="main-donate ${data.formErrors.idcard ? 'input-error' : ''}"
            >
              <i
                class="fas fa-id-card"
                style="${data.formErrors.idcard ? 'color: var(--error);' : ''}"
              ></i>
              <input
                type="text"
                id="idcard"
                @keyup=${methods.handleChange}
                @change=${methods.handleChange}
                placeholder="Escriba aquí"
                step="1"
                min="0"
              />
            </div>
            ${data.formErrors.idcard
              ? html`<span style="color: var(--error);"
                  >Ingrese una cédula válida</span
                >`
              : ''}
          </label>
          <label for="beneficiario" title="Nombre del beneficiario">
            <span
              class="title-input"
              style="${data.formErrors.recipient ? 'color: var(--error);' : ''}"
              >Beneficiario</span
            >
            <div
              class="main-donate ${data.formErrors.recipient
                ? 'input-error'
                : ''}"
            >
              <i
                class="fas fa-user"
                style="${data.formErrors.recipient
                  ? 'color: var(--error);'
                  : ''}"
              ></i>
              <input
                id="recipient"
                @keyup=${methods.handleChange}
                @change=${methods.handleChange}
                type="text"
                placeholder="Ej. Jesús"
              />
            </div>
            ${data.formErrors.recipient
              ? html`<span style="color: var(--error);"
                  >Solo letras y máximo 32 caracteres</span
                >`
              : ''}
          </label>

          <label for="fechaDesde" title="Fecha desde">
            <span
              class="title-input"
              style="${data.formErrors.from ? 'color: var(--error);' : ''}"
              >Desde</span
            >
            <div
              class="main-donate ${data.formErrors.from ? 'input-error' : ''}"
            >
              <i
                class="fas fa-calendar"
                style="${data.formErrors.from ? 'color: var(--error);' : ''}"
              ></i>
              <input
                id="from"
                @change=${methods.handleChange}
                type="date"
                class="input-calendar"
                min="2000-01-01"
              />
            </div>
            ${data.formErrors.from
              ? html`<span style="color: var(--error);"
                  >Coloque una fecha válida</span
                >`
              : ''}
          </label>

          <label for="fechaHasta" title="Fecha hasta">
            <span
              class="title-input"
              style="${data.formErrors.to ? 'color: var(--error);' : ''}"
              >Hasta</span
            >
            <div class="main-donate ${data.formErrors.to ? 'input-error' : ''}">
              <i
                class="fas fa-calendar"
                style="${data.formErrors.to ? 'color: var(--error);' : ''}"
              ></i>
              <input
                id="to"
                @change=${methods.handleChange}
                type="date"
                class="input-calendar"
              />
            </div>
            ${data.formErrors.to
              ? html`<span style="color: var(--error);"
                  >Coloque una fecha válida</span
                >`
              : ''}
          </label>

          <input
            type="submit"
            value="Consultar"
            class="button-send-donate"
            title="Boton para consultar"
          />

          <div class="container-card-search">
            ${data.donations.length > 0
              ? data.filteredDonations.length > 0
                ? data.filteredDonations.map(
                    (item) => html`<div class="item-search">
                      <label class="item-search-data">
                        <p><strong>Cédula:</strong></p>
                        <p>${item.idcard}</p>
                      </label>
                      <label class="item-search-data">
                        <p><strong>Donador:</strong></p>
                        <p>${item.donor}</p>
                      </label>
                      <label class="item-search-data">
                        <p><strong>Beneficiario:</strong></p>
                        <p>${item.recipient}</p>
                      </label>
                      ${item.type === 'material'
                        ? html`<label class="item-search-data">
                            <p><strong>Descripción:</strong></p>
                            <p>${item.description}</p>
                          </label>`
                        : html`<label class="item-search-data">
                            <p><strong>Monto:</strong></p>
                            <p>$${item.ammount}</p>
                          </label>`}

                      <label class="item-search-data">
                        <p><strong>Fecha:</strong></p>
                        <p>
                          ${new Date(item.createdAt).toLocaleString('es-ES', {
                            dateStyle: 'medium',
                          })}
                        </p>
                      </label>
                    </div>`
                  )
                : html`<span style="text-align: center;"
                    >No se encontraron resultados</span
                  >`
              : methods.renderDonations(DonationAPI.get)}
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
