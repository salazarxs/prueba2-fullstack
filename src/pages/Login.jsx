import { Link, useNavigate } from 'react-router-dom'
import { emailValido, getUserList } from '../utils/users.js'

function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = Object.fromEntries(new FormData(e.currentTarget))
    if (!emailValido(user.email)) {
      alert('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com')
      return
    }
    const userExist = getUserList().find(currentUser => currentUser.email === user.email)
    if (!userExist || userExist.password !== user.password) {
      alert('Credenciales invalidas.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <>
      <title>Iniciar sesión | Ecommerce</title>
      <h1 className="text-center pt-4">Inicio de sesión</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form className="row gap-3" id="form-register" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="jane@doe.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="******" />
            </div>
            <div>
              <Link to="/registro" className="fs-7">No tienes una cuanta aun? Haz clic aqui!</Link>
            </div>
            <div>
              <button type="submit" className="btn btn-success">Iniciar sesión</button>
            </div>
          </form>

        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}

export default Login
