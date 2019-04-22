
export default values => {
    const errors = {}
    if (!values.name) {
        errors.name = '- Este campo es obligatorio'
    }
    if (!values.lastName) {
        errors.lastName = '- Este campo es obligatorio'
    }
    if (!values.id) {
        errors.id = '- Este campo es obligatorio'
    } else {
        if(!Number(values.id)){
            errors.id = '- La cedula no debe contener letras'
        }else if (values.id.length < 9) {
            errors.id = '- La cedula debe contener 9 digitos numericos'
        }
    }
    if (!values.cellphone) {
        errors.cellphone = '- Este campo es obligatorio'
    } else {
        if (!Number(values.cellphone)) {
            errors.cellphone = '- El numero de telefono no debe contener letras'
        }else if (values.cellphone.lenght < 8 || values.cellphone.lenght > 8) {
            errors.cellphone = '- El numero de telefono debe contener 8 digitos numericos'
        }
    }
    if (!values.email) {
        errors.email = '- Este campo es obligatorio'
    } else {
        if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors.email = "- No es una dirección de correo valida"
        }
    }
    if (!values.address) {
        errors.address = '- Este campo es obligatorio'
    }
    if (!values.username) {
        errors.username = '- Este campo es obligatorio'
    } else {
        if (values.email.lenght < 4) {
            errors.username = '- El nombre de usuario debe tener al menos 4 caracteres'
        }
    }
    if (!values.password) {
        errors.password = '- Este campo es obligatorio'
    } else {
        if (values.password.lenght < 8) {
            errors.username = '- La contraseña debe tener al menos 4 caracteres'
        }
    }

    return errors
}