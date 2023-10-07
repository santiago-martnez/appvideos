import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import VideosPage from './pages/VideosPage'
import VideoFormPage from './pages/VideoFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

import ProtectedRoute from './ProtectedRoute'
import { VideoProvider } from './context/VideoContext'
import NavBar from './components/NavBar'
import MyVideosPage from './pages/MyVideosPage'
import CreatorsPage from './pages/CreatorsPage'
import VideosFollowsPage from './pages/VideosFollowsPage'

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <BrowserRouter>
          <div className="flex h-screen"> {/* Contenedor principal */}
            <NavBar />
            <div className="flex-1 overflow-y-auto"> {/* Contenedor para tus componentes */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/videos" element={<VideosPage />} />
                  <Route path="/creators" element={<CreatorsPage />} />
                  <Route path="/add-video" element={<VideoFormPage />} />
                  <Route path="/videos/:id" element={<VideoFormPage />} />
                  <Route path="/videos/following" element={<VideosFollowsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/videos/myVideos/:creadorId" element={<MyVideosPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </VideoProvider>
    </AuthProvider>
  )
}

export default App
