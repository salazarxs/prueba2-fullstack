import { Link, useNavigate } from 'react-router-dom'
import CartItemRow from '../components/cart/CartItemRow.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getProducts } from '../data/products.js'
import { useCart } from '../hooks/useCart.js'
import { formatCLP } from '../utils/format.js'

function Cart() {
  const { items, total, count, changeQuantity, remove, clear } = useCart()
  const navigate = useNavigate()
  const stockById = Object.fromEntries(getProducts().map(product => [product.id, product.stock]))

  return (
    <>
      <title>Carrito | GameStore</title>
      <div className="container py-4">
        <h1 className="h2 mb-4">Carrito de compras</h1>

        {items.length === 0 ? (
          <EmptyState message="Aún no has agregado productos al carrito.">
            <Link to="/productos" className="btn btn-primary">Ver productos</Link>
          </EmptyState>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Imagen</th>
                      <th scope="col">Nombre</th>
                      <th scope="col" className="text-end">Precio</th>
                      <th scope="col" className="text-center">Cantidad</th>
                      <th scope="col" className="text-end">Subtotal</th>
                      <th scope="col" className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        stock={stockById[item.id] ?? 0}
                        onIncrease={() => changeQuantity(item.id, 1)}
                        onDecrease={() => changeQuantity(item.id, -1)}
                        onRemove={() => remove(item.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5">Resumen</h2>
                  <p className="d-flex justify-content-between mb-1"><span>Productos</span><span>{count}</span></p>
                  <p className="d-flex justify-content-between fs-4 fw-bold" id="cart-total">
                    <span>Total</span><span>{formatCLP(total)}</span>
                  </p>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-success" onClick={() => navigate('/checkout')}>Comprar ahora</button>
                    <button type="button" className="btn btn-outline-danger" onClick={clear}>Limpiar carrito</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
