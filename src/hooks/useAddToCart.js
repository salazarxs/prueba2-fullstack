import { useState } from 'react'
import { useCart } from './useCart.js'
import { useTimedAlert } from './useTimedAlert.js'

// Agrega al carrito y muestra una alerta temporal con el producto agregado
export const useAddToCart = () => {
  const { add } = useCart()
  const [alertVisible, showAlert] = useTimedAlert()
  const [message, setMessage] = useState('')

  const addWithFeedback = (product, cantidad = 1) => {
    add(product, cantidad)
    setMessage(`${product.nombre} agregado al carrito (x${cantidad})`)
    showAlert()
  }

  return { addToCart: addWithFeedback, alertVisible, message }
}
