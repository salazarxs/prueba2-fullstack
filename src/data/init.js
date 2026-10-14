import { categorias, productos, usuarios } from './db.js'
import { seedCategories } from './categories.js'
import { seedOrders } from './orders.js'
import { seedProducts } from './products.js'
import { readJSON, removeKey, writeJSON } from './storage.js'
import { seedUsers } from './users.js'

// Subir este número cuando cambie el formato de los datos para forzar un resembrado
const DB_VERSION = 2

export const initDb = () => {
  if (readJSON('dbVersion', 0) === DB_VERSION) return
  seedCategories(categorias)
  seedProducts(productos)
  seedUsers(usuarios)
  seedOrders([])
  writeJSON('carrito', [])
  removeKey('session')
  writeJSON('dbVersion', DB_VERSION)
}
