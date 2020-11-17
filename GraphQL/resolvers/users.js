const bcrypt = require('bcryptjs');// es un metodo async => encripta la password
const jwt = require('jsonwebtoken')// => escripta la info por medio del token 
const { UserInputError } = require('apollo-server');//servio del servidor de apollo para errores

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
     {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const {errors, valid} = validateLoginInput(username, password);
            const user = await User.findOne({ username });

            if(!valid){
                throw new UserInputError('Errors', { errors })
            }

            if (!user){
                errors.general = 'User not found';
                throw new UserInputError('User no foung', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match){
                errors.general = 'Wrong Credentials';
                throw new UserInputError('Wrong Credentials', { errors });s
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _, 
            {
                registerInput: {username, email, password, confirmPassword} // Destructuring 
            },
            ){
            //  Validate user data // podemos tener espacio vacio, por ende, la validacion, sobre los datos del user como email y demas
                const {valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
                if(!valid){
                    throw new UserInputError('Errors', { errors });
                }

            //  Makes sure user doesnt already exist
                const user = await User.findOne({ username });
                if(user){
                    throw new UserInputError('Username is taken', {
                        errors: {
                            username: 'This username is taken'
                        }//Lista de errores de usuarios
                    })
                }

            // hash password and create an auth token
                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()   
                });

                const res = await newUser.save()

                const token = generateToken(res)

                return {
                    ...res._doc,
                    id: res._id,
                    token
                };
            
        }//parent le da el resultado del input(normalmente el ultimo input), args son los argumentos del register input de typeDefs, context , info general de metodos 
        
    }
}
