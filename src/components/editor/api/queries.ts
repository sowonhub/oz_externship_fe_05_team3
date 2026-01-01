import { queryOptions } from '@tanstack/react-query';
import { communityService } from './services';

export const communityQueries = {
  getCategories: () =>
    queryOptions({
      queryKey: ['community-categories'],
      queryFn: communityService.getCategories,
    }),
  getCommunityDetail: (params: { id?: number; enabled?: boolean }) =>
    queryOptions({
      queryKey: ['community-detail', params.id],
      queryFn: () => {
        if (!params.id) {
          // enabled=false면 실행되지 않지만 타입 안정성을 위해 가드
          return Promise.reject(new Error('id is required'));
        }
        return communityService.getPostDetailById(params.id);
      },
      enabled: Boolean(params.id) && params.enabled !== false,
    }),
};
