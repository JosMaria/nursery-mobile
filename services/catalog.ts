import { api } from './api';

export const catalogService = {
    fetchPlantCards: async () => {
        const { data } = await api.get<PlantCardResponse[]>('/plants/cards');
        return data;
    },
    fetchPlantDetailsById: async (plantId: number) => {
        const { data } = await api.get<PlantDetails>(`/plants/${plantId}/details`);
        return data;
    }
};

export interface PlantDetails {
    common_names: {
        id: string;
        name: string;
        country: string | undefined;
        place: string | undefined;
    }[],
    id: number;
    price:number;
    scientific_name: string;
    taxonomy: {
        class: string;
        division: string;
        family: string;
        genus: string;
        order: string;
        species: string;
    }
    updated_at: string;
    images_info: {
        filename: string;
        storage_path: string;
    }[];
}

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
