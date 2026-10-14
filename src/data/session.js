import { readJSON, removeKey, writeJSON } from './storage.js'
import { getUser } from './users.js'

export const getSessionUser = () => {
  const session = readJSON('session', null)
  return session ? getUser(session.userId) : null
}

export const startSession = (user) => writeJSON('session', { userId: user.id })

export const endSession = () => removeKey('session')
