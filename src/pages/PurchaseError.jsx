import { useNavigate, useParams } from 'react-router-dom'
import OrderCustomerInfo from '../components/order/OrderCustomerInfo.jsx'
import OrderItemsTable from '../components/order/OrderItemsTable.jsx'
import { getOrder } from '../data/orders.js'
import NotFound from './NotFound.jsx'

function PurchaseError() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = getOrder(id)

  if (!order || order.estado !== 'rechazada') return <NotFound />

  return (
    <>
      <title>Pago rechazado | GameStore</title>
      <div className="container py-4">
        <h1 className="h3 text-danger">
          <i className="bi bi-x-circle-fill"></i> No se pudo realizar el pago. nro #{order.numero}
        </h1>
        <p className="text-muted mb-1">Detalle de compra</p>
        {order.motivo && <div className="alert alert-warning">{order.motivo}. Ajusta las cantidades en el carrito e inténtalo nuevamente.</div>}

        <button
          type="button" className="btn btn-success mb-4"
          onClick={() => navigate('/checkout', { state: { retry: order } })}
        >
          VOLVER A REALIZAR EL PAGO
        </button>

        <OrderCustomerInfo order={order} />
        <div className="mt-4">
          <OrderItemsTable items={order.items} total={order.total} totalLabel="Total a pagar" />
        </div>
      </div>
    </>
  )
}

export default PurchaseError
