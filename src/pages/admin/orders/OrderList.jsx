import { useState } from 'react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import OrdersTable from '../../../components/admin/OrdersTable.jsx'
import { getOrders } from '../../../data/orders.js'

function OrderList() {
  const [estado, setEstado] = useState('')
  const orders = getOrders()
    .filter(order => !estado || order.estado === estado)
    .toSorted((a, b) => b.id - a.id)

  return (
    <>
      <title>Órdenes | GameStore Admin</title>
      <AdminPageHeader title="Órdenes / Boletas" subtitle="Seguimiento de todas las compras realizadas">
        <select className="form-select" aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="pagada">Pagadas</option>
          <option value="rechazada">Rechazadas</option>
        </select>
      </AdminPageHeader>
      <OrdersTable orders={orders} />
    </>
  )
}

export default OrderList
