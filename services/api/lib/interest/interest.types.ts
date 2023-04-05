// Dependencies
import { Interest } from 'services/api/types/Interest';

// Get All Qualities Types
/**
 * Interfaz que representa la respuesta de una solicitud para obtener una lista de intereses.
 * @interface GetInterestListResponse
 */
export interface GetInterestListResponse {
    /**
     * Indica si la solicitud fue exitosa o no.
     * @type {boolean}
     */
    status: boolean;
    /**
     * Mensaje asociado con la respuesta, como un mensaje de error o de éxito.
     * @type {string}
     */
    message: string;
    /**
     * Datos de la respuesta, en este caso un objeto con una sola propiedad "interests" de tipo "Interest".
     * @type {Object}
     * @property {Interest} interests - Objeto que contiene la lista de intereses.
     */
    data: {
        interests: Interest;
    };
}
