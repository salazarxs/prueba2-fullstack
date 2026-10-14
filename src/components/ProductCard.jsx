import { Link } from 'react-router-dom'
import Price from './Price.jsx'

// Tarjeta de producto. Si recibe `onAdd` muestra el botón "Añadir"; si no, solo "Ver".
function ProductCard({ product, categoryName, onAdd }) {
  const agotado = product.stock <= 0

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/producto/${product.id}`}>
        <img src={product.imagen} alt={product.nombre} className="card-img-top" />
      </Link>
      <div className="card-body d-flex flex-column">
        {categoryName && <span className="badge text-bg-secondary align-self-start mb-2">{categoryName}</span>}
        <h6 className="card-title">
          <Link to={`/producto/${product.id}`} className="text-decoration-none text-body">{product.nombre}</Link>
        </h6>
        <Price product={product} className="mb-1" />
        <small className={agotado ? 'text-danger' : 'text-muted'}>
          {agotado ? 'Agotado' : `Stock disponible: ${product.stock}`}
        </small>
        <div className="mt-auto pt-3 d-flex gap-2">
          <Link className="btn btn-outline-primary btn-sm flex-grow-1" to={`/producto/${product.id}`}>Ver</Link>
          {onAdd && (
            <button type="button" className="btn btn-primary btn-sm flex-grow-1" disabled={agotado} onClick={() => onAdd(product)}>
              <i className="bi bi-cart-plus"></i> Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
