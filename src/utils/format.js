const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

export const formatCLP = (value) => clp.format(value)

export const formatDate = (iso) => new Date(iso).toLocaleDateString('es-CL')

export const isOnSale = (product) =>
  product.precioOferta !== null && product.precioOferta !== undefined && product.precioOferta < product.precio

export const getPrecioFinal = (product) => (isOnSale(product) ? product.precioOferta : product.precio)

export const discountPercent = (product) =>
  isOnSale(product) ? Math.round((1 - product.precioOferta / product.precio) * 100) : 0
