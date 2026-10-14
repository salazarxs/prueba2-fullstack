import { getCategories } from '../../data/categories.js'
import { useForm } from '../../hooks/useForm.js'
import { validateProduct } from '../../utils/validators.js'
import FormField from './FormField.jsx'

const toFormValues = (product = {}) => ({
  nombre: product.nombre ?? '',
  descripcion: product.descripcion ?? '',
  precio: product.precio ?? '',
  precioOferta: product.precioOferta ?? '',
  stock: product.stock ?? '',
  stockCritico: product.stockCritico ?? '',
  categoriaId: product.categoriaId ?? '',
  imagen: product.imagen ?? '',
})

// Convierte los strings del formulario en el formato guardado en la base de datos
const toProduct = (values) => ({
  nombre: values.nombre.trim(),
  descripcion: values.descripcion.trim(),
  precio: Number(values.precio),
  precioOferta: values.precioOferta === '' ? null : Number(values.precioOferta),
  stock: Number(values.stock),
  stockCritico: values.stockCritico === '' ? 0 : Number(values.stockCritico),
  categoriaId: Number(values.categoriaId),
  imagen: values.imagen.trim() || `https://placehold.co/400x300/webp?text=${encodeURIComponent(values.nombre.trim())}`,
})

function ProductForm({ initialProduct, onSubmit, submitLabel = 'Guardar' }) {
  const { values, errors, handleChange, handleSubmit } = useForm(toFormValues(initialProduct), validateProduct)
  const categoryOptions = getCategories().map(category => ({ value: category.id, label: category.nombre }))

  const field = (name) => ({ name, value: values[name], onChange: handleChange, error: errors[name] })

  return (
    <form className="row" onSubmit={handleSubmit(data => onSubmit(toProduct(data)))} noValidate>
      <FormField label="Nombre" required className="col-12 col-md-8" {...field('nombre')} />
      <FormField as="select" label="Categoría" required className="col-12 col-md-4" options={categoryOptions} {...field('categoriaId')} />
      <FormField as="textarea" label="Descripción" {...field('descripcion')} />
      <FormField label="Precio" type="number" min="0" required className="col-6 col-md-3" {...field('precio')} />
      <FormField label="Precio oferta" type="number" min="0" className="col-6 col-md-3" placeholder="Sin oferta" {...field('precioOferta')} />
      <FormField label="Stock" type="number" min="0" required className="col-6 col-md-3" {...field('stock')} />
      <FormField label="Stock crítico" type="number" min="0" className="col-6 col-md-3" {...field('stockCritico')} />
      <FormField label="URL imagen (opcional)" type="url" placeholder="Se genera una si se deja vacío" {...field('imagen')} />
      <div className="col-12">
        <button type="submit" className="btn btn-success">{submitLabel}</button>
      </div>
    </form>
  )
}

export default ProductForm
