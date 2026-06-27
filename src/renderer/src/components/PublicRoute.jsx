/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//this and ProtectedRoute are the only ones
// where Navigate will be used instead of useNavigate
export default function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : children
}
