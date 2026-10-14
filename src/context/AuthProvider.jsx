import { useState } from 'react'
import { endSession, getSessionUser, startSession } from '../data/session.js'
import { authenticate, createUser, getUser } from '../data/users.js'
import { AuthContext } from './AuthContext.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(getSessionUser)

  const login = (email, password) => {
    const found = authenticate(email, password)
    if (found) {
      startSession(found)
      setUser(found)
    }
    return found
  }

  const logout = () => {
    endSession()
    setUser(null)
  }

  const register = (data) => {
    const created = createUser({ ...data, rol: 'cliente' })
    startSession(created)
    setUser(created)
    return created
  }

  // Vuelve a leer al usuario logueado (p. ej. después de editar su perfil)
  const refresh = () => setUser(user ? getUser(user.id) : null)

  const value = { user, isAdmin: user?.rol === 'admin', login, logout, register, refresh }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
