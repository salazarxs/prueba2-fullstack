import { formatCLP } from '../../utils/format.js'

// Tabla de productos de un carrito u orden (solo lectura) con su total
function OrderItemsTable({ items, total, totalLabel = 'Total' }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col" className="text-end">Precio</th>
            <th scope="col" className="text-center">Cantidad</th>
            <th scope="col" className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td><img src={item.imagen} alt={item.nombre} width="64" className="rounded" /></td>
              <td>{item.nombre}</td>
              <td className="text-end">{formatCLP(item.precio)}</td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">{formatCLP(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="4" className="text-end">{totalLabel}</th>
            <th className="text-end">{formatCLP(total)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default OrderItemsTable
