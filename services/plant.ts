import { api } from '@/services/api';

import { ImageSelectionResponse } from './types';

export const plantService = {
    fetchImagesToSelection: async (plantId: number) => {
        const uri = `/plants/${plantId}/images/selection`;
        const { data } = await api.get<ImageSelectionResponse[]>(uri);
        return data;
    },
};
