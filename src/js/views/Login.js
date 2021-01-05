// @flow
/**
 * @file Página de Log In.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html, render, TemplateResult } from 'lit-html';
import { app } from '..';
import '../../css/login.css';

const LogIn = {
  /**
   * @description Datos de la página de login.
   */
  data: {
    loginFormValues: {
      email: '',
      password: '',
    },
    loginFormErrors: {
      email: false,
      password: false,
    },
    signupFormValues: {
      email: '',
      user: '',
      password: '',
    },
    signupFormErrors: {
      email: false,
      user: false,
      password: false,
    },
  },

  /**
   * @description Métodos disponibles para la página de login,
   * y que cambiarán datos dentro del template.
   */
  methods: {
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
        let valid;
        switch (element.id) {
          case 'log-email':
            // Se guarda el dato
            LogIn.data.loginFormValues.email = element.value;

            // Valida
            valid = LogIn.methods.validateEmail(element.value);
            if (valid) LogIn.data.loginFormErrors.email = false;
            else LogIn.data.loginFormErrors.email = true;
            break;
          case 'log-password':
            LogIn.data.loginFormValues.password = element.value;

            valid = LogIn.methods.validatePassword(element.value);
            if (valid) LogIn.data.loginFormErrors.password = false;
            else LogIn.data.loginFormErrors.password = true;
            break;
          case 'sig-email':
            LogIn.data.signupFormValues.email = element.value;

            valid = LogIn.methods.validateEmail(element.value);
            if (valid) LogIn.data.signupFormErrors.email = false;
            else LogIn.data.signupFormErrors.email = true;
            break;
          case 'sig-user':
            LogIn.data.signupFormValues.user = element.value;

            valid = LogIn.methods.validateUser(element.value);
            if (valid) LogIn.data.signupFormErrors.user = false;
            else LogIn.data.signupFormErrors.user = true;
            break;
          case 'sig-password':
            LogIn.data.signupFormValues.password = element.value;

            valid = LogIn.methods.validatePassword(element.value);
            if (valid) LogIn.data.signupFormErrors.password = false;
            else LogIn.data.signupFormErrors.password = true;
            break;
          default:
            break;
        }
      }

      // Actualiza en el DOM
      LogIn.update();
    },

    /**
     * @description Función que se encarga de validar email.
     * @param {string} email Email ingresado.
     * @returns {boolean} Resultado de la validación.
     */
    validateEmail: (email: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email.trimStart()
        )
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * @description Función que se encarga de validar contraseñas.
     * @param {string} password Contraseña ingresada.
     * @returns {boolean} Resultado de la validación.
     */
    validatePassword: (password: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/.test(
          password.trimStart()
        )
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * @description Función que se encarga de validar usuarios.
     * @param {string} user Usuario ingresado.
     * @returns {boolean} Resultado de la validación.
     */
    validateUser: (user: string) => {
      // Se compara con una expresión regular, si la cumple no hay error
      if (/^[a-zA-Z0-9]{1,16}$/.test(user.trimStart())) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * @description Manejador de evento de submit.
     * @param {Event} event Evento de submit.
     */
    handleSubmit: (event: Event) => {
      // Previene recargar la página
      event.preventDefault();
    },
  },

  /**
   * @description Función que retorna el template HTML para la página de login.
   * @returns {TemplateResult} Template de la página de login.
   */
  template: (): TemplateResult => {
    const { data, methods } = LogIn;
    const view = html`
      <main class="main-form">
        <div class="form-container">
          <h1>¡Bienvenido!</h1>
          <form @submit=${methods.handleSubmit} class="form-login">
            <label for="log-email" title="Email">
              <span style="${
                data.loginFormErrors.email ? 'color: var(--error);' : ''
              }">Email</span>
              <div class="main-input-container ${
                data.loginFormErrors.email ? 'input-error' : ''
              }">
                <i class="fas fa-envelope" style="${
                  data.loginFormErrors.email ? 'color: var(--error);' : ''
                }"></i>
                <input
                  type="email"
                  id="log-email"
                  placeholder="Ej. correo@dominio.com"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  required
                />
              </div>
            </label>
            <label for="log-password" title="Contraseña">
              <span style="${
                data.loginFormErrors.password ? 'color: var(--error);' : ''
              }">Contraseña</span>
              <div class="main-input-container ${
                data.loginFormErrors.password ? 'input-error' : ''
              }">
                <i class="fas fa-lock" style="${
                  data.loginFormErrors.password ? 'color: var(--error);' : ''
                }"></i>
                <input
                  type="password"
                  id="log-password"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  placeholder="Escriba aquí..."
                  required
                />
                <i class="fas fa-eye" style="${
                  data.loginFormErrors.password ? 'color: var(--error);' : ''
                }"></i>
              </div>
            </label>
            <input type="submit" value="Iniciar sesión" class="button-send" title="Boton iniciar sesión" />
          </form>
          <div class="line">
            <div></div>
            <p>...o si quizás no tienes cuenta</p>
            <div></div>
          </div>
        </div>

        <div class="form-container">
          <h1>Regístrate</h1>
          <form @submit=${methods.handleSubmit} class="form-login">
            <label for="sig-email" title="Escribe tu email">
              <span style="${
                data.signupFormErrors.email ? 'color: var(--error);' : ''
              }">Email</span>
              <div class="main-input-container ${
                data.signupFormErrors.email ? 'input-error' : ''
              }">
                <i class="fas fa-envelope" style="${
                  data.signupFormErrors.email ? 'color: var(--error);' : ''
                }"></i>
                <input
                  type="email"
                  id="sig-email"
                  placeholder="Ej. correo@dominio.com"
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  required
                />
              </div>
            </label>
            <label for="sig-user" title="Escribe tu usuario">
              <span style="${
                data.signupFormErrors.user ? 'color: var(--error);' : ''
              }">Usuario</span>
              <div class="main-input-container user ${
                data.signupFormErrors.user ? 'input-error' : ''
              }">
              <i class="fas fa-user" style="${
                data.signupFormErrors.user ? 'color: var(--error);' : ''
              }"></i>
              <input
                  type="text"
                  id="sig-user"
                  placeholder="Ej. usuario123"
                  required
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
              />
              </div>
              ${
                data.signupFormErrors.user
                  ? html`<span class="span-letter" style="color: var(--error);"
                      >Máximo 16 caracteres</span
                    >`
                  : html`<span class="span-letter">Máximo 16 caracteres</span>`
              }
            </label>
            <label for="sig-password" class="label-pass" title="Escribe una contraseña">
              <span style="${
                data.signupFormErrors.password ? 'color: var(--error);' : ''
              }">Contraseña</span>
              <div class="main-input-container user ${
                data.signupFormErrors.password ? 'input-error' : ''
              }">
                <i class="fas fa-lock" style="${
                  data.signupFormErrors.password ? 'color: var(--error);' : ''
                }"></i>
                <input
                  type="password"
                  id="sig-password"
                  placeholder="Escriba aquí..."
                  @keyup=${methods.handleChange}
                  @change=${methods.handleChange}
                  required
                />
                <i class="fas fa-eye" style="${
                  data.signupFormErrors.password ? 'color: var(--error);' : ''
                }"></i>
                </div>
                ${
                  data.signupFormErrors.password
                    ? html`<span
                        class="span-letter"
                        style="color: var(--error);"
                        >La contraseña debe contener al menos un caracter <br />
                        especial, un número, una letra minúscula y
                        mayúscula</span
                      >`
                    : html`<span class="span-letter"
                        >La contraseña debe contener al menos un caracter <br />
                        especial, un número, una letra minúscula y
                        mayúscula</span
                      >`
                }
            </label>
            <input type="submit" value="Registrarse" class="button-send-register" title="Boton para registrarse"/>
          </form>
          </div>
        </div>
      </main>
    `;
    return view;
  },

  /**
   * @description Función que actualiza el template, se utiliza cuando cambian los datos.
   */
  update: () => {
    render(LogIn.template(), app);
  },
};

export default LogIn;
