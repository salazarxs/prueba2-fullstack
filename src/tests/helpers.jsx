import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider.jsx'
import CartProvider from '../context/CartProvider.jsx'
import { initDb } from '../data/init.js'

export const resetDb = () => {
    localStorage.clear()
    initDb()
}

export function LocationDisplay() {
    const location = useLocation()
    return <p data-testid="location">{location.pathname + location.search}</p>
}

export const renderWithProviders = (ui, { route = '/' } = {}) =>
    render(
        <MemoryRouter initialEntries={[route]}>
            <AuthProvider>
                <CartProvider>{ui}</CartProvider>
            </AuthProvider>
        </MemoryRouter>,
    )

export const sampleProduct = {
    id: 1,
    nombre: 'Zelda',
    descripcion: 'Aventura',
    precio: 49990,
    precioOferta: null,
    categoriaId: 1,
    stock: 5,
    stockCritico: 3,
    imagen: 'zelda.png',
}