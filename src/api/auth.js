import api from './index';

//login
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

//register
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        console.log(response);
        return response.data;
    }   catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};
