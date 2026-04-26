import { axiosInstance } from './api';
import { PaginatedResult } from './types';

export const catalogService = {
    getPlantCards: async (page = 0, size = 8) => {
        const { data } = await axiosInstance.get<PaginatedResult>(`/plants/cards?page=${page}&size=${size}`);
        return data;
    },
    fetchPlantDetailsById: async (plantId: number) => {
        const { data } = await axiosInstance.get<PlantDetails>(`/plants/${plantId}/details`);
        return data;
    },
};

export type PlantDetails = {
    common_names: {
        id: string;
        name: string;
        country: string | undefined;
        place: string | undefined;
        isSelected: boolean;
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
