import { formatCLP } from '../../utils/format.js'

// Fila editable del carrito. `stock` permite avisar cuando la cantidad supera lo disponible.
function CartItemRow({ item, stock, onIncrease, onDecrease, onRemove }) {
  const sinStock = stock < item.cantidad

  return (
    <tr>
      <td><img src={item.imagen} alt={item.nombre} width="64" className="rounded" /></td>
      <td>
        {item.nombre}
        {sinStock && <small className="d-block text-warning-emphasis"><i className="bi bi-exclamation-triangle"></i> Solo quedan {stock} unidades</small>}
      </td>
      <td className="text-end">{formatCLP(item.precio)}</td>
      <td>
        <div className="input-group input-group-sm flex-nowrap mx-auto" style={{ width: '7.5rem' }}>
          <button type="button" className="btn btn-outline-secondary" aria-label={`Quitar una unidad de ${item.nombre}`} onClick={onDecrease}>
            <i className="bi bi-dash"></i>
          </button>
          <input type="text" className="form-control text-center" value={item.cantidad} readOnly aria-label="Cantidad" />
          <button type="button" className="btn btn-outline-secondary" aria-label={`Agregar una unidad de ${item.nombre}`} onClick={onIncrease}>
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </td>
      <td className="text-end">{formatCLP(item.precio * item.cantidad)}</td>
      <td className="text-center">
        <button type="button" className="btn btn-sm btn-danger" onClick={onRemove}>
          <i className="bi bi-trash"></i><span className="d-none d-xl-inline"> Eliminar</span>
        </button>
      </td>
    </tr>
  )
}

export default CartItemRow
