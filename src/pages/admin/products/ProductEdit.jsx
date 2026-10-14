import { useNavigate, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import ProductForm from '../../../components/form/ProductForm.jsx'
import { getProduct, updateProduct } from '../../../data/products.js'
import NotFound from '../../NotFound.jsx'

function ProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)

  if (!product) return <NotFound backTo="/admin/productos" backLabel="Volver a productos" />

  const handleSubmit = (data) => {
    updateProduct(product.id, data)
    navigate(`/admin/productos/${product.id}`)
  }

  return (
    <>
      <title>Editar producto | GameStore Admin</title>
      <AdminPageHeader title="Editar producto" subtitle={product.nombre} />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <ProductForm initialProduct={product} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
      </div>
    </>
  )
}

export default ProductEdit
