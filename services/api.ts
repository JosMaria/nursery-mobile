import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.100.57:8080/api/v1',
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json'
    }
});
