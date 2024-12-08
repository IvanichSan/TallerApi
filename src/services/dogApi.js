import axios from 'axios';

const API_BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = 'tu-api-key-aqui'; // Coloca aquí tu clave directamente

export const fetchDogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/breeds`, {
            headers: {
                'x-api-key': 'live_G6DBHHUwqo04xa0Prn1ZCvOjJjz9HKpPcyDWpWXpNZGlfFhNmEspJKsZMAhPJOlq', // La clave se envía en los encabezados
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error.response || error.message);
        throw error;
    }
};
