import { Link, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import OrdersTable from '../../../components/admin/OrdersTable.jsx'
import { getOrdersByUser } from '../../../data/orders.js'
import { fullName, getUser } from '../../../data/users.js'
import NotFound from '../../NotFound.jsx'

function UserHistory() {
  const { id } = useParams()
  const user = getUser(id)

  if (!user) return <NotFound backTo="/admin/usuarios" backLabel="Volver a usuarios" />

  return (
    <>
      <title>Historial de compras | GameStore Admin</title>
      <AdminPageHeader title="Historial de compras" subtitle={fullName(user)}>
        <Link to={`/admin/usuarios/${user.id}`} className="btn btn-outline-secondary">Volver</Link>
      </AdminPageHeader>
      <OrdersTable orders={getOrdersByUser(user.id).toSorted((a, b) => b.id - a.id)} />
    </>
  )
}

export default UserHistory
