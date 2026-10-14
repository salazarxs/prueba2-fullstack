import { Link } from 'react-router-dom'
import { getCategories } from '../../data/categories.js'
import EmptyState from '../EmptyState.jsx'
import Price from '../Price.jsx'

// Tabla de productos del panel. `onDelete` es opcional (el listado de críticos no elimina).
function ProductsTable({ products, onDelete }) {
  if (products.length === 0) return <EmptyState message="No hay productos para mostrar." />

  const categoryNames = Object.fromEntries(getCategories().map(category => [category.id, category.nombre]))

  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col" className="text-center">Stock</th>
            <th scope="col" className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const critico = product.stock <= product.stockCritico
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>{categoryNames[product.categoriaId] ?? '—'}</td>
                <td className="text-nowrap"><Price product={product} /></td>
                <td className="text-center">
                  <span className={`badge ${critico ? 'text-bg-warning' : 'text-bg-light'}`}>{product.stock}</span>
                </td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/productos/${product.id}`} className="btn btn-sm btn-outline-secondary me-1" aria-label="Ver"><i className="bi bi-eye"></i></Link>
                  <Link to={`/admin/productos/${product.id}/editar`} className="btn btn-sm btn-outline-primary me-1" aria-label="Editar"><i className="bi bi-pencil"></i></Link>
                  {onDelete && (
                    <button type="button" className="btn btn-sm btn-outline-danger" aria-label="Eliminar" onClick={() => onDelete(product)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
