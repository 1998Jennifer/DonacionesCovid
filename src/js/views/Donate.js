// @flow
/**
 * @file Página de donación.
 *
 */

import { html, render, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/donar.css';
import { DonationAPI } from '../services/donationAPI';
import { DonationRequest } from '../interfaces/DonationRequest';

const Donate = {
  /**
   * @description Datos de la página de donación.
   */
  data: {
    formValues: {
      donor: '',
      idcard: '',
      recipient: '',
      description: '',
      money: '',
    },
    formErrors: {
      donor: false,
      idcard: false,
      recipient: false,
      description: false,
      money: false,
    },
    optionSelected: 'food',
    showModal: false,
  },

  /**
   * @description Métodos disponibles para la página de donación,
   * y que cambiarán datos dentro del template.
   */
  methods: {
    /**
     * @description Función que se llama cada vez que una opción cambia,
     * para guardar el estado de la nueva opción.
     */
    handleOptions() {
      // Se revisa el id del div, y se selecciona la opción correspondiente
      switch (this.id) {
        case 'food':
          Donate.data.optionSelected = 'food';
          break;
        case 'material':
          Donate.data.optionSelected = 'material';
          break;
        case 'money':
          Donate.data.optionSelected = 'money';
          break;
        default:
          break;
      }

      // Actualiza en el DOM
      Donate.update();
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
            Donate.data.formValues.donor = element.value;
            Donate.methods.validateDonor(element.value);
            break;
          case 'idcard':
            Donate.data.formValues.idcard = element.value;
            Donate.methods.validateIdCard(element.value);
            break;
          case 'recipient':
            Donate.data.formValues.recipient = element.value;
            Donate.methods.validateRecipient(element.value);
            break;
          case 'description':
            Donate.data.formValues.description = element.value;
            Donate.methods.validateDescription(element.value);
            break;
          case 'money':
            Donate.data.formValues.money = element.value;
            Donate.methods.validateAmmount(element.value);
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
      if (/^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.]{2,32}$/.test(name.trimStart())) {
        Donate.data.formErrors.donor = false;
      } else {
        Donate.data.formErrors.donor = true;
      }

      // Actualiza los cambios en el DOM
      Donate.update();
    },

    /**
     * @description Función para validar nombre del beneficiario.
     * @param {string} name Nombre del beneficiario.
     */
    validateRecipient: (name: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.]{2,32}$/.test(name.trimStart())) {
        Donate.data.formErrors.recipient = false;
      } else {
        Donate.data.formErrors.recipient = true;
      }

      // Actualiza los cambios en el DOM
      Donate.update();
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
          Donate.data.formErrors.idcard = false;
        } else {
          Donate.data.formErrors.idcard = true;
        }
      } else {
        Donate.data.formErrors.idcard = true;
      }

      // Actualizar en el DOM
      Donate.update();
    },

    /**
     * @description Función para validar la descripción de la donación.
     * @param {string} description Descripción de la donación.
     */
    validateDescription: (description: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (
        /^[0-9a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s.,'":;!?_-]{2,120}$/.test(
          description.trimStart()
        )
      ) {
        Donate.data.formErrors.description = false;
      } else {
        Donate.data.formErrors.description = true;
      }

      // Actualiza los cambios en el DOM
      Donate.update();
    },

    /**
     * @description Función para validar el monto de la donación.
     * @param {string} money Monto de la donación.
     */
    validateAmmount: (money: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[0-9]{1,4}$/.test(money.trimStart())) {
        Donate.data.formErrors.money = false;
      } else {
        Donate.data.formErrors.money = true;
      }

      // Actualiza los cambios en el DOM
      Donate.update();
    },

    /**
     * @description Manejador del evento de submit del formulario. Crea la donación
     * en el caso de no encontrar errores.
     * @param {Event} event Evento de submit
     */
    handleSubmit: (event: Event) => {
      // Previene recargar la página
      event.preventDefault();

      // Revisa si hay errores
      let errors = false;
      Object.keys(Donate.data.formErrors).forEach((key) => {
        if (Donate.data.formErrors[key]) errors = true;
      });

      if (errors) return;

      // Objeto de donación
      const donation: DonationRequest = {
        idcard: Donate.data.formValues.idcard,
        donor: Donate.data.formValues.donor,
        recipient: Donate.data.formValues.recipient,
        type: Donate.data.optionSelected === 'money' ? 'money' : 'material',
        description: Donate.data.formValues.description,
        ammount: Donate.data.formValues.money,
        createdAt: new Date().toISOString(),
      };

      // Se crea la donación
      const donationRequest = DonationAPI.post(donation);

      // Si la petición se llevó a cabo muestra el modal
      if (donationRequest !== null) Donate.data.showModal = true;

      // Actualiza el DOM
      Donate.update();
    },

    /**
     * @description Función que cierra el modal.
     */
    handleModalClick: () => {
      // Cambiar estado de modal
      Donate.data.showModal = false;

      // Actualiza el DOM
      Donate.update();
    },
  },

  /**
   * @description Función que retorna el template HTML para la página de donación.
   * @returns {TemplateResult} Template de la página de donación.
   */
  template: (): TemplateResult => {
    const { data, methods } = Donate;
    const view = html`
      <div class="modal ${!data.showModal ? 'hidden' : ''}">
        <h2>La donación se realizó correctamente</h2>
        <button @click=${methods.handleModalClick} class="modal-button">
          Entendido
        </button>
      </div>
      <h1 class="${data.showModal ? 'blurred' : ''}">¿Qué deseas donar?</h1>
      <div class="prueba ${data.showModal ? 'blurred' : ''}">
        <section class="container-flex">
          <div class="item" title="Dona comida">
            <div
              @click=${methods.handleOptions}
              id="food"
              class="item-card ${data.optionSelected === 'food'
                ? 'option-selected'
                : ''}"
            >
              <i class="fas fa-hamburger"></i>
              <a>Comida</a>
            </div>
          </div>
          <div class="item" title="Dona un bien material">
            <div
              @click=${methods.handleOptions}
              id="material"
              class="item-card ${data.optionSelected === 'material'
                ? 'option-selected'
                : ''}"
            >
              <i class="fas fa-couch"></i>
              <a>Objeto</a>
            </div>
          </div>
          <div class="item" title="Dona dinero">
            <div
              @click=${methods.handleOptions}
              id="money"
              class="item-card ${data.optionSelected === 'money'
                ? 'option-selected'
                : ''}"
            >
              <i class="fas fa-money-bill"></i>
              <a>Dinero</a>
            </div>
          </div>
        </section>

        <section class="container-form-donate">
          <form @submit=${methods.handleSubmit} class="form-donate">
            <label for="donor" title="Escribe tu nombre">
              <span
                class="title-input"
                style="${data.formErrors.donor ? 'color: var(--error);' : ''}"
                >Nombre del donador</span
              >
              <div
                class="main-donate ${data.formErrors.donor
                  ? 'input-error'
                  : ''}"
              >
                <i
                  class="fas fa-user"
                  style="${data.formErrors.donor ? 'color: var(--error);' : ''}"
                ></i>
                <input
                  type="text"
                  id="donor"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  placeholder="Ej. Jennifer"
                  required
                />
              </div>
              ${data.formErrors.donor
                ? html`<span style="color: var(--error);"
                    >Mínimo 2 y máximo 32 caracteres</span
                  >`
                : html`<span>Mínimo 2 y máximo 32 caracteres</span>`}
            </label>

            <label for="idcard" title="Escribe tu cedula">
              <span
                class="title-input"
                style="${data.formErrors.idcard ? 'color: var(--error);' : ''}"
                >Cedula del donador</span
              >
              <div
                class="main-donate ${data.formErrors.idcard
                  ? 'input-error'
                  : ''}"
              >
                <i
                  class="fas fa-id-card"
                  style="${data.formErrors.idcard
                    ? 'color: var(--error);'
                    : ''}"
                ></i>
                <input
                  type="number"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  id="idcard"
                  placeholder="Escriba aquí"
                  required
                />
              </div>
              ${data.formErrors.idcard
                ? html`<span style="color: var(--error);"
                    >Coloque una cédula válida</span
                  >`
                : html`<span>Solo números</span>`}
            </label>
            <label for="recipient" title="Escribe nombre del beneficiario">
              <span
                class="title-input"
                style="${data.formErrors.recipient
                  ? 'color: var(--error);'
                  : ''}"
                >Nombre del beneficiario</span
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
                  type="text"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  id="recipient"
                  placeholder="Ej. Jesús"
                  required
                />
              </div>
              ${data.formErrors.recipient
                ? html`<span style="color: var(--error);"
                    >Mínimo 2 y máximo 32 caracteres</span
                  >`
                : html`<span>Mínimo 2 y máximo 32 caracteres</span>`}
            </label>

            ${data.optionSelected === 'money'
              ? html`
                  <label for="money" title="Ejemplo: $45.00">
                    <span
                      class="title-input"
                      style="${data.formErrors.money
                        ? 'color: var(--error);'
                        : ''}"
                      >Monto de la donación</span
                    >
                    <div
                      class="main-donate ${data.formErrors.money
                        ? 'input-error'
                        : ''}"
                    >
                      <i
                        class="fas fa-dollar-sign"
                        style="${data.formErrors.money
                          ? 'color: var(--error);'
                          : ''}"
                      ></i>
                      <input
                        type="number"
                        @keyup=${methods.handleChange}
                        @change=${methods.handleChange}
                        id="money"
                        placeholder="Ej. 10"
                        required
                      />
                    </div>
                    ${data.formErrors.money
                      ? html`<span style="color: var(--error);"
                          >Ingrese una cantidad válida</span
                        >`
                      : html`<span>Solo números</span>`}
                  </label>
                `
              : html`
                  <label for="description" title="Ejemplo: arroz">
                    <span
                      class="title-input"
                      style="${data.formErrors.description
                        ? 'color: var(--error);'
                        : ''}"
                      >Descripción de la donación</span
                    >
                    <div
                      class="main-donate ${data.formErrors.description
                        ? 'input-error'
                        : ''}"
                    >
                      <i
                        class="fas fa-comment-alt"
                        style="${data.formErrors.description
                          ? 'color: var(--error);'
                          : ''}"
                      ></i>
                      <input
                        type="text"
                        @keyup=${methods.handleChange}
                        @change=${methods.handleChange}
                        id="description"
                        placeholder="Ej. Atún, arroz, ropa, etc."
                        required
                      />
                    </div>
                    ${data.formErrors.description
                      ? html`<span style="color: var(--error);"
                          >Escriba una descripción válida</span
                        >`
                      : html`<span>Máximo 120 caracteres</span>`}
                  </label>
                `}

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
