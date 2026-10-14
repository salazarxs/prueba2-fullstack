import { Link } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx'
import { adminRoutes } from '../../components/admin/adminRoutes.js'
import StatCard from '../../components/StatCard.jsx'
import { getOrders } from '../../data/orders.js'
import { getCriticalProducts, getProducts } from '../../data/products.js'
import { getUsers } from '../../data/users.js'
import { formatCLP } from '../../utils/format.js'
import { salesSummary } from '../../utils/reports.js'

const accessCards = [
  ...adminRoutes,
  { label: 'Tienda', path: '/', icon: 'bi-shop', description: 'Visualiza tu tienda en tiempo real, tal como la ven los clientes.' },
]

function Dashboard() {
  const summary = salesSummary(getOrders())
  const products = getProducts()
  const users = getUsers()
  const inventario = products.reduce((sum, product) => sum + product.stock, 0)

  return (
    <>
      <title>Dashboard | GameStore Admin</title>
      <AdminPageHeader title="Dashboard" subtitle="Resumen de las actividades diarias" />

      <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
        <div className="col">
          <StatCard title="Compras" value={summary.pagadas} detail={`Total vendido: ${formatCLP(summary.totalVendido)}`} icon="bi-cart-check" />
        </div>
        <div className="col">
          <StatCard
            title="Productos" value={products.length} variant="success" icon="bi-box-seam"
            detail={`Inventario actual: ${inventario} · Críticos: ${getCriticalProducts().length}`}
          />
        </div>
        <div className="col">
          <StatCard
            title="Usuarios" value={users.length} variant="warning" icon="bi-people"
            detail={`Clientes: ${users.filter(user => user.rol === 'cliente').length}`}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
        {accessCards.map(card => (
          <div key={card.path} className="col">
            <Link to={card.path} className="card h-100 text-decoration-none shadow-sm">
              <div className="card-body text-center">
                <i className={`bi ${card.icon} fs-1 text-primary`}></i>
                <h2 className="h6 mt-2">{card.label}</h2>
                <p className="small text-muted mb-0">{card.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
