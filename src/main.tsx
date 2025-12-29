// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css'  // 일단 주석 처리하고 테스트

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/index');

  return worker.start({
    onUnhandledRequest: 'bypass', // 다른 API 요청은 그대로 통과
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
