import { fireEvent, screen } from '@testing-library/react'
import ProductList from '../../../pages/admin/products/ProductList.jsx'
import {
  renderWithProviders,
  resetDb,
} from '../../helpers.jsx'

describe('Administración de productos - ProductList', () => {
  beforeEach(() => {
    resetDb()
  })

  it('muestra el listado de productos', () => {
    renderWithProviders(<ProductList />, {
      route: '/admin/productos',
    })

    expect(
      screen.getByRole('searchbox', {
        name: 'Buscar producto',
      })
    ).toBeTruthy()

    expect(
      screen.getByRole('table')
    ).toBeTruthy()
  })
    it('permite buscar productos por nombre', () => {
    renderWithProviders(<ProductList />, {
        route: '/admin/productos',
    })

    const buscador = screen.getByRole('searchbox', {
        name: 'Buscar producto',
    })

    fireEvent.change(buscador, {
        target: { value: 'Zelda' },
    })

    expect(buscador.value).toBe('Zelda')
    })
        it('no elimina un producto si se cancela la confirmación', () => {
        const confirmSpy = spyOn(window, 'confirm').and.returnValue(false)

        renderWithProviders(<ProductList />, {
            route: '/admin/productos',
        })

        const botonesEliminar = screen.getAllByRole('button', {
            name: 'Eliminar',
        })

        const cantidadInicial = botonesEliminar.length

        fireEvent.click(botonesEliminar[0])

        expect(confirmSpy).toHaveBeenCalled()

        expect(
            screen.getAllByRole('button', { name: 'Eliminar' }).length
        ).toBe(cantidadInicial)
        })
        it('elimina un producto cuando se confirma', () => {
            const confirmSpy = spyOn(window, 'confirm').and.returnValue(true)
            renderWithProviders(<ProductList />, {
                route: '/admin/productos',
            })
            const botonesEliminar = screen.getAllByRole('button', {
                name: 'Eliminar',
            })
            const cantidadInicial = botonesEliminar.length
            fireEvent.click(botonesEliminar[0])
            expect(confirmSpy).toHaveBeenCalled()
            expect(
                screen.getAllByRole('button', { name: 'Eliminar' }).length
                ).toBe(cantidadInicial - 1)
            })                
})