import { render, screen } from '@testing-library/react'
import FormField from '../../components/form/FormField.jsx'

describe('FormField (renderizado condicional)', () => {
    it('no muestra mensaje de error si no recibe ~error~', () => {
        render(<FormField label="Correo" name="email" value="" onChange={() => {}} />)

        expect(document.querySelector('.invalid-feedback')).toBeNull()
    })

    it('muestra el error y marca el campo como invalido cuando recibe ~error~', () => {
        render(<FormField label="Correo" name="email" value="" onChange={() => {}} error="campo obligatorio" />)

        expect(screen.getByText('campo obligatorio')).toBeTruthy()

        const input = screen.getByLabelText('Correo')
        expect(input.classList.contains('is-invalid')).toBeTrue()
    })

    it('no muestra el asterisco si el campo no es obligatorio', () => {
        render(<FormField label="Nombre" name="nombre" value="" onChange={() => {}} />)

        expect(screen.queryByText('*')).toBeNull()
    })

    it('muestra el asterisco cuando el campo es obligatorio', () => {
        render(<FormField label="Nombre" name="nombre" value="" onChange={() => {}} required />)

        expect(screen.getByText('*')).toBeTruthy()
    })
})