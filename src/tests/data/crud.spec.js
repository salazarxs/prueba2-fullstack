import { productos } from '../../data/db.js'
import { createOrder, findStockProblems, processPayment } from '../../data/orders.js'
import {
  createProduct, deleteProduct, filterProducts, getCriticalProducts, getOffers,
  getProduct, getProducts, updateProduct,
} from '../../data/products.js'
import { authenticate, findUserByEmail, isEmailTaken } from '../../data/users.js'
import { resetDb } from '../helpers.jsx'

describe('Capa de datos simulada (CRUD sobre localStorage)', () => {
  beforeEach(resetDb)

  describe('productos', () => {
    it('Read: la semilla carga todos los productos', () => {
      expect(getProducts().length).toBe(productos.length)
      expect(getProduct(1).nombre).toContain('Zelda')
      expect(getProduct(9999)).toBeNull()
    })

    it('Create: asigna un id autoincremental y persiste', () => {
      const nuevo = createProduct({ nombre: 'Nuevo', precio: 1000, stock: 1, categoriaId: 1 })
      expect(nuevo.id).toBe(productos.length + 1)
      expect(getProduct(nuevo.id).nombre).toBe('Nuevo')
    })

    it('Update: modifica solo los campos indicados y conserva el id', () => {
      const updated = updateProduct(1, { stock: 99 })
      expect(updated.stock).toBe(99)
      expect(updated.id).toBe(1)
      expect(getProduct(1).nombre).toContain('Zelda')
    })

    it('Delete: elimina el producto y devuelve true/false', () => {
      expect(deleteProduct(1)).toBeTrue()
      expect(getProduct(1)).toBeNull()
      expect(deleteProduct(1)).toBeFalse()
    })

    it('getOffers devuelve solo productos con descuento', () => {
      const offers = getOffers()
      expect(offers.length).toBeGreaterThan(0)
      offers.forEach(product => expect(product.precioOferta).toBeLessThan(product.precio))
    })

    it('getCriticalProducts devuelve los que tienen stock <= stock crítico', () => {
      updateProduct(2, { stock: 0 })
      expect(getCriticalProducts().some(product => product.id === 2)).toBeTrue()
    })
  })

  describe('filterProducts (filtros de búsqueda)', () => {
    it('filtra por texto sin distinguir mayúsculas', () => {
      const result = filterProducts(getProducts(), { q: 'ZELDA' })
      expect(result.length).toBe(1)
    })

    it('filtra por categoría', () => {
      const result = filterProducts(getProducts(), { categoriaId: '4' })
      expect(result.length).toBeGreaterThan(0)
      result.forEach(product => expect(product.categoriaId).toBe(4))
    })

    it('ordena por precio final ascendente y descendente', () => {
      const asc = filterProducts(getProducts(), { orden: 'precio-asc' })
      const desc = filterProducts(getProducts(), { orden: 'precio-desc' })
      expect(asc[0].precio).toBeLessThanOrEqual(asc[asc.length - 1].precio)
      expect(desc[0].precio).toBeGreaterThanOrEqual(desc[desc.length - 1].precio)
    })

    it('sin coincidencias devuelve una lista vacía', () => {
      expect(filterProducts(getProducts(), { q: 'xyz-no-existe' })).toEqual([])
    })
  })

  describe('usuarios y sesión', () => {
    it('authenticate acepta credenciales correctas y rechaza incorrectas', () => {
      expect(authenticate('admin@duoc.cl', 'admin123').rol).toBe('admin')
      expect(authenticate('admin@duoc.cl', 'mala')).toBeNull()
      expect(authenticate('noexiste@duoc.cl', 'x')).toBeNull()
    })

    it('findUserByEmail ignora mayúsculas y espacios', () => {
      expect(findUserByEmail('  ADMIN@duoc.cl ')).not.toBeNull()
    })

    it('isEmailTaken permite excluir al propio usuario (edición)', () => {
      const admin = findUserByEmail('admin@duoc.cl')
      expect(isEmailTaken('admin@duoc.cl')).toBeTrue()
      expect(isEmailTaken('admin@duoc.cl', admin.id)).toBeFalse()
    })
  })

  describe('órdenes y simulación de pago', () => {
    const cliente = { nombre: 'A', apellidos: 'B', email: 'a@duoc.cl' }
    const direccion = { calle: 'x', region: 'RM', comuna: 'Maipú' }

    it('createOrder genera número y código de orden', () => {
      const order = createOrder({ cliente, direccion, items: [], total: 0, estado: 'pagada' })
      expect(order.codigo).toBe('ORDER00001')
      expect(order.numero).toMatch(/^\d{8}01$/)
    })

    it('findStockProblems detecta ítems sin stock suficiente', () => {
      const problems = findStockProblems([{ id: 14, cantidad: 3 }], getProducts()) // Gran Turismo 7: stock 2
      expect(problems.length).toBe(1)
    })

    it('pago aprobado: orden pagada y descuenta stock', () => {
      const before = getProduct(1).stock
      const items = [{ id: 1, nombre: 'Zelda', precio: 39990, cantidad: 2 }]
      const order = processPayment({ cliente, direccion, items })
      expect(order.estado).toBe('pagada')
      expect(order.total).toBe(79980)
      expect(getProduct(1).stock).toBe(before - 2)
    })

    it('pago rechazado: orden rechazada con motivo y sin descontar stock', () => {
      const items = [{ id: 14, nombre: 'Gran Turismo 7', precio: 39990, cantidad: 3 }]
      const order = processPayment({ cliente, direccion, items })
      expect(order.estado).toBe('rechazada')
      expect(order.motivo).toContain('Gran Turismo 7')
      expect(getProduct(14).stock).toBe(2)
    })
  })
})