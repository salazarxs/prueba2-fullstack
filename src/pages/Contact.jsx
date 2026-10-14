import AlertMessage from '../components/AlertMessage.jsx'
import FormField from '../components/form/FormField.jsx'
import { useForm } from '../hooks/useForm.js'
import { useTimedAlert } from '../hooks/useTimedAlert.js'
import { validateContact } from '../utils/validators.js'

const emptyContact = { nombre: '', email: '', mensaje: '' }

function Contact() {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(emptyContact, validateContact)
  const [alertVisible, showAlert] = useTimedAlert()

  const send = () => {
    reset()
    showAlert()
  }

  return (
    <>
      <title>Contacto | GameStore</title>
      {alertVisible && <AlertMessage message="¡Gracias! Responderemos tu mensaje a la brevedad." />}
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-6">
            <h1 className="h2">Contacto</h1>
            <p className="text-muted">¿Tienes dudas sobre un pedido? Escríbenos.</p>
            <form className="row" onSubmit={handleSubmit(send)} noValidate>
              <FormField label="Nombre completo" name="nombre" required value={values.nombre} onChange={handleChange} error={errors.nombre} />
              <FormField label="Correo" name="email" type="email" required placeholder="nombre@duoc.cl" value={values.email} onChange={handleChange} error={errors.email} />
              <FormField
                as="textarea" label="Comentario" name="mensaje" required rows={5} maxLength={500}
                value={values.mensaje} onChange={handleChange} error={errors.mensaje}
              />
              <div className="col-12 d-flex justify-content-between align-items-center">
                <small className="text-muted">{values.mensaje.length}/500</small>
                <button type="submit" className="btn btn-primary">Enviar mensaje</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
