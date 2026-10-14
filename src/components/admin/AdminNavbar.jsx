import { NavLink } from 'react-router-dom'
import { adminRoutes } from './adminRoutes.js'

// Menú lateral del panel. `onNavigate` cierra el offcanvas en móvil.
function AdminNavbar({ onNavigate, onLogout }) {
  return (
    <nav className="nav flex-column gap-1">
      {adminRoutes.map(route => (
        <NavLink
          key={route.path} to={route.path} end={route.end} onClick={onNavigate}
          className={({ isActive }) => `nav-link rounded ${isActive ? 'active bg-primary text-white' : 'text-white'}`}
        >
          <i className={`bi ${route.icon} me-2`}></i>{route.label}
        </NavLink>
      ))}
      <hr className="border-secondary" />
      <NavLink to="/" className="btn btn-light btn-sm" onClick={onNavigate}>
        <i className="bi bi-shop me-1"></i>Tienda
      </NavLink>
      <button type="button" className="btn btn-danger btn-sm" onClick={onLogout}>
        <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
      </button>
    </nav>
  )
}

export default AdminNavbar
