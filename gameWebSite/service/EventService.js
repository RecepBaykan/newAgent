import axios from 'axios';

const BASE_URL = 'http://128.0.1.196:9090/api/event';

export const listModel = () => axios.get(BASE_URL);

export const createModel = (news) => axios.post(BASE_URL, news);

export const getModel = (id) => axios.get(BASE_URL + "/" + id);

export const updateModel = (id, news) => axios.put(BASE_URL + '/' + id, news);

export const deleteModel = (id) => axios.delete(BASE_URL + '/' + id);
