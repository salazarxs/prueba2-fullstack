// Campo de formulario Bootstrap con mensaje de error controlado por props.
// `as`: 'input' | 'select' | 'textarea'. `options`: [{ value, label }] para select.
function FormField({
  label, name, value, onChange, error, as = 'input', type = 'text', options = [],
  placeholder, required = false, className = 'col-12', id = `field-${name}`, ...rest
}) {
  const controlClass = `${as === 'select' ? 'form-select' : 'form-control'}${error ? ' is-invalid' : ''}`
  const shared = { id, name, value: value ?? '', onChange, className: controlClass, 'aria-invalid': Boolean(error), ...rest }

  let control
  if (as === 'select') {
    control = (
      <select {...shared}>
        <option value="">{placeholder ?? 'Seleccione...'}</option>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    )
  } else if (as === 'textarea') {
    control = <textarea {...shared} placeholder={placeholder} rows={rest.rows ?? 3} />
  } else {
    control = <input {...shared} type={type} placeholder={placeholder} />
  }

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}{required && <span className="text-danger"> *</span>}
      </label>
      {control}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default FormField
