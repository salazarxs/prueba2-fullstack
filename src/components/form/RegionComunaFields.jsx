import { regiones } from '../../data/db.js'
import FormField from './FormField.jsx'

const regionOptions = regiones.map(region => ({ value: region.nombre, label: region.nombre }))

// Selects dependientes: al cambiar la región se limpia la comuna y se cargan sus comunas
function RegionComunaFields({ values, errors, onChange, disabled = false }) {
  const comunas = regiones.find(region => region.nombre === values.region)?.comunas ?? []

  const handleRegionChange = (e) => {
    onChange(e)
    onChange({ target: { name: 'comuna', value: '' } })
  }

  return (
    <>
      <FormField
        as="select" label="Región" name="region" required className="col-12 col-md-6" disabled={disabled}
        value={values.region} onChange={handleRegionChange} error={errors.region}
        options={regionOptions} placeholder="Seleccione una región"
      />
      <FormField
        as="select" label="Comuna" name="comuna" required className="col-12 col-md-6"
        disabled={disabled || comunas.length === 0}
        value={values.comuna} onChange={onChange} error={errors.comuna}
        options={comunas.map(comuna => ({ value: comuna, label: comuna }))} placeholder="Seleccione una comuna"
      />
    </>
  )
}

export default RegionComunaFields
