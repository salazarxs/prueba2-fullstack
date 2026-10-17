import { discountPercent, getPrecioFinal, isOnSale } from '../../utils/format.js'

describe('utils/format', () => {
    it('isOnSale es true cuando la oferta es menor al precio normal', () => {
        expect(isOnSale({ precio: 100, precioOferta: 80 })).toBeTrue()
    })

    it('isOnSale es false cuando precioOferta es null', () => {
        expect(isOnSale({ precio: 100, precioOferta: null })).toBeFalse()
    })

    it('isOnSale es false cuando la oferta es igual al precio normal', () => {
        expect(isOnSale({ precio: 100, precioOferta: 100 })).toBeFalse()
    })

    it('getPrecioFinal devuelve la oferta cuando hay oferta', () => {
        expect(getPrecioFinal({ precio: 100, precioOferta: 80 })).toBe(80)
    })

    it('getPrecioFinal devuelve el precio normal cuando no hay oferta', () => {
        expect(getPrecioFinal({ precio: 100, precioOferta: null })).toBe(100)
    })

    it('discountPercent calcula el porcentaje de descuento', () => {
        expect(discountPercent({ precio: 10000, precioOferta: 7500 })).toBe(25)
    })
})