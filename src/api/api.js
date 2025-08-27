import axios from 'axios';

const BASE_URL = 'http://localhost:8083/api/children'; // Your child microservice

export const loginChild = async (credentials) => {
  return await axios.post(`${BASE_URL}/login`, credentials);
};
