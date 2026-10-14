import AlertMessage from '../components/AlertMessage.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getOffers } from '../data/products.js'
import { useAddToCart } from '../hooks/useAddToCart.js'

function Offers() {
  const { addToCart, alertVisible, message } = useAddToCart()

  return (
    <>
      <title>Ofertas | GameStore</title>
      {alertVisible && <AlertMessage message={message} />}
      <div className="container py-4">
        <h1 className="h2">Ofertas</h1>
        <p className="text-muted mb-4">Todos los productos con descuento disponibles hoy.</p>
        <ProductGrid products={getOffers()} onAdd={addToCart} emptyMessage="No hay ofertas por ahora." />
      </div>
    </>
  )
}

export default Offers
