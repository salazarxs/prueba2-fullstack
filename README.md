# GameStore — Tienda online de videojuegos (React)

Proyecto DSY1104 Desarrollo Fullstack II (Duoc UC), Evaluación Parcial 2: migración de la tienda HTML/JS/Bootstrap a **React 19 + Vite**, con persistencia simulada en `localStorage`, diseño responsivo con **Bootstrap 5.3** y panel de administración.

## Stack

- React 19 (React Compiler activado) + Vite 8
- React Router 7
- Bootstrap 5.3 + Bootstrap Icons (npm)
- ESLint (reglas de React Hooks y React Refresh)

## Cómo ejecutar

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build
npm run lint
```

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin123` |
| Cliente | `juana@gmail.com` | `cliente1` |

Solo se aceptan correos `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com` en login, registro y contacto.

## Funcionalidades

### Tienda (pública)

| Ruta | Vista |
|---|---|
| `/` | Home: carrusel, categorías, ofertas y destacados |
| `/productos` | Catálogo con búsqueda, filtro por categoría y orden por precio (`?q=&categoria=&orden=`) |
| `/producto/:id` | Detalle con stock, cantidad y productos relacionados |
| `/categorias`, `/categorias/:id` | Categorías y productos por categoría |
| `/ofertas` | Productos con descuento |
| `/nosotros`, `/contacto` | Información y formulario de contacto validado |
| `/blog`, `/blog/:id` | Blog y detalle de cada entrada |
| `/carrito` | Carrito: cantidad (+/−), subtotal, eliminar, limpiar, comprar |
| `/checkout` | Datos del cliente y dirección de entrega (se autocompleta si hay sesión) |
| `/compra/exito/:id` | Compra exitosa: boleta, imprimir y enviar por correo (simulado) |
| `/compra/error/:id` | Pago rechazado, con opción de reintentar |
| `/login`, `/registro` | Inicio de sesión y registro de usuarios |

**Simulación de pago:** el pago se rechaza si algún producto del carrito no tiene stock suficiente al momento de pagar (p. ej. agregar 3 unidades de *Gran Turismo 7*, que tiene stock 2). Si se aprueba, se descuenta el stock y se vacía el carrito.

### Panel de administración (`/admin`, requiere rol admin)

Dashboard con métricas · Órdenes y boleta · Productos (listar, crear, ver, editar, eliminar, críticos) · Categorías (CRUD) · Usuarios (CRUD, historial de compras) · Reportes de ventas · Perfil.

## Estructura

```
src/
  data/         Fuente de datos simulada (db.js) y CRUD por entidad sobre localStorage
  context/      CartContext / AuthContext y sus providers
  hooks/        useCart, useAuth, useForm, useAddToCart, useTimedAlert
  utils/        Lógica pura: carrito, formato CLP, validaciones, reportes
  components/   Componentes reutilizables (tarjetas, tablas, formularios, navbar)
  layouts/      PublicLayout (navbar + footer) y AdminLayout (sidebar)
  pages/        Una página por ruta; pages/admin/* para el panel
```

## Pruebas unitarias (Jasmine + Karma)

Se usan **Jasmine** (pruebas), **Karma** (ejecución en el navegador), **webpack + Babel** (para JSX) y **React Testing Library** (renderizar componentes y simular eventos). Requiere tener **Firefox** instalado.

```bash
npm test             # ejecuta todas las pruebas una vez y genera cobertura
npm run test:watch   # modo observador (re-ejecuta al guardar)
```

El reporte de cobertura queda en `coverage/index.html`. Incluye todos los archivos de `src/`, también los que aún no tienen pruebas.

```
src/tests/
  components/   Renderizado, props y eventos de componentes
  hooks/        Estado: useForm y CartProvider
  pages/        Login: formulario, contexto y navegación
  utils/        Lógica pura: carrito, formato, validadores, reportes
  data/         CRUD sobre localStorage, filtros y simulación de pago
```
