import { discountPercent, formatCLP, isOnSale } from '../utils/format.js'

// Muestra el precio final; si hay oferta, tacha el precio normal y muestra el % de descuento
function Price({ product, className = '' }) {
  if (!isOnSale(product)) return <span className={className}>{formatCLP(product.precio)}</span>

  return (
    <span className={className}>
      <span className="text-danger fw-bold">{formatCLP(product.precioOferta)}</span>{' '}
      <small className="text-muted text-decoration-line-through">{formatCLP(product.precio)}</small>{' '}
      <span className="badge text-bg-danger">-{discountPercent(product)}%</span>
    </span>
  )
}

export default Price
