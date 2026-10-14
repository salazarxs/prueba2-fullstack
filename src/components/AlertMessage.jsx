// Alerta flotante (se combina con useTimedAlert para ocultarla sola)
function AlertMessage({ message, variant = 'success' }) {
  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-3 z-3 px-3 w-100" style={{ maxWidth: '32rem' }}>
      <div className={`alert alert-${variant} shadow mb-0`} role="alert">
        {message}
      </div>
    </div>
  )
}

export default AlertMessage
