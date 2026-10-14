import { Link, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import DetailList from '../../../components/admin/DetailList.jsx'
import { getOrdersByUser } from '../../../data/orders.js'
import { fullName, getUser } from '../../../data/users.js'
import NotFound from '../../NotFound.jsx'

function UserShow() {
  const { id } = useParams()
  const user = getUser(id)

  if (!user) return <NotFound backTo="/admin/usuarios" backLabel="Volver a usuarios" />

  return (
    <>
      <title>{`${fullName(user)} | GameStore Admin`}</title>
      <AdminPageHeader title={fullName(user)} subtitle={`Usuario #${user.id}`}>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary">Volver</Link>
        <Link to={`/admin/usuarios/${user.id}/historial`} className="btn btn-outline-primary">
          <i className="bi bi-clock-history"></i> Historial de compras ({getOrdersByUser(user.id).length})
        </Link>
        <Link to={`/admin/usuarios/${user.id}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
      </AdminPageHeader>
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <DetailList items={[
          { label: 'Nombre', value: user.nombre },
          { label: 'Apellidos', value: user.apellidos },
          { label: 'Correo', value: user.email },
          { label: 'Teléfono', value: user.telefono },
          { label: 'Región', value: user.region },
          { label: 'Comuna', value: user.comuna },
          { label: 'Dirección', value: [user.calle, user.depto && `depto ${user.depto}`].filter(Boolean).join(', ') },
          { label: 'Rol', value: user.rol },
        ]} />
      </div>
    </>
  )
}

export default UserShow
