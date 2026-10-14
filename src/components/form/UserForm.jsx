import { useForm } from '../../hooks/useForm.js'
import { validateUser } from '../../utils/validators.js'
import FormField from './FormField.jsx'
import RegionComunaFields from './RegionComunaFields.jsx'

const emptyUser = {
  nombre: '', apellidos: '', email: '', password: '', repeatPassword: '',
  telefono: '', region: '', comuna: '', calle: '', depto: '', rol: 'cliente',
}

const rolOptions = [
  { value: 'cliente', label: 'Cliente' },
  { value: 'admin', label: 'Administrador' },
]

// Formulario de usuario reutilizado en Registro, admin (nuevo/editar) y Perfil.
// - initialUser: datos a editar (la contraseña nunca se precarga)
// - isEdit: la contraseña pasa a ser opcional
// - withRol: muestra el selector de rol (solo admin)
// - isEmailTaken: predicado para validar correo duplicado
// - onSubmit(values): recibe los datos ya validados
function UserForm({ initialUser, isEdit = false, withRol = false, isEmailTaken, onSubmit, submitLabel = 'Guardar', resetOnSubmit = false }) {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { ...emptyUser, ...initialUser, password: '', repeatPassword: '' },
    (current) => validateUser(current, { requirePassword: !isEdit, isEmailTaken, withRol }),
  )

  const submit = (data) => {
    const user = { ...data }
    delete user.repeatPassword
    if (isEdit && user.password === '') delete user.password
    onSubmit(user)
    if (resetOnSubmit) reset()
  }

  const field = (name) => ({ name, value: values[name], onChange: handleChange, error: errors[name] })

  return (
    <form className="row" onSubmit={handleSubmit(submit)} noValidate>
      <FormField label="Nombre" required className="col-12 col-md-6" placeholder="Juana" {...field('nombre')} />
      <FormField label="Apellidos" required className="col-12 col-md-6" placeholder="Pérez Soto" {...field('apellidos')} />
      <FormField label="Correo" type="email" required className="col-12 col-md-6" placeholder="juana@duoc.cl" {...field('email')} />
      <FormField label="Teléfono (opcional)" type="tel" className="col-12 col-md-6" placeholder="+56912345678" {...field('telefono')} />
      <FormField
        label={isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'} type="password" required={!isEdit}
        className="col-12 col-md-6" placeholder="4 a 10 caracteres" autoComplete="new-password" {...field('password')}
      />
      <FormField
        label="Confirmar contraseña" type="password" required={!isEdit}
        className="col-12 col-md-6" autoComplete="new-password" {...field('repeatPassword')}
      />
      <RegionComunaFields values={values} errors={errors} onChange={handleChange} />
      <FormField label="Calle y número" required className="col-12 col-md-8" placeholder="Av. España 8" {...field('calle')} />
      <FormField label="Departamento (opcional)" className="col-12 col-md-4" placeholder="Ej.: 603" {...field('depto')} />
      {withRol && <FormField as="select" label="Rol" required options={rolOptions} {...field('rol')} />}
      <div className="col-12">
        <button type="submit" className="btn btn-success">{submitLabel}</button>
      </div>
    </form>
  )
}

export default UserForm
