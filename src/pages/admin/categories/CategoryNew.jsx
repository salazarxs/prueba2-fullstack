import { useNavigate } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import CategoryForm from '../../../components/form/CategoryForm.jsx'
import { createCategory, isCategoryNameTaken } from '../../../data/categories.js'

function CategoryNew() {
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    createCategory(data)
    navigate('/admin/categorias')
  }

  return (
    <>
      <title>Nueva categoría | GameStore Admin</title>
      <AdminPageHeader title="Nueva categoría" />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <CategoryForm isNameTaken={(nombre) => isCategoryNameTaken(nombre)} onSubmit={handleSubmit} submitLabel="Crear categoría" />
      </div>
    </>
  )
}

export default CategoryNew
