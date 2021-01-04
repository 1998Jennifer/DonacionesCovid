// @flow
/**
 * @file Página de administración.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import { directive, html, render, Part, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/admin.css';
import { DonationAPI } from '../services/donationAPI';
import { DonationResponse } from '../interfaces/DonationResponse';

const Admin = {
  /**
   * @description Datos de la página de administración.
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
    modify: false,
    donations: [],
    filteredDonations: [],
  },

  /**
   * @description Métodos disponibles para la página de administración,
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
     * @description Función que a partir de un tipo Date, devolver la fecha
     * en el formato año-mes-día.
     * @param {Date} date Fecha tipo Date.
     * @returns {string} Fecha con el formato año-mes-día.
     */
    parseDate: (date: Date) => {
      // Obtener el año
      const year = date.getFullYear();

      // Obtener el mes, agregarle el 0 al principio, si es necesario
      let month = String(date.getMonth() + 1);
      month = month.length === 1 ? `0${month}` : month;

      //  Obtener el día, agregarle el 0 al principio, si es necesario
      let day = String(date.getDate());
      day = day.length === 1 ? `0${day}` : day;

      // Retornar la fecha
      return `${year}-${month}-${day}`;
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
        Admin.data.donations = data;
        Admin.data.filteredDonations = data;

        // Renderizar la lista con los datos
        part.setValue(html`<div class="item-admin">
            ${data.map(
              (donation) =>
                html`
                  <div class="item-admin-data">
                    <label class="item-search-admin">
                      <p>
                        <strong>Donador:</strong>
                      </p>
                      <input
                        type="text"
                        value=${donation.donor}
                        ?disabled=${!Admin.data.modify}
                      />
                    </label>
                    <label class="item-search-admin">
                      <p>
                        <strong>Beneficiario:</strong>
                      </p>
                      <input
                        type="text"
                        value=${donation.recipient}
                        ?disabled=${!Admin.data.modify}
                      />
                    </label>
                    ${donation.type === 'material'
                      ? html`<label class="item-search-admin">
                          <p>
                            <strong>Descripción:</strong>
                          </p>
                          <input
                            type="text"
                            value=${donation.description}
                            ?disabled=${!Admin.data.modify}
                          />
                        </label>`
                      : html`<label class="item-search-admin">
                          <p>
                            <strong>Monto:</strong>
                          </p>
                          <input
                            type="text"
                            value="$${donation.ammount}"
                            ?disabled=${!Admin.data.modify}
                          />
                        </label>`}

                    <label class="item-search-admin">
                      <p>
                        <strong>Fecha:</strong>
                      </p>
                      <input
                        type="date"
                        value=${Admin.methods.parseDate(
                          new Date(donation.createdAt)
                        )}
                        ?disabled=${!Admin.data.modify}
                        required
                      />
                    </label>

                    <div class="buttons-admin">
                      <button class="accept button-admin" title="Boton aceptar">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="deny button-admin" title="Boton denegar">
                        <i class="fas fa-times"></i>
                      </button>
                      <button
                        class="change button-admin"
                        title="Boton editar"
                        @click=${Admin.methods.handleEdit}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                `
            )}
          </div></section>
          <section class="grilla">
          <div class="grilla-item title"><p>Donador</p></div>
        <div class="grilla-item title"><p>Beneficiario</p></div>
        <div class="grilla-item title"><p>Descripción o monto</p></div>
        <div class="grilla-item title"><p>Fecha</p></div>
        <div class="grilla-item title"><p>Acciones</p></div>
              ${data.map(
                (donation) => html`
                  <div class="grilla-item">
                    <input
                      type="text"
                      value=${donation.donor}
                      ?disabled=${!Admin.data.modify}
                    />
                  </div>
                  <div class="grilla-item">
                    <input
                      type="text"
                      value=${donation.recipient}
                      ?disabled=${!Admin.data.modify}
                    />
                  </div>
                  ${donation.type === 'material'
                    ? html`
                        <div class="grilla-item">
                          <input
                            type="text"
                            value=${donation.description}
                            ?disabled=${!Admin.data.modify}
                          />
                        </div>
                      `
                    : html`
                        <div class="grilla-item">
                          <input
                            type="text"
                            value="$${donation.ammount}"
                            ?disabled=${!Admin.data.modify}
                          />
                        </div>
                      `}

                  <div class="grilla-item">
                    <input
                      type="date"
                      value=${Admin.methods.parseDate(
                        new Date(donation.createdAt)
                      )}
                      ?disabled=${!Admin.data.modify}
                      required
                    />
                  </div>
                  <div class="grilla-item">
                    <div class="button-grid">
                      <button class="accept button-admin" title="Boton aceptar">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="deny button-admin" title="Boton denegar">
                        <i class="fas fa-times"></i>
                      </button>
                      <button
                        class="change button-admin"
                        title="Boton modificar"
                        @click=${Admin.methods.handleEdit}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                `
              )}
          </section>
          `);

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
      Object.keys(Admin.data.formErrors).forEach((key: string) => {
        if (Admin.data.formErrors[key]) {
          errors = true;
        }
      });

      if (errors) return;

      // Arreglo con los filtros necesarios
      const filters = [];

      // Se recorre cada valor del formulario, y si contienen datos
      // se guarda el nombre del campo en el arreglo de filtros
      Object.keys(Admin.data.formValues).forEach((key: string) => {
        if (Admin.data.formValues[key].length !== 0) {
          filters.push(key);
        }
      });

      // Si no hay filtros, retorna todos los datos
      if (filters.length === 0) {
        Admin.data.filteredDonations = Admin.data.donations;
      } else {
        // Guarda los datos en una variable para filtrar
        let results = Admin.data.donations;

        // Por cada filtro, cambiará el arreglo
        filters.forEach((filter: string) => {
          results = results.filter((value: DonationResponse) => {
            // Expresión regular con el valor del formulario
            const regex = new RegExp(`${Admin.data.formValues[filter]}`, 'gi');

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
                const fromDate = new Date(Admin.data.formValues[filter]);
                if (valueDate < fromDate) return false;
                else return true;
              } else {
                const toDate = new Date(Admin.data.formValues[filter]);
                if (valueDate > toDate) return false;
                else return true;
              }
            }
          });
        });

        // Se guardan los resultados en la variable que muestra
        // la lista en el template
        Admin.data.filteredDonations = results;
      }

      // Actualizar en el DOM
      Admin.update();
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
            Admin.data.formValues.donor = element.value;
            Admin.methods.validateDonor(element.value);
            break;
          case 'idcard':
            Admin.data.formValues.idcard = element.value;
            Admin.methods.validateIdCard(element.value);
            break;
          case 'recipient':
            Admin.data.formValues.recipient = element.value;
            Admin.methods.validateRecipient(element.value);
            break;
          case 'from':
            Admin.data.formValues.from = element.value;
            Admin.methods.validateFrom(element.value);
            break;
          case 'to':
            Admin.data.formValues.to = element.value;
            Admin.methods.validateTo(element.value);
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
        Admin.data.formErrors.donor = false;
      } else {
        Admin.data.formErrors.donor = true;
      }

      // Actualiza los cambios en el DOM
      Admin.update();
    },

    /**
     * @description Función para validar nombre del beneficiario.
     * @param {string} name Nombre del beneficiario.
     */
    validateRecipient: (name: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.]{0,32}$/.test(name.trimStart())) {
        Admin.data.formErrors.recipient = false;
      } else {
        Admin.data.formErrors.recipient = true;
      }

      // Actualiza los cambios en el DOM
      Admin.update();
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
          Admin.data.formErrors.idcard = false;
        } else {
          Admin.data.formErrors.idcard = true;
        }
        // Si no se ingresó cédula, no marcar error
      } else if (idcard.length === 0) {
        Admin.data.formErrors.idcard = false;
      } else {
        Admin.data.formErrors.idcard = true;
      }

      // Actualizar en el DOM
      Admin.update();
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
          Admin.data.formErrors.from = false;
        } else {
          Admin.data.formErrors.from = true;
        }
      } else {
        Admin.data.formErrors.from = false;
      }

      // Actualizar en el DOM
      Admin.update();
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
          Admin.data.formErrors.to = false;
        } else {
          Admin.data.formErrors.to = true;
        }
      } else {
        Admin.data.formErrors.to = false;
      }

      // Actualizar en el DOM
      Admin.update();
    },

    /**
     * @description Función que se ejecuta al hacer clic en el botón
     * de editar.
     */
    handleEdit: () => {
      // Cambiar estado a modificar
      Admin.data.modify = !Admin.data.modify;

      // Actualizar en el DOM
      Admin.update();
    },
  },

  /**
   * @description Función que retorna el template HTML para la página de administración.
   * @returns {TemplateResult} Template de la página de administración.
   */
  template: (): TemplateResult => {
    const { data, methods } = Admin;
    const view = html`
      <h1>Administra donaciones</h1>
      <section class="container-section-admin">
        <div class="item-admin">
          <form @submit=${methods.submitForm} class="form-donate-search">
            <label for="donador" title="Nombre de donador">
              <span class="title-input" style="${
                data.formErrors.donor ? 'color: var(--error);' : ''
              }">Donador</span>
              <div class="main-donate ${
                data.formErrors.donor ? 'input-error' : ''
              }">
                <i class="fas fa-user" style="${
                  data.formErrors.donor ? 'color: var(--error);' : ''
                }"></i>
                <input type="text" id="donor" placeholder="Ej. Jennifer" @keyup=${
                  methods.handleChange
                }
                @change=${methods.handleChange} />
              </div>
              ${
                data.formErrors.donor
                  ? html`<span style="color: var(--error);"
                      >Solo letras y máximo 32 caracteres</span
                    >`
                  : ''
              }
            </label>
            <label for="cedula" title="Cédula">
              <span class="title-input" style="${
                data.formErrors.idcard ? 'color: var(--error);' : ''
              }">Cédula del donador</span>
              <div class="main-donate ${
                data.formErrors.idcard ? 'input-error' : ''
              }">
                <i class="fas fa-id-card" style="${
                  data.formErrors.idcard ? 'color: var(--error);' : ''
                }"></i>
                <input
                  type="text"
                  id="idcard"
                  @keyup=${methods.handleChange}
                @change=${methods.handleChange}
                  placeholder="Escriba aquí"
                />
              </div>
              ${
                data.formErrors.idcard
                  ? html`<span style="color: var(--error);"
                      >Ingrese una cédula válida</span
                    >`
                  : ''
              }
            </label>
            <label for="beneficiario" title="Beneficiario">
              <span class="title-input" style="${
                data.formErrors.recipient ? 'color: var(--error);' : ''
              }">Beneficiario</span>
              <div class="main-donate ${
                data.formErrors.recipient ? 'input-error' : ''
              }">
                <i class="fas fa-user" style="${
                  data.formErrors.recipient ? 'color: var(--error);' : ''
                }"></i>
                <input id="recipient" type="text" placeholder="Ej. Jesús" @keyup=${
                  methods.handleChange
                }
                @change=${methods.handleChange} />
              </div>
              ${
                data.formErrors.recipient
                  ? html`<span style="color: var(--error);"
                      >Solo letras y máximo 32 caracteres</span
                    >`
                  : ''
              }
            </label>

            <label for="fechaDesde" title="Fecha">
              <span class="title-input" style="${
                data.formErrors.from ? 'color: var(--error);' : ''
              }">Desde</span>
              <div class="main-donate ${
                data.formErrors.from ? 'input-error' : ''
              }">
                <i class="fas fa-calendar" style="${
                  data.formErrors.from ? 'color: var(--error);' : ''
                }"></i>
                <input id="from" type="date"
                @change=${
                  methods.handleChange
                } class="input-calendar" min="2000-01-01" />
              </div>
              ${
                data.formErrors.from
                  ? html`<span style="color: var(--error);"
                      >Coloque una fecha válida</span
                    >`
                  : ''
              }
            </label>

            <label for="fechaHasta" title="Fecha">
              <span class="title-input" style="${
                data.formErrors.to ? 'color: var(--error);' : ''
              }">Hasta</span>
              <div class="main-donate ${
                data.formErrors.to ? 'input-error' : ''
              }">
                <i class="fas fa-calendar" style="${
                  data.formErrors.to ? 'color: var(--error);' : ''
                }"></i>
                <input id="to" type="date" class="input-calendar" @change=${
                  methods.handleChange
                } min="2000-01-01"/>
              </div>
              ${
                data.formErrors.to
                  ? html`<span style="color: var(--error);"
                      >Coloque una fecha válida</span
                    >`
                  : ''
              }
            </label>

            <input type="submit" value="Consultar" class="button-send-donate" title="Boton para consultar" ?disabled=${
              data.modify
            } />
          </form>
        </div>
        ${
          data.donations.length > 0
            ? html`
          <div class="item-admin">
            ${data.filteredDonations.map(
              (donation) => html`
                <div class="item-admin-data">
                  <label class="item-search-admin">
                    <p>
                      <strong>Donador:</strong>
                    </p>
                    <input
                      type="text"
                      value=${donation.donor}
                      ?disabled=${!data.modify}
                    />
                  </label>
                  <label class="item-search-admin">
                    <p>
                      <strong>Beneficiario:</strong>
                    </p>
                    <input
                      type="text"
                      value=${donation.recipient}
                      ?disabled=${!data.modify}
                    />
                  </label>
                  ${donation.type === 'material'
                    ? html`<label class="item-search-admin">
                        <p>
                          <strong>Descripción:</strong>
                        </p>
                        <input
                          type="text"
                          value=${donation.description}
                          ?disabled=${!data.modify}
                        />
                      </label>`
                    : html`<label class="item-search-admin">
                        <p>
                          <strong>Monto:</strong>
                        </p>
                        <input
                          type="text"
                          value="$${donation.ammount}"
                          ?disabled=${!data.modify}
                        />
                      </label>`}

                  <label class="item-search-admin">
                    <p>
                      <strong>Fecha:</strong>
                    </p>
                    <input
                      type="date"
                      value=${methods.parseDate(new Date(donation.createdAt))}
                      ?disabled=${!data.modify}
                      required
                    />
                  </label>

                  <div class="buttons-admin">
                    <button class="accept button-admin" title="Boton aceptar">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="deny button-admin" title="Boton denegar">
                      <i class="fas fa-times"></i>
                    </button>
                    <button
                      class="change button-admin"
                      title="Boton editar"
                      @click=${methods.handleEdit}
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              `
            )}
          </div></section>
          <section class="grilla">
          <div class="grilla-item title"><p>Donador</p></div>
        <div class="grilla-item title"><p>Beneficiario</p></div>
        <div class="grilla-item title"><p>Descripción o monto</p></div>
        <div class="grilla-item title"><p>Fecha</p></div>
        <div class="grilla-item title"><p>Acciones</p></div>
          ${data.filteredDonations.map(
            (donation) => html`
              <div class="grilla-item">
                <input
                  type="text"
                  value=${donation.donor}
                  ?disabled=${!data.modify}
                />
              </div>
              <div class="grilla-item">
                <input
                  type="text"
                  value=${donation.recipient}
                  ?disabled=${!data.modify}
                />
              </div>
              ${donation.type === 'material'
                ? html`
                    <div class="grilla-item">
                      <input
                        type="text"
                        value=${donation.description}
                        ?disabled=${!data.modify}
                      />
                    </div>
                  `
                : html`
                    <div class="grilla-item">
                      <input
                        type="text"
                        value="$${donation.ammount}"
                        ?disabled=${!data.modify}
                      />
                    </div>
                  `}

              <div class="grilla-item">
                <input
                  type="date"
                  value=${methods.parseDate(new Date(donation.createdAt))}
                  ?disabled=${!data.modify}
                  required
                />
              </div>
              <div class="grilla-item">
                <div class="button-grid">
                  <button class="accept button-admin" title="Boton aceptar">
                    <i class="fas fa-check"></i>
                  </button>
                  <button class="deny button-admin" title="Boton denegar">
                    <i class="fas fa-times"></i>
                  </button>
                  <button
                    class="change button-admin"
                    title="Boton modificar"
                    @click=${methods.handleEdit}
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            `
          )}
          </section>
        `
            : methods.renderDonations(DonationAPI.get)
        }
        </div>
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
