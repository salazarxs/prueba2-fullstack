// Secciones del panel admin: alimentan el menú lateral y las tarjetas del dashboard
export const adminRoutes = [
  { label: 'Dashboard', path: '/admin', icon: 'bi-speedometer2', end: true, description: 'Visión general de todas las métricas y estadísticas clave del sistema.' },
  { label: 'Órdenes', path: '/admin/ordenes', icon: 'bi-receipt', description: 'Gestión y seguimiento de todas las órdenes de compra realizadas.' },
  { label: 'Productos', path: '/admin/productos', icon: 'bi-box-seam', description: 'Administrar inventario y detalles de los productos disponibles.' },
  { label: 'Categorías', path: '/admin/categorias', icon: 'bi-tags', description: 'Organizar productos en categorías para facilitar su navegación.' },
  { label: 'Usuarios', path: '/admin/usuarios', icon: 'bi-people', description: 'Gestión de cuentas de usuario y sus roles dentro del sistema.' },
  { label: 'Reportes', path: '/admin/reportes', icon: 'bi-bar-chart', description: 'Generación de informes detallados sobre las operaciones del sistema.' },
  { label: 'Perfil', path: '/admin/perfil', icon: 'bi-person-gear', description: 'Administración de la información personal y configuraciones de cuenta.' },
]
