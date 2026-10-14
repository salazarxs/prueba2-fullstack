// Lista de pares etiqueta/valor para las vistas "Mostrar" del panel
function DetailList({ items }) {
  return (
    <dl className="row mb-0">
      {items.map(item => (
        <div key={item.label} className="col-12 col-sm-6 mb-2">
          <dt className="small text-muted fw-normal">{item.label}</dt>
          <dd className="mb-0">{item.value === '' || item.value === null || item.value === undefined ? '—' : item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default DetailList
