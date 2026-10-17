import { act, renderHook } from '@testing-library/react'
import CartProvider from '../../context/CartProvider.jsx'
import { useCart } from '../../hooks/useCart.js'
import { resetDb, sampleProduct } from '../helpers.jsx'

const setup = () => renderHook(() => useCart(), { wrapper: CartProvider })

describe('CartProvider / useCart (estado global del carrito)', () => {
  beforeEach(resetDb)

  it('el carrito parte vacío', () => {
    const { result } = setup()
    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
    expect(result.current.total).toBe(0)
  })

  it('agrega productos, suma cantidades y calcula el total', () => {
    const { result } = setup()
    act(() => result.current.add(sampleProduct, 2))
    expect(result.current.count).toBe(2)
    expect(result.current.total).toBe(99980)
  })

  it('cambia la cantidad y elimina el ítem cuando llega a 0', () => {
    const { result } = setup()
    act(() => result.current.add(sampleProduct, 1))
    act(() => result.current.changeQuantity(1, 2))
    expect(result.current.items[0].cantidad).toBe(3)
    act(() => result.current.changeQuantity(1, -3))
    expect(result.current.items.length).toBe(0)
  })

  it('persiste el carrito en localStorage', () => {
    const { result } = setup()
    act(() => result.current.add(sampleProduct))
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(1)
    act(() => result.current.clear())
    expect(JSON.parse(localStorage.getItem('carrito'))).toEqual([])
  })
})