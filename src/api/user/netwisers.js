import api from '../index';

export const showNetwisers = async () => {
    try {
        const response = await api.get('/netwisers/showNetwisers');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};


export const changeFollowState = async (id) => {
    try {
        const response = await api.get('/netwisers/changeFollowState', {params: { id: id } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};
