import { readJSON, writeJSON } from '../data/storage.js'
import { getPrecioFinal } from './format.js'

export const getCart = () => readJSON('carrito', [])

// Guarda el carrito ordenado por id y devuelve la copia guardada
export const updateCart = (cart) => {
  const sorted = cart.toSorted((product, product2) => product.id - product2.id)
  writeJSON('carrito', sorted)
  return sorted
}

// Funciones puras: reciben el carrito actual y devuelven uno nuevo
export const addItem = (cart, product, cantidad = 1) => {
  if (cart.some(item => item.id === product.id)) {
    return cart.map(item => (item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item))
  }
  return [...cart, { id: product.id, nombre: product.nombre, precio: getPrecioFinal(product), imagen: product.imagen, cantidad }]
}

export const changeItemQuantity = (cart, id, delta) =>
  cart
    .map(item => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
    .filter(item => item.cantidad > 0)

export const removeItem = (cart, id) => cart.filter(item => item.id !== id)

export const calculateCartTotal = (cart) =>
  cart.reduce((total, product) => total + product.precio * product.cantidad, 0)

export const countItems = (cart) => cart.reduce((count, product) => count + product.cantidad, 0)
