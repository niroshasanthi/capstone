import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api'; // adjust if backend is hosted elsewhere

export const signupParent = async (parentData) => {
    return axios.post(`${API_BASE_URL}/parents/signup`, parentData);
};