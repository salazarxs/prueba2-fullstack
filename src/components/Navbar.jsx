import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getCategories } from '../data/categories.js'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { formatCLP } from '../utils/format.js'
import SearchBar from './SearchBar.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/ofertas', label: 'Ofertas' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { total, count } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const categories = getCategories()

  // Cierra el menú colapsado al navegar (en móvil)
  const close = () => setOpen(false)

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-xl bg-body-tertiary shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" onClick={close}>
          <i className="bi bi-controller text-primary"></i> GameStore
        </Link>
        <button
          className="navbar-toggler" type="button" aria-controls="navbarMain"
          aria-expanded={open} aria-label="Abrir navegación" onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            {links.slice(0, 2).map(link => (
              <li key={link.to} className="nav-item">
                <NavLink className="nav-link" to={link.to} end={link.end} onClick={close}>{link.label}</NavLink>
              </li>
            ))}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/categorias" onClick={close}>Todas las categorías</Link></li>
                <li><hr className="dropdown-divider" /></li>
                {categories.map(category => (
                  <li key={category.id}>
                    <Link className="dropdown-item" to={`/categorias/${category.id}`} onClick={close}>{category.nombre}</Link>
                  </li>
                ))}
              </ul>
            </li>
            {links.slice(2).map(link => (
              <li key={link.to} className="nav-item">
                <NavLink className="nav-link" to={link.to} onClick={close}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column flex-xl-row align-items-xl-center gap-2">
            <SearchBar />
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="small text-nowrap"><i className="bi bi-person-circle"></i> {user.nombre}</span>
                {isAdmin && <Link to="/admin" className="btn btn-sm btn-dark" onClick={close}>Admin</Link>}
                <button type="button" className="btn btn-sm btn-outline-danger text-nowrap" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-sm btn-outline-secondary text-nowrap" onClick={close}>Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-sm btn-outline-primary text-nowrap" onClick={close}>Crear cuenta</Link>
              </div>
            )}
            <Link to="/carrito" className="btn btn-success text-nowrap" onClick={close}>
              <i className="bi bi-cart2"></i> Carrito {formatCLP(total)}
              {count > 0 && <span className="badge text-bg-light ms-1">{count}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
