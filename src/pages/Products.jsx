import { useSearchParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getCategories } from '../data/categories.js'
import { filterProducts, getProducts } from '../data/products.js'
import { useAddToCart } from '../hooks/useAddToCart.js'

// Los filtros viven en la URL (?q=&categoria=&orden=) para poder compartir/volver atrás
function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart, alertVisible, message } = useAddToCart()

  const filters = {
    q: searchParams.get('q') ?? '',
    categoriaId: searchParams.get('categoria') ?? '',
    orden: searchParams.get('orden') ?? '',
  }
  const products = filterProducts(getProducts(), filters)

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <title>Productos | GameStore</title>
      {alertVisible && <AlertMessage message={message} />}
      <div className="container py-4">
        <h1 className="h2 mb-4">Productos</h1>

        <div className="row g-2 mb-4">
          <div className="col-12 col-md-6">
            <input
              type="search" className="form-control" placeholder="Buscar por nombre..." aria-label="Buscar por nombre"
              value={filters.q} onChange={(e) => setFilter('q', e.target.value)}
            />
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" aria-label="Categoría" value={filters.categoriaId} onChange={(e) => setFilter('categoria', e.target.value)}>
              <option value="">Todas las categorías</option>
              {getCategories().map(category => <option key={category.id} value={category.id}>{category.nombre}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" aria-label="Ordenar" value={filters.orden} onChange={(e) => setFilter('orden', e.target.value)}>
              <option value="">Sin ordenar</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        <p className="text-muted small">{products.length} resultado(s)</p>
        <ProductGrid products={products} onAdd={addToCart} />
      </div>
    </>
  )
}

export default Products
