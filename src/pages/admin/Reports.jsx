import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import StatCard from '../../components/StatCard.jsx'
import { getCategories } from '../../data/categories.js'
import { getOrders } from '../../data/orders.js'
import { getProducts } from '../../data/products.js'
import { formatCLP } from '../../utils/format.js'
import { salesByCategory, salesSummary, topProducts } from '../../utils/reports.js'

function Reports() {
  const orders = getOrders()
  const summary = salesSummary(orders)
  const byCategory = salesByCategory(orders, getProducts(), getCategories())
  const top = topProducts(orders)
  const maxCategory = Math.max(...byCategory.map(category => category.total), 1)

  return (
    <>
      <title>Reportes | GameStore Admin</title>
      <AdminPageHeader title="Reportes" subtitle="Informe de ventas a partir de las órdenes registradas" />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
        <div className="col"><StatCard title="Total vendido" value={formatCLP(summary.totalVendido)} icon="bi-cash-stack" /></div>
        <div className="col"><StatCard title="Órdenes pagadas" value={summary.pagadas} variant="success" icon="bi-check-circle" /></div>
        <div className="col"><StatCard title="Pagos rechazados" value={summary.rechazadas} variant="danger" icon="bi-x-circle" /></div>
        <div className="col"><StatCard title="Ticket promedio" value={formatCLP(summary.ticketPromedio)} variant="secondary" icon="bi-receipt" /></div>
      </div>

      {summary.pagadas === 0 ? (
        <div className="bg-white rounded shadow-sm"><EmptyState message="Aún no hay ventas para generar reportes." /></div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <h2 className="h5">Ventas por categoría</h2>
              {byCategory.map(category => (
                <div key={category.id} className="mb-2">
                  <div className="d-flex justify-content-between small">
                    <span>{category.nombre}</span><span>{formatCLP(category.total)}</span>
                  </div>
                  <div className="progress" role="progressbar" aria-label={category.nombre} aria-valuenow={category.total} aria-valuemin="0" aria-valuemax={maxCategory}>
                    <div className="progress-bar" style={{ width: `${(category.total / maxCategory) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <h2 className="h5">Productos más vendidos</h2>
              <div className="table-responsive">
                <table className="table table-sm mb-0">
                  <thead>
                    <tr><th scope="col">Producto</th><th scope="col" className="text-center">Unidades</th><th scope="col" className="text-end">Total</th></tr>
                  </thead>
                  <tbody>
                    {top.map(product => (
                      <tr key={product.id}>
                        <td>{product.nombre}</td>
                        <td className="text-center">{product.unidades}</td>
                        <td className="text-end">{formatCLP(product.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Reports
