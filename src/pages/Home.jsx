import { Link } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getCategories } from '../data/categories.js'
import { getOffers, getProducts } from '../data/products.js'
import { useAddToCart } from '../hooks/useAddToCart.js'

const slides = [
  { title: 'Nuevos Lanzamientos', text: 'Descubre los últimos juegos disponibles en nuestra tienda', to: '/productos' },
  { title: 'Ofertas de la semana', text: 'Hasta 70% de descuento en títulos seleccionados', to: '/ofertas' },
  { title: 'Explora por categoría', text: 'Aventura, acción, deportes, indie y estrategia', to: '/categorias' },
]

function Home() {
  const { addToCart, alertVisible, message } = useAddToCart()
  const categories = getCategories()
  const offers = getOffers().slice(0, 4)
  const featured = getProducts().slice(0, 8)

  return (
    <>
      <title>Inicio | GameStore</title>
      {alertVisible && <AlertMessage message={message} />}

      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {slides.map((slide, i) => (
            <button
              key={slide.title} type="button" data-bs-target="#homeCarousel" data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''} aria-current={i === 0} aria-label={slide.title}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((slide, i) => (
            <div key={slide.title} className={`carousel-item${i === 0 ? ' active' : ''}`}>
              <img src={`https://placehold.co/1200x300/1f2937/1f2937/webp`} className="d-block w-100 carousel-img" alt="" />
              <div className="carousel-caption">
                <h2 className="fw-bold">{slide.title}</h2>
                <p className="d-none d-sm-block">{slide.text}</p>
                <Link to={slide.to} className="btn btn-primary btn-sm">Ver más</Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="container py-4">
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Categorías</h2>
            <Link to="/categorias">Ver todas</Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-3">
            {categories.map(category => (
              <div key={category.id} className="col"><CategoryCard category={category} /></div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Ofertas</h2>
            <Link to="/ofertas">Ver todas</Link>
          </div>
          <ProductGrid products={offers} onAdd={addToCart} emptyMessage="No hay ofertas por ahora." />
        </section>

        <section>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Destacados</h2>
            <Link to="/productos">Ver catálogo</Link>
          </div>
          <ProductGrid products={featured} onAdd={addToCart} />
        </section>
      </div>
    </>
  )
}

export default Home
