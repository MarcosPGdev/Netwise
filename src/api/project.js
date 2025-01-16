import api from './index';

//create project
export const createProject = async (values) => {
    try {
        const response = await api.post('/project/createProject', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showProjects = async () => {
    try {
        const response = await api.get('/project/showProjects');
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getProjectInfo = async (id) => {
    try {
        const response = await api.get('/project/getProjectInfo', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showPosts = async (id) => {
    try {
        const response = await api.get('/project/showPosts', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getProjectAbilities = async (id) => {
    try {
        const response = await api.get('/project/getProjectAbilities', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const addProjectAbility = async (values) => {
    try {
        console.log(values);
        const response = await api.post('/project/addProjectAbility', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const deleteProjectAbility = async (id) => {
    try {
        const response = await api.delete('/project/deleteProjectAbility', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const joinProject = async (values) => {
    try {
        console.log(values);
        const response = await api.post('/project/joinProject', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const leaveProject = async (id) => {
    try {
        console.log(id);
        const response = await api.delete('/project/leaveProject', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const checkUser = async (id) => {
    try {
        const response = await api.get('/project/checkUser', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};


export const createDepartment = async (values) => {
    try {
        const response = await api.post('/project/createDepartment', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showDepartment = async (id) => {
    try {
        const response = await api.get('/project/showDepartment', { params: { id } });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const createTask = async (values) => {
    try {
        console.log(values);
        const response = await api.post('/project/createTask', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const changeTaskState = async (values) => {
    try {
        const response = await api.post('/project/changeTaskState', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const getTaskInfo = async (id) => {
    try {
        const response = await api.get('/project/getTaskInfo', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const fetchTasks = async (id) => {
    try {
        const response = await api.get('/project/fetchTasks', {params:{ id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showProjectNetwisers = async (id) => {
    try {
        const response = await api.get('/project/showProjectNetwisers', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const showProjectMessages = async (id) => {
    try {
        const response = await api.get('/project/showProjectMessages', {params: { id }});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};

export const sendProjectMessage = async (values) => {
    try {
        const response = await api.post('/project/sendProjectMessage', values);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
};