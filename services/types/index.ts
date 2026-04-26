export interface ImageSelectionResponse {
    image_id: number;
    is_selected: boolean;
};

export interface PaginatedResult {
    content: PlantCardResponse[];
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
};

export interface PlantCardResponse {
    id: number;
    scientific_name: string;
    is_favorite: boolean;
    common_name: string;
    price: number;
};
