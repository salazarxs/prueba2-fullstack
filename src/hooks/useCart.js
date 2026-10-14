import { use } from 'react'
import { CartContext } from '../context/CartContext.js'

export const useCart = () => use(CartContext)
