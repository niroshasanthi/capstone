import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api'; // backend URL

export const loginParent = async (parentData) => {
    return axios.post(`${API_BASE_URL}/parents/login`, parentData);
};