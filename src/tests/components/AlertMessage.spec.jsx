import { render, screen } from '@testing-library/react'
import AlertMessage from '../../components/AlertMessage.jsx'

describe('AlertMessage', () => {
    it('muestra el mensaje recibido por props', () => {
        render(<AlertMessage message="producto agregado" />)
        expect(screen.getByRole('alert').textContent).toBe('producto agregado')
    })

    it('usa la variante success por defecto', () => {
        render(<AlertMessage message="listo" />)
        expect(screen.getByRole('alert').classList.contains('alert-success')).toBeTrue()
    })

    it('aplica la variante recibida por props', () => {
        render(<AlertMessage message="error" variant="danger" />)
        const alert = screen.getByRole('alert')
        expect(alert.classList.contains('alert-danger')).toBeTrue()
        expect(alert.classList.contains('alert-success')).toBeFalse()
    })
})