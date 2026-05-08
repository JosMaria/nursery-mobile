export interface PlantCardResponse {
  id: number;
  scientific_name: string;
  is_favorite: boolean;
  common_name: string;
  price: number;
  selected_image_id: number;
}

export interface PaginatedResult {
  content: PlantCardResponse[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}
