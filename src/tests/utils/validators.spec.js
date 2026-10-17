import {
    emailFormatoValido, emailValido, passwordValida, telefonoValido,
    validateCategory, validateCheckout, validateContact, validateLogin, validateProduct, validateUser,
} from '../../utils/validators.js'

describe('utils/validators', () => {
    describe('validadores simples', () => {
        it('emailValido acepta solo dominios permitidos', () => {
            expect(emailValido('a@duoc.cl')).toBeTrue()
            expect(emailValido('a@profesor.duoc.cl')).toBeTrue()
            expect(emailValido('a@gmail.com')).toBeTrue()
            expect(emailValido('a@hotmail.com')).toBeFalse()
        })

        it('emailFormatoValido verifica el formato general', () => {
            expect(emailFormatoValido('a@b.cl')).toBeTrue()
            expect(emailFormatoValido('sin-arroba')).toBeFalse()
        })

        it('passwordValida exige entre 4 y 10 caracteres', () => {
            expect(passwordValida('abc')).toBeFalse()
            expect(passwordValida('abcd')).toBeTrue()
            expect(passwordValida('a'.repeat(11))).toBeFalse()
        })

        it('telefonoValido acepta 8-12 digitos con + opcional', () => {
            expect(telefonoValido('+56312345678')).toBeTrue()
            expect(telefonoValido('123')).toBeFalse()
        })
    })

    describe('validateLogin', () => {
        it('devuelve errores si faltan campos', () => {
            expect(validateLogin({ email: '', password: '' })).toEqual({
                email: 'Campo obligatorio', password: 'Campo obligatorio',
            })
        })
        it('no devuelve errores con datos validos', () => {
            expect(validateLogin({ email: 'a@duoc.cl', password: '1234' })).toEqual({})
        })
    })

    describe('validateUser', () => {
        const valid = {
            nombre: 'Ana',
            apellidos: 'Pérez',
            email: 'ana@gmail.com',
            region: 'RM',
            comuna: 'Maipú',
            calle: 'Calle 1',
            password: 'abcd',
            repeatPassword: 'abcd',
        }
        it('acepta un usuario valido', () => {
            expect(validateUser(valid)).toEqual({})
        })
        it('detecta contraseñas que no coinciden', () => {
            expect(validateUser({ ...valid, repeatPassword: 'otra' }).repeatPassword).toBe('Las contraseñas no coinciden')
        })
        it('detecta correo ya registrado con el predicado inyectado', () => {
            expect(validateUser(valid, { isEmailTaken: () => true }).email).toBe('El correo ya está registrado')
        })
        it('al editar, la contraseña vacia no se exige', () => {
            expect(validateUser({ ...valid, password: '', repeatPassword: '' }, { requirePassword: false })).toEqual({})
        })
    })

    describe('validateProduct', () => {
        const valid = { nombre: 'Juego', precio: '1000', stock: '5', categoriaId: '1' }
        it('acepta un producto valido', () => {
            expect(validateProduct(valid)).toEqual({})
        })
        it('rechaza precio no numerico o negativo', () => {
            expect(validateProduct({ ...valid, precio: '-5' }).precio).toBeDefined()
            expect(validateProduct({ ...valid, precio: 'abc' }).precio).toBeDefined()
        })
        it('exige que la oferta sea menor al precio normal', () => {
            expect(validateProduct({ ...valid, precioOferta: '1000' }).precioOferta).toBe('Debe ser menor al precio normal')
            expect(validateProduct({ ...valid, precioOferta: '500' }).precioOferta).toBeUndefined()
        })
    })

    describe('validateCategory, validateCheckout y validateContact', () => {
        it('validateCategory detecta nombre repetido', () => {
            expect(validateCategory({ nombre: 'Indie' }, { isNameTaken: () => true }).nombre)
                .toBe('Ya existe una categoría con ese nombre')
        })
        it('validateCheckout exige los datos de entrega', () => {
            const errors = validateCheckout({})
            expect(Object.keys(errors)).toEqual(jasmine.arrayContaining(['nombre', 'apellidos', 'email', 'calle', 'region', 'comuna']))
        })
        it('validateContact limita el mensaje a 500 caracteres', () => {
            const errors = validateContact({ nombre: 'A', email: 'a@duoc.cl', mensaje: 'x'.repeat(501) })
            expect(errors.mensaje).toBe('Máximo 500 caracteres')
        })
    })
})