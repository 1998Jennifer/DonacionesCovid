// @flow
/**
 * @file Página de Log In.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

// Autocompletado y sintaxis de HTML para los template literals
import { html, render, TemplateResult } from 'lit-html';
import { app } from '../..';
import '../../../css/login.css';

const LogIn = {
  /**
   * @description Datos de la página de login.
   */
  data: {},

  /**
   * @description Métodos disponibles para la página de login,
   * y que cambiarán datos dentro del template.
   */
  methods: {},

  /**
   * @description Función que retorna el template HTML para la página de login.
   * @returns {TemplateResult} Template de la página de login.
   */
  template: (): TemplateResult => {
    const view = html`
            <main class="main-form">
        <div class="form-container">
          <h1>¡Bienvenido!</h1>
          <form class="form-login">
            <label for="Email">
              <span>Email</span>
              <div class="main-input-container">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Ej. correo@dominio.com"
                />
              </div>
            </label>
            <label for="password">
              <span>Contraseña</span>
              <div class="main-input-container">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Escriba aquí..."
                />
                <i class="fas fa-eye"></i>
              </div>
            </label>
            <input type="submit" value="Iniciar sesión" class="button-send" />
          </form>
          <div class="line">
            <div></div>
            <p>...o si quizás no tienes cuenta</p>
            <div></div>
          </div>
        </div>

        <div class="form-container">
          <h1>Regístrate</h1>
          <form class="form-login">
            <label for="Email">
              <span>Email</span>
              <div class="main-input-container">
                <i class="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Ej. correo@dominio.com"
                />
              </div>
            </label>
            <label for="usuario">
              <span>Usuario</span>
              <div class="main-input-container user">
              <i class="fas fa-user"></i>
              <input
                  type="text"
                  id="usuario"
                  placeholder="Ej. usuario123"
              />
              </div>
              <span class="span-letter">Máximo 16 caracteres</span>
            </label>
            <label for="password" class="label-pass">
              <span>Contraseña</span>
              <div class="main-input-container user">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Escriba aquí..."
                />
                <i class="fas fa-eye"></i>
                </div>
                <span class="span-letter">La contraseña debe contener al menos un caracter <br> especial, un número, una letra minúscula y mayúscula</span>
            </label>
            <input type="submit" value="Registrarse" class="button-send-register"/>
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
