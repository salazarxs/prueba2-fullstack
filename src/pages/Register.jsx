import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserForm from '../components/form/UserForm.jsx'
import { isEmailTaken } from '../data/users.js'
import { useAuth } from '../hooks/useAuth.js'

function Register() {
  const { register } = useAuth()
  const [createdUser, setCreatedUser] = useState(null)

  return (
    <>
      <title>Registro | GameStore</title>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h1 className="h2 text-center mb-4">Registro de usuario</h1>
            {createdUser ? (
              <div className="alert alert-success text-center">
                <p className="fs-5">¡Bienvenido/a, {createdUser.nombre}! Tu cuenta fue creada y ya iniciaste sesión.</p>
                <Link to="/productos" className="btn btn-success">Ir a comprar</Link>
              </div>
            ) : (
              <>
                <UserForm
                  isEmailTaken={(email) => isEmailTaken(email)}
                  onSubmit={(data) => setCreatedUser(register(data))}
                  submitLabel="Crear cuenta"
                />
                <p className="mt-3"><Link to="/login" className="small">¿Ya tienes una cuenta? ¡Haz clic aquí!</Link></p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
