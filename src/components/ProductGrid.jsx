import { getCategories } from '../data/categories.js'
import EmptyState from './EmptyState.jsx'
import ProductCard from './ProductCard.jsx'

// Grilla responsiva: 1 columna en móvil, 2 en tablet, 3-4 en escritorio
function ProductGrid({ products, onAdd, emptyMessage = 'No se encontraron productos.' }) {
  if (products.length === 0) return <EmptyState message={emptyMessage} />

  const categoryNames = Object.fromEntries(getCategories().map(category => [category.id, category.nombre]))

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map(product => (
        <div key={product.id} className="col">
          <ProductCard product={product} categoryName={categoryNames[product.categoriaId]} onAdd={onAdd} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
