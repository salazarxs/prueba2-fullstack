import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductGrid from '../../components/ProductGrid.jsx'
import { productos } from '../../data/db.js'
import { resetDb } from '../helpers.jsx'

describe('ProductGrid (renderizado de listas)', () => {
  beforeEach(resetDb)

  it('renderiza una tarjeta por cada producto del conjunto de datos', () => {
    render(<MemoryRouter><ProductGrid products={productos} /></MemoryRouter>)

    // Cada tarjeta tiene exactamente un botón "Ver"
    expect(screen.getAllByText('Ver').length).toBe(productos.length)
    productos.forEach(product => {
      expect(screen.getAllByText(product.nombre).length).toBeGreaterThan(0)
    })
  })

  it('muestra el mensaje por defecto cuando la lista está vacía', () => {
    render(<MemoryRouter><ProductGrid products={[]} /></MemoryRouter>)
    expect(screen.getByText('No se encontraron productos.')).toBeTruthy()
    expect(screen.queryAllByText('Ver').length).toBe(0)
  })

  it('muestra un mensaje personalizado cuando se entrega emptyMessage', () => {
    render(<MemoryRouter><ProductGrid products={[]} emptyMessage="Sin ofertas hoy" /></MemoryRouter>)
    expect(screen.getByText('Sin ofertas hoy')).toBeTruthy()
  })
})