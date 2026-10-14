import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../components/admin/AdminNavbar.jsx'
import { useAuth } from '../hooks/useAuth.js'

// Layout del panel: barra superior + menú lateral que en móvil se vuelve offcanvas
function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="navbar navbar-dark bg-dark sticky-top px-3 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-outline-light btn-sm d-md-none" aria-label="Abrir menú" onClick={() => setMenuOpen(true)}>
            <i className="bi bi-list"></i>
          </button>
          <Link className="navbar-brand" to="/admin"><i className="bi bi-controller"></i> GameStore Admin</Link>
        </div>
        <span className="text-white-50 small d-none d-sm-inline"><i className="bi bi-person-circle"></i> {user.nombre} {user.apellidos}</span>
      </header>
      <div className="container-fluid flex-grow-1 d-flex flex-column">
        <div className="row flex-grow-1">
          <aside className="col-md-3 col-xl-2 p-0 bg-dark">
            <div className={`offcanvas-md offcanvas-start bg-dark text-white${menuOpen ? ' show' : ''}`} tabIndex="-1">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">Menú</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={closeMenu}></button>
              </div>
              <div className="offcanvas-body">
                <div className="w-100 p-md-3">
                  <AdminNavbar onNavigate={closeMenu} onLogout={handleLogout} />
                </div>
              </div>
            </div>
          </aside>
          <main className="col-md-9 col-xl-10 p-3 p-lg-4 bg-body-tertiary">
            <Outlet />
          </main>
        </div>
      </div>
      {menuOpen && <div className="offcanvas-backdrop fade show d-md-none" onClick={closeMenu}></div>}
    </div>
  )
}

export default AdminLayout
