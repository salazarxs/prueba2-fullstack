import { addItem, calculateCartTotal, changeItemQuantity, countItems, removeItem } from '../../utils/cart.js'

const zelda = {
    id: 1,
    nombre: 'Zelda',
    precio: 1000,
    precioOferta: null,
    imagen: 'z.png'
}

const mario = {
    id: 2,
    nombre: 'Mario',
    precio: 2000,
    precioOferta: 1500,
    imagen: 'm.png'
}

describe('utils/cart', () => {
    it('addItem agrega un producto nuevo con cantidad 1 por defecto', () => {
        expect(addItem([], zelda)).toEqual([{ id: 1, nombre: 'Zelda', precio: 1000, imagen: 'z.png', cantidad: 1 }])
    })

    it('addItem suma cantidad si el producto ya existe', () => {
        const cart = addItem([], zelda, 2)
        expect(addItem(cart, zelda, 3)[0].cantidad).toBe(5)
    })

    it('addItem usa el precio de oferta cuando existe', () => {
        expect(addItem([], mario)[0].precio).toBe(1500)
    })

    it('changeItemQuantity modifica la cantidad y elimina al llegar a 0', () => {
        const cart = addItem([], zelda, 2)
        expect(changeItemQuantity(cart, 1, 1)[0].cantidad).toBe(3)
        expect(changeItemQuantity(cart, 1, -2)).toEqual([])
    })

    it('removeItem elimina solo el producto indicado', () => {
        const cart = addItem(addItem([], zelda), mario)
        expect(removeItem(cart, 1).map(item => item.id)).toEqual([2])
    })

    it('calculateCartTotal y countItems suman correctamente', () => {
        const cart = addItem(addItem([], zelda, 2), mario, 1)
        expect(calculateCartTotal(cart)).toBe(2 * 1000 + 1500)
        expect(countItems(cart)).toBe(3)
    })

    it('no muta el carrito original (funcion pura)', () => {
        const cart = addItem([], zelda)
        addItem(cart, zelda, 5)
        expect(cart[0].cantidad).toBe(1)
    })
})