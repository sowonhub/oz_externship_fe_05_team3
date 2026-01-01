import { apiClient } from '@/api/apiclient';
import type { CategoryResponseDTO } from './dto';

export const communityService = {
  getCategories: async (): Promise<CategoryResponseDTO> => {
    const response = await apiClient.get<CategoryResponseDTO>('categories');
    return response;
  },
};
