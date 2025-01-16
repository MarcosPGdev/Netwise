import api from './index';

//create community
export const createCommunity = async (values) => {
    try {
        const response = await api.post('/community/createCommunity', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showCommunities = async () => {
    try {
        const response = await api.get('/community/showCommunities');
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getCommunityInfo = async (id) => {
    try {
        const response = await api.get('/community/getCommunityInfo', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showPosts = async (id) => {
    try {
        const response = await api.get('/community/showPosts', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getCommunityAbilities = async (id) => {
    try {
        const response = await api.get('/community/getCommunityAbilities', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const addCommunityAbility = async (values) => {
    try {
        console.log(values);
        const response = await api.post('/community/addCommunityAbility', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const deleteCommunityAbility = async (id) => {
    try {
        const response = await api.delete('/community/deleteCommunityAbility', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const joinCommunity = async (values) => {
    try {
        console.log(values);
        const response = await api.post('/community/joinCommunity', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const leaveCommunity = async (id) => {
    try {
        console.log(id);
        const response = await api.delete('/community/leaveCommunity', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const checkUser = async (id) => {
    try {
        const response = await api.get('/community/checkUser', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const createEvent = async (values) => {
    try {
        const response = await api.post('/community/createEvent', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showCommunityNetwisers = async (id) => {
    try {
        const response = await api.get('/community/showCommunityNetwisers', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};



export const showCommunityMessages = async (id) => {
    try {
        const response = await api.get('/community/showCommunityMessages', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const sendCommunityMessage = async (values) => {
    try {
        const response = await api.post('/community/sendCommunityMessage', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};