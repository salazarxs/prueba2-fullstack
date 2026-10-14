import { calculateCartTotal } from '../utils/cart.js'
import { decrementStock, getProducts } from './products.js'
import { createRepository } from './repository.js'

const repo = createRepository('orderList')

export const getOrders = repo.getAll
export const getOrder = repo.getById
export const updateOrder = repo.update
export const deleteOrder = repo.remove
export const seedOrders = repo.seed

export const getOrdersByUser = (usuarioId) =>
  getOrders().filter(order => order.usuarioId === Number(usuarioId))

const datePart = (date) => date.toISOString().slice(0, 10).replaceAll('-', '')

export const createOrder = (data) => {
  const fecha = new Date()
  const order = repo.create({ ...data, fecha: fecha.toISOString() })
  return repo.update(order.id, {
    numero: `${datePart(fecha)}${String(order.id).padStart(2, '0')}`,
    codigo: `ORDER${String(order.id).padStart(5, '0')}`,
  })
}

// Items del carrito cuyo stock ya no alcanza (o el producto dejó de existir)
export const findStockProblems = (items, products) =>
  items.filter(item => {
    const product = products.find(current => current.id === item.id)
    return !product || product.stock < item.cantidad
  })

// Simula el pago: se rechaza si falta stock; si se aprueba, descuenta stock
export const processPayment = ({ cliente, direccion, items, usuarioId = null }) => {
  const problems = findStockProblems(items, getProducts())
  const aprobado = problems.length === 0
  if (aprobado) decrementStock(items)
  return createOrder({
    cliente,
    direccion,
    items,
    usuarioId,
    total: calculateCartTotal(items),
    estado: aprobado ? 'pagada' : 'rechazada',
    motivo: aprobado ? null : `Stock insuficiente: ${problems.map(item => item.nombre).join(', ')}`,
  })
}
