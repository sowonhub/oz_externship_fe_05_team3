import '@/App.css';

function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1>커뮤니티 프로젝트 베이스</h1>
      <p>여기서부터 비회원 / 회원 / 작성자 플로우</p>
    </main>
  );
}

export default App;
