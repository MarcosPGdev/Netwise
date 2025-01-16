import api from './index';

//create post
export const createPost = async (values) => {
    try {
        const response = await api.post('/post/createPost', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

export const showPosts = async () => {
    try {
        const response = await api.get('/post/showPosts');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

export const getPostData = async (id) => {
    try {
        const response = await api.get('/post/getPostData', {params:{id}});
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

export const valoratePost = async (postId) => {
    try {
        const response = await api.post('/post/valoratePost', postId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};

export const postComment = async (values) => {
    try {
        const response = await api.post('/post/postComment', values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
};