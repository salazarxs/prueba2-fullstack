import { Link } from 'react-router-dom'

function NotFound({ backTo = '/', backLabel = 'Volver al inicio' }) {
  return (
    <>
      <title>Página no encontrada | GameStore</title>
      <div className="container py-5 text-center">
        <h1>Página no encontrada</h1>
        <p className="text-muted">La página que buscas no existe o aún no está disponible.</p>
        <Link to={backTo} className="btn btn-outline-primary">{backLabel}</Link>
      </div>
    </>
  )
}

export default NotFound
