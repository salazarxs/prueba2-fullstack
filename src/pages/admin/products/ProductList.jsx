import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import ProductsTable from '../../../components/admin/ProductsTable.jsx'
import { deleteProduct, filterProducts, getProducts } from '../../../data/products.js'

function ProductList() {
  const [products, setProducts] = useState(getProducts)
  const [query, setQuery] = useState('')

  const handleDelete = (product) => {
    if (!window.confirm(`¿Eliminar "${product.nombre}"?`)) return
    deleteProduct(product.id)
    setProducts(getProducts())
  }

  return (
    <>
      <title>Productos | GameStore Admin</title>
      <AdminPageHeader title="Productos" subtitle={`${products.length} productos en el catálogo`}>
        <Link to="/admin/productos/criticos" className="btn btn-warning"><i className="bi bi-exclamation-triangle"></i> Críticos</Link>
        <Link to="/admin/reportes" className="btn btn-outline-secondary"><i className="bi bi-bar-chart"></i> Reportes</Link>
        <Link to="/admin/productos/nuevo" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nuevo producto</Link>
      </AdminPageHeader>
      <input
        type="search" className="form-control mb-3" placeholder="Buscar producto..." aria-label="Buscar producto"
        value={query} onChange={(e) => setQuery(e.target.value)}
      />
      <ProductsTable products={filterProducts(products, { q: query })} onDelete={handleDelete} />
    </>
  )
}

export default ProductList
