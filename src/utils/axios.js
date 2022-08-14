import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: { 'Access-Control-Allow-Origin': '*' },
    responseType: 'json'
});

// interceptor for http
API.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default API;