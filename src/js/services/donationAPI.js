// @flow
/**
 * @file Archivo con métodos para obtención y manipulación
 * de datos de donaciones.
 * @author Jesús Moreira <jesusromc8@gmail.com>
 */

import axios from 'axios';
import { DonationResponse } from '../interfaces/DonationResponse';
import { dummyDonations } from '../data/dummyDonations';

// Endpoint de MockAPI
const donationEndpoint =
  'https://5fed4901595e420017c2c68c.mockapi.io/api/v1/donations';

/**
 * @description Clase con funciones para manipular los datos de
 * donaciones.
 */
export class DonationAPI {
  constructor() {}

  /**
   * @description Función que obtiene todos los datos de donaciones
   * del MockAPI, en el caso de que no esté disponible, se utilizan datos
   * de prueba.
   * @returns {Promise<DonationResponse[]>} Promesa con los datos obtenidos.
   */
  static async get(): Promise<DonationResponse[]> {
    try {
      // Realiza la petición con axios
      const results = await axios.get(donationEndpoint);

      // Devuelve los datos obtenidos
      return results.data;
    } catch {
      // En caso de error, devuelve datos de prueba
      return dummyDonations;
    }
  }
}
