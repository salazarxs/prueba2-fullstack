// Validaciones puras. Cada validateX devuelve un objeto { campo: mensaje } (vacío si es válido).

export const isBlank = (value) => String(value ?? '').trim() === ''

export const emailValido = (email = '') => /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email.trim())

export const emailFormatoValido = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

export const passwordValida = (password = '') => password.length >= 4 && password.length <= 10

export const telefonoValido = (telefono = '') => /^\+?\d{8,12}$/.test(telefono.replace(/\s/g, ''))

const isNonNegativeInt = (value) => /^\d+$/.test(String(value).trim())

const maxLength = (errors, field, value, max) => {
  if (!errors[field] && String(value ?? '').length > max) errors[field] = `Máximo ${max} caracteres`
}

const requireFields = (errors, values, fields) => {
  fields.forEach(field => {
    if (isBlank(values[field])) errors[field] = 'Campo obligatorio'
  })
}

const MENSAJE_DOMINIO = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com'

// options.requirePassword: false al editar (contraseña vacía = no cambiar)
// options.isEmailTaken: predicado inyectado para no acoplar el validador a los datos
export const validateUser = (values, { requirePassword = true, isEmailTaken = () => false, withRol = false } = {}) => {
  const errors = {}
  const required = ['nombre', 'apellidos', 'email', 'region', 'comuna', 'calle']
  if (withRol) required.push('rol')
  requireFields(errors, values, required)

  if (!errors.email && !emailValido(values.email)) errors.email = MENSAJE_DOMINIO
  if (!errors.email && isEmailTaken(values.email)) errors.email = 'El correo ya está registrado'

  const changingPassword = requirePassword || !isBlank(values.password)
  if (changingPassword) {
    if (isBlank(values.password)) errors.password = 'Campo obligatorio'
    else if (!passwordValida(values.password)) errors.password = 'Debe tener entre 4 y 10 caracteres'
    if (values.password !== values.repeatPassword) errors.repeatPassword = 'Las contraseñas no coinciden'
  }

  if (!isBlank(values.telefono) && !telefonoValido(values.telefono)) errors.telefono = 'Teléfono inválido (ej: +56912345678)'
  if (withRol && !errors.rol && !['admin', 'cliente'].includes(values.rol)) errors.rol = 'Rol inválido'

  maxLength(errors, 'nombre', values.nombre, 50)
  maxLength(errors, 'apellidos', values.apellidos, 100)
  maxLength(errors, 'email', values.email, 100)
  maxLength(errors, 'calle', values.calle, 300)
  return errors
}

export const validateLogin = (values) => {
  const errors = {}
  requireFields(errors, values, ['email', 'password'])
  if (!errors.email && !emailValido(values.email)) errors.email = MENSAJE_DOMINIO
  return errors
}

export const validateProduct = (values) => {
  const errors = {}
  requireFields(errors, values, ['nombre', 'precio', 'stock', 'categoriaId'])

  if (!errors.precio && !isNonNegativeInt(values.precio)) errors.precio = 'Debe ser un número entero mayor o igual a 0'
  if (!isBlank(values.precioOferta)) {
    if (!isNonNegativeInt(values.precioOferta)) errors.precioOferta = 'Debe ser un número entero mayor o igual a 0'
    else if (!errors.precio && Number(values.precioOferta) >= Number(values.precio)) {
      errors.precioOferta = 'Debe ser menor al precio normal'
    }
  }
  if (!errors.stock && !isNonNegativeInt(values.stock)) errors.stock = 'Debe ser un número entero mayor o igual a 0'
  if (!isBlank(values.stockCritico) && !isNonNegativeInt(values.stockCritico)) {
    errors.stockCritico = 'Debe ser un número entero mayor o igual a 0'
  }

  maxLength(errors, 'nombre', values.nombre, 100)
  maxLength(errors, 'descripcion', values.descripcion, 500)
  return errors
}

export const validateCategory = (values, { isNameTaken = () => false } = {}) => {
  const errors = {}
  requireFields(errors, values, ['nombre'])
  if (!errors.nombre && isNameTaken(values.nombre)) errors.nombre = 'Ya existe una categoría con ese nombre'
  maxLength(errors, 'nombre', values.nombre, 50)
  maxLength(errors, 'descripcion', values.descripcion, 200)
  return errors
}

export const validateCheckout = (values) => {
  const errors = {}
  requireFields(errors, values, ['nombre', 'apellidos', 'email', 'calle', 'region', 'comuna'])
  if (!errors.email && !emailFormatoValido(values.email)) errors.email = 'Correo inválido'
  maxLength(errors, 'nombre', values.nombre, 50)
  maxLength(errors, 'apellidos', values.apellidos, 100)
  maxLength(errors, 'calle', values.calle, 300)
  maxLength(errors, 'indicaciones', values.indicaciones, 300)
  return errors
}

export const validateContact = (values) => {
  const errors = {}
  requireFields(errors, values, ['nombre', 'email', 'mensaje'])
  if (!errors.email && !emailValido(values.email)) errors.email = MENSAJE_DOMINIO
  maxLength(errors, 'nombre', values.nombre, 100)
  maxLength(errors, 'mensaje', values.mensaje, 500)
  return errors
}
