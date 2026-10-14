import { Link } from 'react-router-dom'
import LocationOptions from '../components/LocationOptions.jsx'
import { saveUser, validateNewUser } from '../utils/users.js'

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const newUser = Object.fromEntries(new FormData(form))
    const error = validateNewUser(newUser)
    if (error) {
      alert(error)
      return
    }
    saveUser(newUser)
    form.reset()
  }

  return (
    <>
      <title>Registro | Ecommerce</title>
      <h1 className="text-center pt-4">Registro de usuario</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form className="row gap-3" id="form-register" onSubmit={handleSubmit}>
            <div className="mb-3 col-auto">
              <label htmlFor="name" className="form-label">Nombre completo</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Jane Doe" />
            </div>
            <div className="mb-3 col-auto">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="jane@doe.com" />
            </div>
            <div className="mb-3 col-auto">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="******" />
            </div>
            <div className="mb-3 col-auto">
              <label htmlFor="repeat-password" className="form-label">Confirmar contraseña</label>
              <input type="password" className="form-control" id="repeat-password" name="repeatPassword"
                placeholder="******" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Telefono (opcional)</label>
              <input type="tel" className="form-control" id="phone" name="phone" placeholder="jane+569xxxxxxxx" />
            </div>
            <div className="col-auto"><label htmlFor="region" className="form-label">Región</label>
              <input className="form-control" list="regionOptions" id="region" placeholder="Región..."
                name="region" />
              <LocationOptions id="regionOptions" />
            </div>
            <div className="col-auto"><label htmlFor="comuna" className="form-label">Comuna</label>
              <input className="form-control" list="comunaOptions" id="comuna" placeholder="Comuna..."
                name="comuna" />
              <LocationOptions id="comunaOptions" />
            </div>
            <div>
              <Link to="/login" className="fs-7">Ya tienes una cuanta aun? Haz clic aqui!</Link>
            </div>
            <div>
              <button type="submit" className="btn btn-success">Crear usuario</button>
            </div>
          </form>

        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}

export default Register
