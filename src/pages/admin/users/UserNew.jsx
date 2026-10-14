import { useNavigate } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import UserForm from '../../../components/form/UserForm.jsx'
import { createUser, isEmailTaken } from '../../../data/users.js'

function UserNew() {
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    const user = createUser(data)
    navigate(`/admin/usuarios/${user.id}`)
  }

  return (
    <>
      <title>Nuevo usuario | GameStore Admin</title>
      <AdminPageHeader title="Nuevo usuario" />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <UserForm withRol isEmailTaken={(email) => isEmailTaken(email)} onSubmit={handleSubmit} submitLabel="Crear usuario" />
      </div>
    </>
  )
}

export default UserNew
