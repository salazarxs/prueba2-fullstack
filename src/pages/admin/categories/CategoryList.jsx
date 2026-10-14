import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import AlertMessage from '../../../components/AlertMessage.jsx'
import { deleteCategory, getCategories } from '../../../data/categories.js'
import { getProductsByCategory } from '../../../data/products.js'
import { useTimedAlert } from '../../../hooks/useTimedAlert.js'

function CategoryList() {
  const [categories, setCategories] = useState(getCategories)
  const [alertVisible, showAlert] = useTimedAlert()

  const handleDelete = (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.nombre}"?`)) return
    if (!deleteCategory(category.id)) {
      showAlert()
      return
    }
    setCategories(getCategories())
  }

  return (
    <>
      <title>Categorías | GameStore Admin</title>
      {alertVisible && <AlertMessage variant="danger" message="No se puede eliminar una categoría que tiene productos." />}
      <AdminPageHeader title="Categorías" subtitle={`${categories.length} categorías`}>
        <Link to="/admin/categorias/nueva" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nueva categoría</Link>
      </AdminPageHeader>
      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col" className="text-center">Productos</th>
              <th scope="col" className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.nombre}</td>
                <td className="small text-muted">{category.descripcion}</td>
                <td className="text-center">{getProductsByCategory(category.id).length}</td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/categorias/${category.id}/editar`} className="btn btn-sm btn-outline-primary me-1" aria-label="Editar"><i className="bi bi-pencil"></i></Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" aria-label="Eliminar" onClick={() => handleDelete(category)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CategoryList
