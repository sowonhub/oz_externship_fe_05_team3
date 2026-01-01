import { queryOptions } from '@tanstack/react-query';
import { communityService } from './services';

export const communityQueries = {
  getCategories: () =>
    queryOptions({
      queryKey: ['community-categories'],
      queryFn: communityService.getCategories,
    }),
};
