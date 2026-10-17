import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'
import FormField from '../../components/form/FormField.jsx'
import { useForm } from '../../hooks/useForm.js'
import { validateContact } from '../../utils/validators.js'

describe('useForm (gestión del estado)', () => {
  const validate = (values) => (values.nombre ? {} : { nombre: 'Campo obligatorio' })

  it('parte con los valores iniciales y sin errores', () => {
    const { result } = renderHook(() => useForm({ nombre: '' }, validate))
    expect(result.current.values).toEqual({ nombre: '' })
    expect(result.current.errors).toEqual({})
  })

  it('actualiza el estado al cambiar un campo', () => {
    const { result } = renderHook(() => useForm({ nombre: '' }, validate))
    act(() => result.current.handleChange({ target: { name: 'nombre', value: 'Ana' } }))
    expect(result.current.values.nombre).toBe('Ana')
  })

  it('no llama a onValid y expone errores si la validación falla', () => {
    const onValid = jasmine.createSpy('onValid')
    const { result } = renderHook(() => useForm({ nombre: '' }, validate))

    act(() => result.current.handleSubmit(onValid)({ preventDefault() {} }))

    expect(onValid).not.toHaveBeenCalled()
    expect(result.current.errors.nombre).toBe('Campo obligatorio')
  })

  it('llama a onValid con los valores si la validación pasa', () => {
    const onValid = jasmine.createSpy('onValid')
    const { result } = renderHook(() => useForm({ nombre: 'Ana' }, validate))

    act(() => result.current.handleSubmit(onValid)({ preventDefault() {} }))

    expect(onValid).toHaveBeenCalledWith({ nombre: 'Ana' })
  })

  it('limpia el error de un campo cuando el usuario lo corrige', () => {
    const { result } = renderHook(() => useForm({ nombre: '' }, validate))
    act(() => result.current.handleSubmit(() => {})({ preventDefault() {} }))
    expect(result.current.errors.nombre).toBeDefined()

    act(() => result.current.handleChange({ target: { name: 'nombre', value: 'A' } }))
    expect(result.current.errors.nombre).toBeUndefined()
  })

  it('reset vuelve a los valores iniciales', () => {
    const { result } = renderHook(() => useForm({ nombre: '' }, validate))
    act(() => result.current.handleChange({ target: { name: 'nombre', value: 'Ana' } }))
    act(() => result.current.reset())
    expect(result.current.values.nombre).toBe('')
  })
})

// Prueba del estado de un formulario real: el usuario escribe y el input refleja el cambio
function ContactoMini() {
  const { values, errors, handleChange, handleSubmit } = useForm({ nombre: '', email: '', mensaje: '' }, validateContact)
  return (
    <form onSubmit={handleSubmit(() => {})} noValidate>
      <FormField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} error={errors.nombre} />
      <FormField label="Correo" name="email" value={values.email} onChange={handleChange} error={errors.email} />
      <button type="submit">Enviar</button>
    </form>
  )
}

describe('Formulario controlado (estado + eventos)', () => {
  it('el estado cambia cuando el usuario introduce texto', () => {
    render(<ContactoMini />)
    const nombre = screen.getByLabelText('Nombre')
    fireEvent.change(nombre, { target: { name: 'nombre', value: 'Juana' } })
    expect(nombre.value).toBe('Juana')
  })

  it('al enviar vacío muestra los errores de validación', () => {
    render(<ContactoMini />)
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getAllByText('Campo obligatorio').length).toBeGreaterThan(0)
  })

  it('rechaza correos de dominios no permitidos', () => {
    render(<ContactoMini />)
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { name: 'nombre', value: 'Juana' } })
    fireEvent.change(screen.getByLabelText('Correo'), { target: { name: 'email', value: 'juana@hotmail.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByText(/@duoc\.cl/)).toBeTruthy()
  })
})