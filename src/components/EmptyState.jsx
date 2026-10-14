function EmptyState({ message, children }) {
  return (
    <div className="text-center text-muted py-5">
      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
      <p className="mb-3">{message}</p>
      {children}
    </div>
  )
}

export default EmptyState
