import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage.jsx'
import Price from '../components/Price.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getCategory } from '../data/categories.js'
import { getProduct, getProductsByCategory } from '../data/products.js'
import { useAddToCart } from '../hooks/useAddToCart.js'
import NotFound from './NotFound.jsx'

const MAX_POR_COMPRA = 10

function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const [cantidad, setCantidad] = useState(1)
  const { addToCart, alertVisible, message } = useAddToCart()

  if (!product) return <NotFound />

  const category = getCategory(product.categoriaId)
  const related = getProductsByCategory(product.categoriaId).filter(current => current.id !== product.id).slice(0, 4)
  const maxCantidad = Math.min(product.stock, MAX_POR_COMPRA)
  // Al navegar a un relacionado se reutiliza el componente: acotar la cantidad elegida al nuevo stock
  const cantidadValida = Math.min(cantidad, Math.max(maxCantidad, 1))

  return (
    <>
      <title>{`${product.nombre} | GameStore`}</title>
      {alertVisible && <AlertMessage message={message} />}
      <div className="container my-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            {category && <li className="breadcrumb-item"><Link to={`/categorias/${category.id}`}>{category.nombre}</Link></li>}
            <li className="breadcrumb-item active" aria-current="page">{product.nombre}</li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <img src={product.imagen} alt={product.nombre} className="w-100 h-auto rounded border" />
          </div>

          <div className="col-12 col-md-6">
            <h1 className="h2 fw-bold">{product.nombre}</h1>
            <Price product={product} className="fs-4" />
            <p className="my-4 text-muted">{product.descripcion}</p>
            <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Producto agotado'}
            </p>

            <div className="d-flex align-items-center gap-3 mb-4">
              <label htmlFor="cantidadSelect" className="fw-bold">Cantidad</label>
              <select
                id="cantidadSelect" className="form-select w-auto" disabled={maxCantidad === 0}
                value={cantidadValida} onChange={(e) => setCantidad(Number(e.target.value))}
              >
                {Array.from({ length: Math.max(maxCantidad, 1) }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <button
              type="button" className="btn btn-primary w-100 py-2 fw-bold" disabled={maxCantidad === 0}
              onClick={() => addToCart(product, cantidadValida)}
            >
              <i className="bi bi-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-5 pt-4 border-top">
            <h2 className="h5 fw-bold mb-4">Productos relacionados</h2>
            <ProductGrid products={related} onAdd={addToCart} />
          </section>
        )}
      </div>
    </>
  )
}

export default ProductDetail
