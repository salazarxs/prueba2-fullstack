import { useParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage.jsx'
import OrderCustomerInfo from '../components/order/OrderCustomerInfo.jsx'
import OrderItemsTable from '../components/order/OrderItemsTable.jsx'
import { getOrder } from '../data/orders.js'
import { useTimedAlert } from '../hooks/useTimedAlert.js'
import NotFound from './NotFound.jsx'

function PurchaseSuccess() {
  const { id } = useParams()
  const order = getOrder(id)
  const [alertVisible, showAlert] = useTimedAlert()

  if (!order || order.estado !== 'pagada') return <NotFound />

  return (
    <>
      <title>Compra exitosa | GameStore</title>
      {alertVisible && <AlertMessage message={`Boleta enviada a ${order.cliente.email}`} />}
      <div className="container py-4">
        <h1 className="h3 text-success">
          <i className="bi bi-check-circle-fill"></i> Se ha realizado la compra. nro #{order.numero}
        </h1>
        <p className="text-muted">Código orden: <strong>{order.codigo}</strong></p>

        <OrderCustomerInfo order={order} />
        <div className="mt-4">
          <OrderItemsTable items={order.items} total={order.total} totalLabel="Total pagado" />
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end d-print-none">
          <button type="button" className="btn btn-danger" onClick={() => window.print()}>
            <i className="bi bi-file-earmark-pdf"></i> Imprimir boleta en PDF
          </button>
          <button type="button" className="btn btn-success" onClick={showAlert}>
            <i className="bi bi-envelope"></i> Enviar boleta por email
          </button>
        </div>
      </div>
    </>
  )
}

export default PurchaseSuccess
