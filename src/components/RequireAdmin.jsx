import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

// Protege las rutas de administración: sin sesión de admin redirige al login
function RequireAdmin({ children }) {
  const { isAdmin } = useAuth()
  const location = useLocation()

  if (!isAdmin) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

export default RequireAdmin
