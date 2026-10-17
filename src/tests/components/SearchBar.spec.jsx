import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import SearchBar from '../../components/SearchBar.jsx'

function LocationDisplay() {
    const location = useLocation()
    return <p data-testid="location">{location.pathname + location.search}</p>
}

const renderSearch = () =>
    render(
        <MemoryRouter>
            <SearchBar />
            <LocationDisplay />
        </MemoryRouter>,
    )

describe('SearchBar (estado y eventos)', () => {
    it('actualiza el valor del input al escribir', () => {
        renderSearch()

        const input = screen.getByLabelText('Buscar')
        fireEvent.change(input, { target: { value: 'zelda' } })

        expect(input.value).toBe('zelda')
    })

    it('al buscar navega a /productos con el termino codificado', () => {
        renderSearch()

        fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'god of war' } })
        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

        expect(screen.getByTestId('location').textContent).toBe('/productos?q=god%20of%20war')
    })

    it('con el campo vacio navega a /productos sin parametros', () => {
        renderSearch()

        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

        expect(screen.getByTestId('location').textContent).toBe('/productos')
    })
})