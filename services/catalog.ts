import { api } from './api';

export const catalogService = {
    fetchPlantCards: async () => {
        const { data } = await api.get<PlantCardResponse[]>('/plants/cards');
        return data;
    }
};

interface PlantCardResponse {
    id: number;
    scientific_name: string;
    common_name: string;
    price: number;
    url: string;
};
