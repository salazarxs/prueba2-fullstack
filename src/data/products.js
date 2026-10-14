import { getPrecioFinal, isOnSale } from '../utils/format.js'
import { createRepository } from './repository.js'

const repo = createRepository('productList')

export const getProducts = repo.getAll
export const getProduct = repo.getById
export const createProduct = repo.create
export const updateProduct = repo.update
export const deleteProduct = repo.remove
export const seedProducts = repo.seed

export const getOffers = () => getProducts().filter(isOnSale)

export const getProductsByCategory = (categoriaId) =>
  getProducts().filter(product => product.categoriaId === Number(categoriaId))

export const getCriticalProducts = () =>
  getProducts().filter(product => product.stock <= product.stockCritico)

// Filtro puro usado por el catálogo: texto, categoría y orden por precio
export const filterProducts = (products, { q = '', categoriaId = '', orden = '' } = {}) => {
  const text = q.trim().toLowerCase()
  const filtered = products.filter(product =>
    (!text || product.nombre.toLowerCase().includes(text)) &&
    (!categoriaId || product.categoriaId === Number(categoriaId))
  )
  if (orden === 'precio-asc') return filtered.toSorted((a, b) => getPrecioFinal(a) - getPrecioFinal(b))
  if (orden === 'precio-desc') return filtered.toSorted((a, b) => getPrecioFinal(b) - getPrecioFinal(a))
  return filtered
}

export const decrementStock = (items) => {
  items.forEach(item => {
    const product = getProduct(item.id)
    if (product) updateProduct(product.id, { stock: product.stock - item.cantidad })
  })
}
