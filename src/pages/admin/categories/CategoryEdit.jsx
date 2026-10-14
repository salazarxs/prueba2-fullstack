import { useNavigate, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import CategoryForm from '../../../components/form/CategoryForm.jsx'
import { getCategory, isCategoryNameTaken, updateCategory } from '../../../data/categories.js'
import NotFound from '../../NotFound.jsx'

function CategoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const category = getCategory(id)

  if (!category) return <NotFound backTo="/admin/categorias" backLabel="Volver a categorías" />

  const handleSubmit = (data) => {
    updateCategory(category.id, data)
    navigate('/admin/categorias')
  }

  return (
    <>
      <title>Editar categoría | GameStore Admin</title>
      <AdminPageHeader title="Editar categoría" subtitle={category.nombre} />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <CategoryForm
          initialCategory={category}
          isNameTaken={(nombre) => isCategoryNameTaken(nombre, category.id)}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  )
}

export default CategoryEdit
