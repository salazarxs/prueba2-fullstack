import { readJSON, writeJSON } from './storage.js'

// CRUD genérico sobre una colección guardada en localStorage bajo `key`.
// Cada elemento tiene un `id` numérico autoincremental.
export const createRepository = (key) => {
  const getAll = () => readJSON(key, [])

  const save = (items) => writeJSON(key, items)

  const getById = (id) => getAll().find(item => item.id === Number(id)) ?? null

  const create = (data) => {
    const items = getAll()
    const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1
    const item = { ...data, id }
    save([...items, item])
    return item
  }

  const update = (id, changes) => {
    let updated = null
    const items = getAll().map(item => {
      if (item.id !== Number(id)) return item
      updated = { ...item, ...changes, id: item.id }
      return updated
    })
    save(items)
    return updated
  }

  const remove = (id) => {
    const items = getAll()
    const remaining = items.filter(item => item.id !== Number(id))
    save(remaining)
    return remaining.length !== items.length
  }

  return { getAll, getById, create, update, remove, seed: save }
}
