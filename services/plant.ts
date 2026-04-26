import { axiosInstance } from '@/services/api';

import { ImageSelectionResponse } from './types';

export const plantService = {
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
