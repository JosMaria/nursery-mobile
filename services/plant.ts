import { AxiosRequestConfig } from 'axios';

import { axiosInstance } from '@/services/api';
import { PaginatedResult } from '@/types/plantsTypes';

import { ImageSelectionResponse } from './types';

export const plantService = {
	getPaginatedPlantCards: async (page = 0, size = 6) => {
		const uri = '/plants/cards';
		const requestConfig: AxiosRequestConfig = { params: { page, size } }
		const { data: plantCards } = await axiosInstance.get<PaginatedResult>(uri, requestConfig);
		return plantCards;
	},
    getImagesToSelection: async (plantId: number) => {
        const uri = `/plants/${plantId}/images/selection`;
        const { data } = await axiosInstance.get<ImageSelectionResponse[]>(uri);
        return data;
    },
    updateSelectedImage: async (plantId: number, imageId: number) => {
        const { data: isChanged } = await axiosInstance.patch<Boolean>(`/plants/${plantId}/images/${imageId}`);
        return isChanged;
    },
};
