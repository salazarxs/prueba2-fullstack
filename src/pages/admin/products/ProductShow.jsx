import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import DetailList from '../../../components/admin/DetailList.jsx'
import Price from '../../../components/Price.jsx'
import { getCategory } from '../../../data/categories.js'
import { deleteProduct, getProduct } from '../../../data/products.js'
import NotFound from '../../NotFound.jsx'

function ProductShow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)

  if (!product) return <NotFound backTo="/admin/productos" backLabel="Volver a productos" />

  const handleDelete = () => {
    if (!window.confirm(`¿Eliminar "${product.nombre}"?`)) return
    deleteProduct(product.id)
    navigate('/admin/productos')
  }

  return (
    <>
      <title>{`${product.nombre} | GameStore Admin`}</title>
      <AdminPageHeader title={product.nombre} subtitle={`Producto #${product.id}`}>
        <Link to="/admin/productos" className="btn btn-outline-secondary">Volver</Link>
        <Link to={`/admin/productos/${product.id}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete}><i className="bi bi-trash"></i> Eliminar</button>
      </AdminPageHeader>
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <img src={product.imagen} alt={product.nombre} className="w-100 h-auto rounded border" />
          </div>
          <div className="col-12 col-md-8">
            <DetailList items={[
              { label: 'Categoría', value: getCategory(product.categoriaId)?.nombre },
              { label: 'Precio', value: <Price product={product} /> },
              { label: 'Stock', value: product.stock },
              { label: 'Stock crítico', value: product.stockCritico },
              { label: 'Descripción', value: product.descripcion },
            ]} />
            <Link to={`/producto/${product.id}`} className="small">Ver en la tienda <i className="bi bi-box-arrow-up-right"></i></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductShow
