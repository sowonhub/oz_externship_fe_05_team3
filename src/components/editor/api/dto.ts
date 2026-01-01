export interface CategoryResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryDTO[];
}

export interface CategoryDTO {
  id: number;
  name: string;
}
