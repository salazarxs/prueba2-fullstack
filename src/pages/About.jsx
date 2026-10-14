const values = [
  { icon: 'bi-lightning-charge', title: 'Entrega inmediata', text: 'Recibe tus códigos digitales por correo apenas se confirma el pago.' },
  { icon: 'bi-shield-check', title: 'Compra segura', text: 'Productos originales y soporte ante cualquier problema con tu pedido.' },
  { icon: 'bi-people', title: 'Comunidad', text: 'Organizamos torneos y eventos para jugadores de todo Chile.' },
]

function About() {
  return (
    <>
      <title>Nosotros | GameStore</title>
      <div className="container py-4">
        <div className="row g-4 align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <h1 className="h2">Sobre GameStore</h1>
            <p className="text-muted">
              Somos una tienda online chilena dedicada a los videojuegos. Nacimos como un proyecto de estudiantes
              de Duoc UC con el objetivo de acercar los mejores títulos a precios justos, con despacho a todo el país.
            </p>
            <p className="text-muted">
              Nuestro catálogo incluye juegos de aventura, acción, deportes, indie y estrategia, con ofertas
              que se renuevan cada semana.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <img src="https://placehold.co/800x450/webp?text=Equipo+GameStore" alt="Equipo GameStore" className="w-100 h-auto rounded" />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {values.map(value => (
            <div key={value.title} className="col">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <i className={`bi ${value.icon} fs-1 text-primary`}></i>
                  <h2 className="h5 mt-2">{value.title}</h2>
                  <p className="text-muted mb-0">{value.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default About
