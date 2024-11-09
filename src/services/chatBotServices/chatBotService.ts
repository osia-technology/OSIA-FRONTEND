import axios from 'axios';
import { API_URL } from '../base';

export const fetchMessages = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/user/messages`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'An unknown error occurred');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const backendError = error.response.data.errors;
            throw new Error(backendError.join(' ') || 'Failed to fecth messages');
        }
        throw new Error(error.message || 'Error fetching messages');
    }
}

export const sendMessage = async (token: string, message: string) => {

    try {
        const response = await axios.post(`${API_URL}/send-message`, { "message": message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'An unknown error occurred');
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const backendError = error.response.data.errors;
            throw new Error(backendError.join(' ') || 'Failed to fecth messages');
        }
        throw new Error(error.message || 'Error fetching messages');
    }
}