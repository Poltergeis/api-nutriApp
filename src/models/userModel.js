import mongoose from "mongoose";

import { validateNombre,validateEmail,validatePassword } from "../validators/userValidations.js";

const userSchema = new mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate:{
            validator: (value) => validateNombre(value),
            message: 'nombre invalido'
        }
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate:{
            validator: (value) => validateEmail(value),
            message: 'email invalido'
        }
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate:{
            validator: (value) => validatePassword(value),
            message: 'contraseña invalida'
        }
    }
}, {versionKey:false,_id:true});

export const userModel = mongoose.model('User', userSchema, 'Users');