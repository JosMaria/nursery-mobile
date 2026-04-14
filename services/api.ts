import { ApiConfig } from '@/constants/enviroment';
import axios from 'axios';

export const api = axios.create({
    baseURL: `${ApiConfig.domain}/api/v1`,
    timeout: 10_000,
    headers: {
			'Content-Type': 'application/json',
    },
});
