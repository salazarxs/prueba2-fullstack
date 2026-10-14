// Encabezado común de las páginas del panel: título, subtítulo y acciones (botones)
function AdminPageHeader({ title, subtitle, children }) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
      <div>
        <h1 className="h3 mb-0">{title}</h1>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
      {children && <div className="d-flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}

export default AdminPageHeader
