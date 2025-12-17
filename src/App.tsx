import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/new" element={<PostCreatePage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
