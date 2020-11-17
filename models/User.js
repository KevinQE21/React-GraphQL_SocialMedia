//Esquema de Mongo de usuario
const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createAt: String
});

//Exportar el model con un nombre en este caso User
module.exports = model('User', userSchema);