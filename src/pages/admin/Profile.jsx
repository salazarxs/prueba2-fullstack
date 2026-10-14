import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx'
import AlertMessage from '../../components/AlertMessage.jsx'
import UserForm from '../../components/form/UserForm.jsx'
import { isEmailTaken, updateUser } from '../../data/users.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useTimedAlert } from '../../hooks/useTimedAlert.js'

function Profile() {
  const { user, refresh } = useAuth()
  const [alertVisible, showAlert] = useTimedAlert()

  const handleSubmit = (data) => {
    updateUser(user.id, data)
    refresh()
    showAlert()
  }

  return (
    <>
      <title>Perfil | GameStore Admin</title>
      {alertVisible && <AlertMessage message="Perfil actualizado correctamente." />}
      <AdminPageHeader title="Perfil" subtitle="Administra tu información personal y contraseña" />
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <UserForm
          isEdit
          initialUser={user}
          isEmailTaken={(email) => isEmailTaken(email, user.id)}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  )
}

export default Profile
