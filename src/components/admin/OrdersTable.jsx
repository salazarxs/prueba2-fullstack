import { Link } from 'react-router-dom'
import { formatCLP, formatDate } from '../../utils/format.js'
import EmptyState from '../EmptyState.jsx'
import OrderStatusBadge from './OrderStatusBadge.jsx'

function OrdersTable({ orders }) {
  if (orders.length === 0) return <EmptyState message="No hay órdenes registradas." />

  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cliente</th>
            <th scope="col" className="text-end">Total</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.numero}</td>
              <td>{formatDate(order.fecha)}</td>
              <td>{order.cliente.nombre} {order.cliente.apellidos}</td>
              <td className="text-end">{formatCLP(order.total)}</td>
              <td><OrderStatusBadge estado={order.estado} /></td>
              <td className="text-end">
                <Link to={`/admin/ordenes/${order.id}`} className="btn btn-sm btn-outline-primary text-nowrap">Ver boleta</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
