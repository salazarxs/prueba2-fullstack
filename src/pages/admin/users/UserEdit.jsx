import { useNavigate, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import UserForm from '../../../components/form/UserForm.jsx'
import { fullName, getUser, isEmailTaken, updateUser } from '../../../data/users.js'
import { useAuth } from '../../../hooks/useAuth.js'
import NotFound from '../../NotFound.jsx'

function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: currentUser, refresh } = useAuth()
  const user = getUser(id)

  if (!user) return <NotFound backTo="/admin/usuarios" backLabel="Volver a usuarios" />

  const isSelf = user.id === currentUser.id

  const handleSubmit = (data) => {
    updateUser(user.id, data)
    if (isSelf) refresh()
    navigate(`/admin/usuarios/${user.id}`)
  }

  return (
    <>
      <title>Editar usuario | GameStore Admin</title>
      <AdminPageHeader title="Editar usuario" subtitle={fullName(user)} />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <UserForm
          isEdit
          withRol={!isSelf}
          initialUser={user}
          isEmailTaken={(email) => isEmailTaken(email, user.id)}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  )
}

export default UserEdit
