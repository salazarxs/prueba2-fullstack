import { Link, useParams } from 'react-router-dom'
import AdminPageHeader from '../../../components/admin/AdminPageHeader.jsx'
import OrderStatusBadge from '../../../components/admin/OrderStatusBadge.jsx'
import OrderCustomerInfo from '../../../components/order/OrderCustomerInfo.jsx'
import OrderItemsTable from '../../../components/order/OrderItemsTable.jsx'
import { getOrder } from '../../../data/orders.js'
import { formatDate } from '../../../utils/format.js'
import NotFound from '../../NotFound.jsx'

function OrderDetail() {
  const { id } = useParams()
  const order = getOrder(id)

  if (!order) return <NotFound backTo="/admin/ordenes" backLabel="Volver a órdenes" />

  return (
    <>
      <title>{`Boleta #${order.numero} | GameStore Admin`}</title>
      <AdminPageHeader title={`Boleta #${order.numero}`} subtitle={`Código ${order.codigo} · ${formatDate(order.fecha)}`}>
        <Link to="/admin/ordenes" className="btn btn-outline-secondary d-print-none">Volver</Link>
        <button type="button" className="btn btn-danger d-print-none" onClick={() => window.print()}>
          <i className="bi bi-printer"></i> Imprimir
        </button>
      </AdminPageHeader>
      <div className="bg-white rounded shadow-sm p-3 p-lg-4">
        <p>Estado: <OrderStatusBadge estado={order.estado} /> {order.motivo && <small className="text-muted ms-2">{order.motivo}</small>}</p>
        <OrderCustomerInfo order={order} />
        <div className="mt-4">
          <OrderItemsTable items={order.items} total={order.total} />
        </div>
      </div>
    </>
  )
}

export default OrderDetail
