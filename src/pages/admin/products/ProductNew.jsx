import { useNavigate } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import ProductForm from '../../../components/form/ProductForm.jsx'
import { createProduct } from '../../../data/products.js'

function ProductNew() {
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    const product = createProduct(data)
    navigate(`/admin/productos/${product.id}`)
  }

  return (
    <>
      <title>Nuevo producto | GameStore Admin</title>
      <AdminPageHeader title="Nuevo producto" />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <ProductForm onSubmit={handleSubmit} submitLabel="Crear producto" />
      </div>
    </>
  )
}

export default ProductNew
