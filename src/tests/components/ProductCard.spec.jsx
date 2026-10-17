import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../../components/ProductCard.jsx'

const producto = {
    id: 1,
    nombre: 'Zelda',
    descripcion: 'Aventura',
    precio: 49990,
    precioOferta: null,
    categoriaId: 1,
    stock: 5,
    stockCritico: 3,
    imagen: 'Zelda.png'
}

const renderCard = (props) =>
    render(
        <MemoryRouter>
            <ProductCard product={producto} {...props} />
        </MemoryRouter>,
    )

describe('ProductCard (props, eventos y mocks)', () => {
    it('llama a onAdd con el producto al hacer clic en "Añadir"', () => {
        const onAdd = jasmine.createSpy('onAdd')
        renderCard({ onAdd })

        fireEvent.click(screen.getByRole('button', { name: /Añadir/ }))

        expect(onAdd).toHaveBeenCalledTimes(1)
        expect(onAdd).toHaveBeenCalledWith(producto)
    })
    
    it('con stock 0 deshabilita el boton y no llama a onAdd', () => {
        const onAdd = jasmine.createSpy('onAdd')
        renderCard({ product: { ...producto, stock: 0 }, onAdd })

        const boton = screen.getByRole('button', { name: /Añadir/ })
        expect(boton.disabled).toBeTrue()

        fireEvent.click(boton)
        expect(onAdd).not.toHaveBeenCalled()
    })

    it('no muestra el boton "Añadir" si no recibe onAdd', () => {
        renderCard()

        expect(screen.queryByText(/Añadir/)).toBeNull()
    })
})