import { createRepository } from './repository.js'

const repo = createRepository('userList')

export const getUsers = repo.getAll
export const getUser = repo.getById
export const createUser = repo.create
export const updateUser = repo.update
export const deleteUser = repo.remove
export const seedUsers = repo.seed

export const findUserByEmail = (email) =>
  getUsers().find(user => user.email.toLowerCase() === email.trim().toLowerCase()) ?? null

export const isEmailTaken = (email, exceptId = null) => {
  const user = findUserByEmail(email)
  return user !== null && user.id !== Number(exceptId)
}

export const authenticate = (email, password) => {
  const user = findUserByEmail(email)
  return user && user.password === password ? user : null
}

export const fullName = (user) => `${user.nombre} ${user.apellidos}`.trim()
