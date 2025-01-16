import api from '../index';

export const getInfo = async (id) => {
    try {
        const response = await api.get('/profile/getProfile', {params: { id: id } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

export const patchImg = async (values) => {
    console.log("patch img");
    console.log(values);
    try {
        const response = await api.post('/profile/patchImg', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
};

export const patchInfo = async (values) => {
    try {
        const response = await api.patch('/profile/patchInfo', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
};

export const patchInterests = async (values) => {
    try {
        const response = await api.patch('/profile/patchInterests', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
};

export const getWorks = async (value) => {
    try {
        const response = await api.get(`/profile/getWorks`, {params: { search: value } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
}

export const patchUbi = async (values) => {
    console.log(values);
    try {
        const response = await api.patch('/profile/patchUbi', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
};


export const getExperience = async (value) => {
    try {
        const response = await api.get(`/profile/getExperience`, {params: { id: value } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
}

export const addExperience = async (values) => {
    try {
        const response = await api.post('/profile/addExperience', values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const updateExperience = async (values) => {
    try {
        const response = await api.patch('/profile/updateExperience', values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const deleteExperience = async (values) => {
    try {
        const response = await api.delete('/profile/deleteExperience',  {data: {values}});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}


export const getAbilities = async (value) => {
    try {
        const response = await api.get(`/profile/getAbilities`, {params: { search: value } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
}

export const addAbility = async (values) => {
    try {
        const response = await api.post('/profile/addAbility', values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const deleteAbility = async (values) => {
    try {
        const response = await api.delete('/profile/deleteAbility',  {data: {values}});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}



export const getLenguage = async (value) => {
    try {
        const response = await api.get(`/profile/getLenguage`, {params: { search: value } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
}

export const addLenguage = async (values) => {
    try {
        const response = await api.post('/profile/addLenguage', values);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const deleteLenguage = async (values) => {
    try {
        const response = await api.delete('/profile/deleteLenguage',  {data: {values}});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}


export const showUserMessages = async (id) => {
    try {
        const response = await api.get('/profile/showUserMessages', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const sendUserMessage = async (values) => {
    try {
        const response = await api.post('/profile/sendUserMessage', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getPosts = async (id) => {
    try {
        const response = await api.get('/profile/getPosts', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getProjects = async (id) => {
    try {
        const response = await api.get('/profile/getProjects', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getCommunities = async (id) => {
    try {
        const response = await api.get('/profile/getCommunities', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getNetwisers = async (id) => {
    try {
        const response = await api.get('/profile/getNetwisers', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};