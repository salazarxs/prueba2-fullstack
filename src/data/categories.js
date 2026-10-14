import { getProductsByCategory } from './products.js'
import { createRepository } from './repository.js'

const repo = createRepository('categoryList')

export const getCategories = repo.getAll
export const getCategory = repo.getById
export const createCategory = repo.create
export const updateCategory = repo.update
export const seedCategories = repo.seed

export const isCategoryNameTaken = (nombre, exceptId = null) =>
  getCategories().some(category =>
    category.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && category.id !== Number(exceptId))

// No se elimina una categoría que todavía tiene productos asociados
export const deleteCategory = (id) => {
  if (getProductsByCategory(id).length > 0) return false
  return repo.remove(id)
}
