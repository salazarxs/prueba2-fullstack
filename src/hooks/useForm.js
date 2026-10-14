import { useState } from 'react'

// Formulario controlado: guarda valores y errores en el estado del componente.
// `validate(values)` devuelve { campo: mensaje }; onValid solo se llama si no hay errores.
export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (onValid) => (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) onValid(values)
  }

  const reset = (next = initialValues) => {
    setValues(next)
    setErrors({})
  }

  return { values, errors, handleChange, handleSubmit, setValues, setErrors, reset }
}
