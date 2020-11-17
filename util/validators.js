module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors ={};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';//Verifica que el username no este vacio
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';//Verifica que el email no este vacio
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';//verifica que el correo sea valido
        }
    }
    if (password === '') {
        errors.password = 'Password must not empty';//Verifica que la password no este vacia
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password must match';//Verifica que las password sean iguales
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

//Validator for login data

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';//Verifica que el username no este vacio
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';//Verifica que el username no este vacio
    } 

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};