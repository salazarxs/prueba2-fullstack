// Cálculos puros para el dashboard y la vista de reportes

export const paidOrders = (orders) => orders.filter(order => order.estado === 'pagada')

export const salesSummary = (orders) => {
  const paid = paidOrders(orders)
  const totalVendido = paid.reduce((sum, order) => sum + order.total, 0)
  return {
    pagadas: paid.length,
    rechazadas: orders.length - paid.length,
    totalVendido,
    ticketPromedio: paid.length ? Math.round(totalVendido / paid.length) : 0,
  }
}

export const salesByCategory = (orders, products, categories) => {
  const categoryOf = Object.fromEntries(products.map(product => [product.id, product.categoriaId]))
  const totals = Object.fromEntries(categories.map(category => [category.id, 0]))
  paidOrders(orders).forEach(order => {
    order.items.forEach(item => {
      const categoriaId = categoryOf[item.id]
      if (categoriaId in totals) totals[categoriaId] += item.precio * item.cantidad
    })
  })
  return categories
    .map(category => ({ id: category.id, nombre: category.nombre, total: totals[category.id] }))
    .toSorted((a, b) => b.total - a.total)
}

export const topProducts = (orders, limit = 5) => {
  const byProduct = {}
  paidOrders(orders).forEach(order => {
    order.items.forEach(item => {
      byProduct[item.id] ??= { id: item.id, nombre: item.nombre, unidades: 0, total: 0 }
      byProduct[item.id].unidades += item.cantidad
      byProduct[item.id].total += item.precio * item.cantidad
    })
  })
  return Object.values(byProduct).toSorted((a, b) => b.unidades - a.unidades).slice(0, limit)
}
