import { useForm } from '../../hooks/useForm.js'
import { validateCategory } from '../../utils/validators.js'
import FormField from './FormField.jsx'

function CategoryForm({ initialCategory, isNameTaken, onSubmit, submitLabel = 'Guardar' }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { nombre: initialCategory?.nombre ?? '', descripcion: initialCategory?.descripcion ?? '' },
    (current) => validateCategory(current, { isNameTaken }),
  )

  const submit = (data) => onSubmit({
    nombre: data.nombre.trim(),
    descripcion: data.descripcion.trim(),
    imagen: initialCategory?.imagen ?? `https://placehold.co/400x200/webp?text=${encodeURIComponent(data.nombre.trim())}`,
  })

  return (
    <form className="row" onSubmit={handleSubmit(submit)} noValidate>
      <FormField label="Nombre" name="nombre" required value={values.nombre} onChange={handleChange} error={errors.nombre} />
      <FormField as="textarea" label="Descripción" name="descripcion" value={values.descripcion} onChange={handleChange} error={errors.descripcion} />
      <div className="col-12">
        <button type="submit" className="btn btn-success">{submitLabel}</button>
      </div>
    </form>
  )
}

export default CategoryForm
