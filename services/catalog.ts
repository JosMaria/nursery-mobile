import { api } from './api';

export const catalogService = {
    fetchPlantCards: async () => {
        const { data } = await api.get<PlantCardResponse[]>('/plants/cards');
        return data;
    }
};

export interface PlantCardResponse {
    id: number;
    scientific_name: string;
    common_name: string;
    price: number;
    url: string;
};

export interface PlantDetailsResponse {
    id: number;
    scientific_name: string;
    price: number;
    updated_at: string;
    taxonomy: {
        division: string;
        class: string;
        order: string;
        family: string;
        genus: string;
        species: string;
    }
    urls: string[];
    common_names: {
        id: number,
        name: string;
        country: string;
        place: string
    }[];
}
