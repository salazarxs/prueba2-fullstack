import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-white-50 mt-5 py-4">
      <div className="container">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <p className="text-white fw-bold mb-1"><i className="bi bi-controller"></i> GameStore</p>
            <small>Tu tienda online de videojuegos.</small>
          </div>
          <div className="col-6 col-md-4">
            <ul className="list-unstyled mb-0">
              <li><Link to="/productos" className="link-light">Productos</Link></li>
              <li><Link to="/ofertas" className="link-light">Ofertas</Link></li>
              <li><Link to="/categorias" className="link-light">Categorías</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <ul className="list-unstyled mb-0">
              <li><Link to="/nosotros" className="link-light">Nosotros</Link></li>
              <li><Link to="/blog" className="link-light">Blog</Link></li>
              <li><Link to="/contacto" className="link-light">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <small>© 2026 GameStore · Proyecto DSY1104 Duoc UC</small>
      </div>
    </footer>
  )
}

export default Footer
