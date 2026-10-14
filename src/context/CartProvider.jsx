import { useState } from 'react'
import {
  addItem, calculateCartTotal, changeItemQuantity, countItems, getCart, removeItem, updateCart,
} from '../utils/cart.js'
import { CartContext } from './CartContext.js'

// Estado global del carrito: se inicializa desde localStorage y cada cambio
// se escribe en localStorage y en el estado para que toda la UI se actualice.
function CartProvider({ children }) {
  const [items, setItems] = useState(getCart)

  const commit = (next) => setItems(updateCart(next))

  const value = {
    items,
    total: calculateCartTotal(items),
    count: countItems(items),
    add: (product, cantidad = 1) => commit(addItem(items, product, cantidad)),
    changeQuantity: (id, delta) => commit(changeItemQuantity(items, id, delta)),
    remove: (id) => commit(removeItem(items, id)),
    clear: () => commit([]),
  }

  return <CartContext value={value}>{children}</CartContext>
}

export default CartProvider
