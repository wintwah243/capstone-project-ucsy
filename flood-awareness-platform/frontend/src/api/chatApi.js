import axios from 'axios';

const API_URL = 'http://localhost:5001/api/chat'; 

export const askAIAssistant = async (question, context) => {
    try {
        const response = await axios.post(`${API_URL}/ask`, { question, context });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};