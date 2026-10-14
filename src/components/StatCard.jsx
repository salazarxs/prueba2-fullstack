function StatCard({ title, value, detail, icon, variant = 'primary' }) {
  return (
    <div className={`card text-bg-${variant} h-100 shadow-sm`}>
      <div className="card-body d-flex align-items-center gap-3">
        <i className={`bi ${icon} fs-1`}></i>
        <div>
          <h6 className="card-title mb-1">{title}</h6>
          <p className="fs-3 fw-bold mb-0">{value}</p>
          {detail && <small>{detail}</small>}
        </div>
      </div>
    </div>
  )
}

export default StatCard
