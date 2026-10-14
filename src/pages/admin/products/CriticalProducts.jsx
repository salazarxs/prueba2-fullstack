import { Link } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import ProductsTable from '../../../components/admin/ProductsTable.jsx'
import { getCriticalProducts } from '../../../data/products.js'

function CriticalProducts() {
  return (
    <>
      <title>Productos críticos | GameStore Admin</title>
      <AdminPageHeader title="Listado de productos críticos" subtitle="Productos con stock igual o menor a su stock crítico">
        <Link to="/admin/productos" className="btn btn-outline-secondary">Volver</Link>
      </AdminPageHeader>
      <ProductsTable products={getCriticalProducts().toSorted((a, b) => a.stock - b.stock)} />
    </>
  )
}

export default CriticalProducts
