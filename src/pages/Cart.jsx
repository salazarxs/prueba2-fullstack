import { useState } from 'react'
import CartProductCard from '../components/cart/CartProductCard.jsx'
import { calculateCartTotal, getCart, updateCart } from '../utils/cart.js'

function Cart() {
  const [cart, setCart] = useState(getCart)

  const changeQuantity = (id, delta) => {
    const newCart = cart.map(product =>
      product.id === id ? { ...product, cantidad: Math.max(0, product.cantidad + delta) } : product
    )
    updateCart(newCart)
    setCart(newCart)
  }

  return (
    <>
      <title>Carrito | E-commerce</title>
      <div className="container py-4">
        <h1 className="align-text-left">Mi carrito de compras</h1>
        <div className="row mt-4">
          <div className="col-8 gap-4 d-flex flex-column" id="cart-product-list">
            {cart.length === 0
              ? <p className="fs-5 align-text-center">Aun no haz agregado productos al carrito</p>
              : cart.map(product => (
                <CartProductCard
                  key={product.id}
                  product={product}
                  onIncrease={() => changeQuantity(product.id, 1)}
                  onDecrease={() => changeQuantity(product.id, -1)}
                />
              ))}
          </div>
          <div className="col-4 px-5">
            <p className="fs-4" id="cart-total">Total: <strong>${calculateCartTotal(cart)}</strong></p>
            <div className="row">
              <p>Ingrese el cupon de descuento</p>
              <div className="col-8">
                <input type="text" className="w-100 rounded border-1 h-100" />
              </div>
              <div className="col-4 d-flex justify-content-start">
                <button className="btn btn-light">Aplicar</button>
              </div>

            </div>
            <div className="row mt-5">
              <button className="btn btn-success">Pagar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
