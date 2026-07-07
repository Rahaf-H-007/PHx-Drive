import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function TrayNavigationListener() {
  const navigate = useNavigate()
  useEffect(() => {
    return window.api.onNavigate((path) => navigate(path))
  }, [navigate])
  // renders nothing. component is only for navigation
  return null
}
