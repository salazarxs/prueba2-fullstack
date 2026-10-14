import { Link, useLocation, useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import FormField from '../components/form/FormField.jsx'
import RegionComunaFields from '../components/form/RegionComunaFields.jsx'
import OrderItemsTable from '../components/order/OrderItemsTable.jsx'
import { processPayment } from '../data/orders.js'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { useForm } from '../hooks/useForm.js'
import { formatCLP } from '../utils/format.js'
import { validateCheckout } from '../utils/validators.js'

const emptyCheckout = {
  nombre: '', apellidos: '', email: '', calle: '', depto: '', region: '', comuna: '', indicaciones: '',
}

// Precarga: 1) datos de un pago rechazado (reintento), 2) usuario logueado, 3) vacío
const initialValues = (retryOrder, user) => {
  if (retryOrder) return { ...emptyCheckout, ...retryOrder.cliente, ...retryOrder.direccion }
  if (user) {
    const { nombre, apellidos, email, calle, depto, region, comuna } = user
    return { ...emptyCheckout, nombre, apellidos, email, calle, depto, region, comuna }
  }
  return emptyCheckout
}

function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues(location.state?.retry, user),
    validateCheckout,
  )

  if (items.length === 0) {
    return (
      <>
        <title>Checkout | GameStore</title>
        <EmptyState message="Tu carrito está vacío.">
          <Link to="/productos" className="btn btn-primary">Ver productos</Link>
        </EmptyState>
      </>
    )
  }

  const pay = (data) => {
    const order = processPayment({
      cliente: { nombre: data.nombre.trim(), apellidos: data.apellidos.trim(), email: data.email.trim() },
      direccion: { calle: data.calle.trim(), depto: data.depto.trim(), region: data.region, comuna: data.comuna, indicaciones: data.indicaciones.trim() },
      items,
      usuarioId: user?.id ?? null,
    })
    if (order.estado === 'pagada') {
      clear()
      navigate(`/compra/exito/${order.id}`)
    } else {
      navigate(`/compra/error/${order.id}`)
    }
  }

  const field = (name) => ({ name, value: values[name], onChange: handleChange, error: errors[name] })

  return (
    <>
      <title>Checkout | GameStore</title>
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div>
            <h1 className="h2 mb-0">Carrito de compra</h1>
            <p className="text-muted mb-0">Completa la siguiente información</p>
          </div>
          <div className="alert alert-primary mb-0 py-2">Total a pagar: <strong>{formatCLP(total)}</strong></div>
        </div>

        <OrderItemsTable items={items} total={total} />

        <form className="row" onSubmit={handleSubmit(pay)} noValidate>
          <h2 className="h5 mt-3">Información del cliente</h2>
          <p className="text-muted small">
            {user ? 'Datos completados desde tu cuenta; puedes modificarlos.' : <>¿Tienes cuenta? <Link to="/login">Inicia sesión</Link> para autocompletar.</>}
          </p>
          <FormField label="Nombre" required className="col-12 col-md-4" {...field('nombre')} />
          <FormField label="Apellidos" required className="col-12 col-md-4" {...field('apellidos')} />
          <FormField label="Correo" type="email" required className="col-12 col-md-4" {...field('email')} />

          <h2 className="h5 mt-3">Dirección de entrega de los productos</h2>
          <p className="text-muted small">Ingrese la dirección de forma detallada</p>
          <FormField label="Calle" required className="col-12 col-md-8" placeholder="Av. España 8" {...field('calle')} />
          <FormField label="Departamento (opcional)" className="col-12 col-md-4" placeholder="Ej.: 603" {...field('depto')} />
          <RegionComunaFields values={values} errors={errors} onChange={handleChange} />
          <FormField
            as="textarea" label="Indicaciones para la entrega (opcional)"
            placeholder="Ej.: Entre calles, color del edificio, no tiene timbre." {...field('indicaciones')}
          />

          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-success btn-lg">Pagar ahora {formatCLP(total)}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout
