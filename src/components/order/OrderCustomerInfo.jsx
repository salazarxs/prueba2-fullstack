const Item = ({ label, value }) => (
  <div className="col-12 col-md-6 mb-2">
    <small className="text-muted d-block">{label}</small>
    <span>{value || '—'}</span>
  </div>
)

// Datos del cliente y dirección de una orden, en modo solo lectura
function OrderCustomerInfo({ order }) {
  const { cliente, direccion } = order

  return (
    <div className="row g-3">
      <div className="col-12 col-lg-6">
        <div className="border rounded p-3 h-100">
          <h6 className="fw-bold">Información del cliente</h6>
          <div className="row">
            <Item label="Nombre" value={cliente.nombre} />
            <Item label="Apellidos" value={cliente.apellidos} />
            <Item label="Correo" value={cliente.email} />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="border rounded p-3 h-100">
          <h6 className="fw-bold">Dirección de entrega</h6>
          <div className="row">
            <Item label="Calle" value={direccion.calle} />
            <Item label="Departamento" value={direccion.depto} />
            <Item label="Región" value={direccion.region} />
            <Item label="Comuna" value={direccion.comuna} />
            <Item label="Indicaciones" value={direccion.indicaciones} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCustomerInfo
