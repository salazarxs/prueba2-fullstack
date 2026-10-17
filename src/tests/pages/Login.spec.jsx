import { fireEvent, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login.jsx'
import { LocationDisplay, renderWithProviders, resetDb } from '../helpers.jsx'

const renderLogin = () =>
  renderWithProviders(
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<p>Página de inicio</p>} />
        <Route path="/admin" element={<p>Panel admin</p>} />
      </Routes>
      <LocationDisplay />
    </>,
    { route: '/login' },
  )

const fill = (email, password) => {
  fireEvent.change(screen.getByLabelText('Correo'), { target: { name: 'email', value: email } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { name: 'password', value: password } })
  fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
}

describe('Login (página con formulario, contexto y navegación)', () => {
  beforeEach(resetDb)

  it('muestra errores si se envía vacío', () => {
    renderLogin()
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(screen.getAllByText('Campo obligatorio').length).toBe(2)
  })

  it('muestra error con credenciales incorrectas y no navega', () => {
    renderLogin()
    fill('admin@duoc.cl', 'mala')
    expect(screen.getByText('Correo o contraseña incorrectos')).toBeTruthy()
    expect(screen.getByTestId('location').textContent).toBe('/login')
  })

  it('un cliente inicia sesión y va al inicio', () => {
    renderLogin()
    fill('juana@gmail.com', 'cliente1')
    expect(screen.getByText('Página de inicio')).toBeTruthy()
  })

  it('un administrador inicia sesión y va al panel', () => {
    renderLogin()
    fill('admin@duoc.cl', 'admin123')
    expect(screen.getByText('Panel admin')).toBeTruthy()
  })
})