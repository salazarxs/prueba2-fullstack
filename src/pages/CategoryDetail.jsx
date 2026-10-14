import { Link, NavLink, useParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getCategories, getCategory } from '../data/categories.js'
import { getProductsByCategory } from '../data/products.js'
import { useAddToCart } from '../hooks/useAddToCart.js'
import NotFound from './NotFound.jsx'

function CategoryDetail() {
  const { id } = useParams()
  const category = getCategory(id)
  const { addToCart, alertVisible, message } = useAddToCart()

  if (!category) return <NotFound />

  return (
    <>
      <title>{`${category.nombre} | GameStore`}</title>
      {alertVisible && <AlertMessage message={message} />}
      <div className="container py-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/categorias">Categorías</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{category.nombre}</li>
          </ol>
        </nav>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {getCategories().map(current => (
            <NavLink
              key={current.id} to={`/categorias/${current.id}`}
              className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {current.nombre}
            </NavLink>
          ))}
        </div>

        <h1 className="h2">{category.nombre}</h1>
        <p className="text-muted">{category.descripcion}</p>
        <ProductGrid products={getProductsByCategory(category.id)} onAdd={addToCart} emptyMessage="Esta categoría aún no tiene productos." />
      </div>
    </>
  )
}

export default CategoryDetail
