import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {/* <LoginPage /> */}
      {/* <Home /> */}
    </>
  )
}

export default App
