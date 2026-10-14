import { use } from 'react'
import { AuthContext } from '../context/AuthContext.js'

export const useAuth = () => use(AuthContext)
