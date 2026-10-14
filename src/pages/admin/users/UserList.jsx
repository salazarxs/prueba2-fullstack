import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import { deleteUser, fullName, getUsers } from '../../../data/users.js'
import { useAuth } from '../../../hooks/useAuth.js'

function UserList() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState(getUsers)
  const [rol, setRol] = useState('')

  const handleDelete = (user) => {
    if (!window.confirm(`¿Eliminar a ${fullName(user)}?`)) return
    deleteUser(user.id)
    setUsers(getUsers())
  }

  const visibles = users.filter(user => !rol || user.rol === rol)

  return (
    <>
      <title>Usuarios | GameStore Admin</title>
      <AdminPageHeader title="Usuarios" subtitle={`${users.length} usuarios registrados`}>
        <select className="form-select w-auto" aria-label="Filtrar por rol" value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="">Todos los roles</option>
          <option value="admin">Administradores</option>
          <option value="cliente">Clientes</option>
        </select>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary"><i className="bi bi-person-plus"></i> Nuevo usuario</Link>
      </AdminPageHeader>
      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Dirección</th>
              <th scope="col">Rol</th>
              <th scope="col" className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map(user => (
              <tr key={user.id}>
                <td>{fullName(user)}</td>
                <td>{user.email}</td>
                <td>{user.telefono || '—'}</td>
                <td className="small">{user.comuna}, {user.region}</td>
                <td><span className={`badge ${user.rol === 'admin' ? 'text-bg-dark' : 'text-bg-secondary'}`}>{user.rol}</span></td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/usuarios/${user.id}`} className="btn btn-sm btn-outline-secondary me-1" aria-label="Ver"><i className="bi bi-eye"></i></Link>
                  <Link to={`/admin/usuarios/${user.id}/editar`} className="btn btn-sm btn-outline-primary me-1" aria-label="Editar"><i className="bi bi-pencil"></i></Link>
                  <button
                    type="button" className="btn btn-sm btn-outline-danger" aria-label="Eliminar"
                    disabled={user.id === currentUser.id} title={user.id === currentUser.id ? 'No puedes eliminar tu propia cuenta' : undefined}
                    onClick={() => handleDelete(user)}
                  >
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

export default UserList
