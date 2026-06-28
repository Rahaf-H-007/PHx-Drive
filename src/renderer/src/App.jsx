import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import PublicRoute from './components/PublicRoute'
import MenuFiles from './components/MenuFiles'
import SyncActivity from './components/SyncActivity'
import Trash from './components/Trash'
import Settings from './components/Settings'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<MenuFiles />} />
            <Route path="/menufiles" element={<MenuFiles />} />
            <Route path="/syncactivity" element={<SyncActivity />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
