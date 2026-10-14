import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormField from '../components/form/FormField.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useForm } from '../hooks/useForm.js'
import { validateLogin } from '../utils/validators.js'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({ email: '', password: '' }, validateLogin)

  const submit = (data) => {
    const user = login(data.email, data.password)
    if (!user) {
      setErrors({ password: 'Correo o contraseña incorrectos' })
      return
    }
    // El admin vuelve a la ruta protegida que intentó abrir (o al dashboard)
    navigate(user.rol === 'admin' ? (location.state?.from ?? '/admin') : '/')
  }

  return (
    <>
      <title>Iniciar sesión | GameStore</title>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <h1 className="h2 text-center mb-4">Inicio de sesión</h1>
            {location.state?.from && <div className="alert alert-info">Inicia sesión como administrador para continuar.</div>}
            <form className="row" onSubmit={handleSubmit(submit)} noValidate>
              <FormField label="Correo" name="email" type="email" placeholder="nombre@duoc.cl" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
              <FormField label="Contraseña" name="password" type="password" placeholder="******" autoComplete="current-password" value={values.password} onChange={handleChange} error={errors.password} />
              <div className="col-12 mb-3">
                <Link to="/registro" className="small">¿No tienes una cuenta aún? ¡Haz clic aquí!</Link>
              </div>
              <div className="col-12 d-grid">
                <button type="submit" className="btn btn-success">Iniciar sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
