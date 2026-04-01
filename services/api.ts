import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.70.167:8080/api/v1',
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json'
    }
});
