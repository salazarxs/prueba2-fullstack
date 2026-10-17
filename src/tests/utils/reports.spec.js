import { paidOrders, salesByCategory, salesSummary, topProducts } from '../../utils/reports.js'

const orders = [
  { estado: 'pagada', total: 3000, items: [{ id: 1, nombre: 'A', precio: 1000, cantidad: 3 }] },
  { estado: 'pagada', total: 2000, items: [{ id: 2, nombre: 'B', precio: 2000, cantidad: 1 }] },
  { estado: 'rechazada', total: 9999, items: [{ id: 1, nombre: 'A', precio: 1000, cantidad: 9 }] },
]

describe('utils/reports', () => {
  it('paidOrders filtra solo las órdenes pagadas', () => {
    expect(paidOrders(orders).length).toBe(2)
  })

  it('salesSummary calcula totales, rechazos y ticket promedio', () => {
    expect(salesSummary(orders)).toEqual({ pagadas: 2, rechazadas: 1, totalVendido: 5000, ticketPromedio: 2500 })
  })

  it('salesSummary sin órdenes devuelve ceros (sin dividir por 0)', () => {
    expect(salesSummary([])).toEqual({ pagadas: 0, rechazadas: 0, totalVendido: 0, ticketPromedio: 0 })
  })

  it('topProducts ordena por unidades vendidas e ignora órdenes rechazadas', () => {
    const top = topProducts(orders)
    expect(top[0]).toEqual({ id: 1, nombre: 'A', unidades: 3, total: 3000 })
    expect(top.length).toBe(2)
  })

  it('salesByCategory agrupa las ventas por categoría, de mayor a menor', () => {
    const products = [{ id: 1, categoriaId: 10 }, { id: 2, categoriaId: 20 }]
    const categories = [{ id: 10, nombre: 'Uno' }, { id: 20, nombre: 'Dos' }]
    const result = salesByCategory(orders, products, categories)
    expect(result.map(category => category.nombre)).toEqual(['Uno', 'Dos'])
    expect(result[0].total).toBe(3000)
  })
})