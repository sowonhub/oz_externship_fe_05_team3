// src/router.tsx
import { ROUTES } from '@/routes';
import { createBrowserRouter } from 'react-router-dom';
import CommunityPage from '@/pages/community/communitypage';
import CommunityDetailPage from '@/pages/communitydetail/communitydetailpage';
import CommunityCreatePage from '@/pages/communitycreate/communitycreatepage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME, // '/' → 상수 사용
    element: (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">커뮤니티 프로젝트 베이스</h1>
        <p className="text-gray-600">
          여기서부터 비회원 / 회원 / 작성자 플로우
        </p>
      </div>
    ),
  },
  {
    path: ROUTES.COMMUNITY, // '/community' → 상수 사용
    children: [
      {
        index: true,
        element: <CommunityPage />,
      },
      {
        path: ':id',
        element: <CommunityDetailPage />,
      },
      {
        path: 'create',
        element: <CommunityCreatePage />,
      },
      {
        path: 'edit/:id',
        element: <CommunityCreatePage />,
      },
    ],
  },
]);
