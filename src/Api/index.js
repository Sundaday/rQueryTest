import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: { Authorization: process.env.REACT_APP_TOKEN }
})

export const addNewPost = async ({ title, body }) => {
    try {
        const { data } = await api.post(`users/1445/posts`, { title, body });
        return data;
    } catch (error) {
        throw Error(error.message);
    }
}

export const fetchPost = async (id) => {
    try {
        const { data } = await api.get(`posts/${id}`)
        return data;
    } catch (err) {
        throw Error("Unable to fetch post: " + err.message)
    }
}

export const fetchPosts = async (id) => {
    try {
        const { data } = await api.get(`users/1445/posts?page=` + id)
        return data;
    } catch (err) {
        throw Error("Unable to fetch posts: " + err.message)
    }
}
