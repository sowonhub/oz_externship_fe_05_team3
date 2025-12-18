// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import CommunityPage from '@/pages/community/communitypage'
import CommunityDetailPage from '@/pages/communitydetail/communitydetailpage'
import CommunityCreatePage from '@/pages/communitycreate/communitycreatepage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <h1>커뮤니티 프로젝트 베이스</h1>
        <p>여기서부터 비회원 / 회원 / 작성자 플로우</p>
      </div>
    ),
  },
  {
    path: '/community',
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
])
