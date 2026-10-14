import { Link } from 'react-router-dom'

function CategoryCard({ category, productCount }) {
  return (
    <Link to={`/categorias/${category.id}`} className="card h-100 shadow-sm text-decoration-none">
      <img src={category.imagen} alt={category.nombre} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title mb-1">{category.nombre}</h5>
        <p className="card-text text-muted small mb-1">{category.descripcion}</p>
        {productCount !== undefined && <span className="badge text-bg-primary">{productCount} productos</span>}
      </div>
    </Link>
  )
}

export default CategoryCard
