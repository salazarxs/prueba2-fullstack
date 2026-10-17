import { fireEvent, render, screen } from '@testing-library/react'
import CartItemRow from '../../components/cart/CartItemRow.jsx'

const item = { id: 1, nombre: 'Zelda', precio: 1000, imagen: 'z.png', cantidad: 2 }

const renderRow = (props = {}) => {
  const handlers = {
    onIncrease: jasmine.createSpy('onIncrease'),
    onDecrease: jasmine.createSpy('onDecrease'),
    onRemove: jasmine.createSpy('onRemove'),
  }
  render(<table><tbody><CartItemRow item={item} stock={10} {...handlers} {...props} /></tbody></table>)
  return handlers
}

describe('CartItemRow (eventos de usuario)', () => {
  it('muestra la cantidad y calcula el subtotal', () => {
    renderRow()
    expect(screen.getByLabelText('Cantidad').value).toBe('2')
    expect(screen.getByText(/2\.000/)).toBeTruthy() // subtotal 1000 x 2
  })

  it('el botón + ejecuta onIncrease', () => {
    const { onIncrease } = renderRow()
    fireEvent.click(screen.getByLabelText('Agregar una unidad de Zelda'))
    expect(onIncrease).toHaveBeenCalledTimes(1)
  })

  it('el botón − ejecuta onDecrease', () => {
    const { onDecrease } = renderRow()
    fireEvent.click(screen.getByLabelText('Quitar una unidad de Zelda'))
    expect(onDecrease).toHaveBeenCalledTimes(1)
  })

  it('el botón Eliminar ejecuta onRemove', () => {
    const { onRemove } = renderRow()
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/ }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('avisa solo cuando el stock es menor a la cantidad pedida', () => {
    renderRow({ stock: 1 })
    expect(screen.getByText(/Solo quedan 1 unidades/)).toBeTruthy()
  })

  it('no avisa si hay stock suficiente', () => {
    renderRow({ stock: 2 })
    expect(screen.queryByText(/Solo quedan/)).toBeNull()
  })
})