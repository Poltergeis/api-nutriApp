import mongoose from "mongoose";
import { validateJustLetters } from "../validators/citaValidations.js";
import { validateMotivo } from "../validators/citaValidations.js";
import { validateFecha } from "../validators/citaValidations.js";

const citaSchema = new mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        required:true,
        validate:{
            validator: (value) => validateJustLetters(value),
            message: 'nombre de la cita invalido'
        }
    },
    apellidoPaterno: {
        type: mongoose.Schema.Types.String,
        required:true,
        validate:{
            validator: (value) => validateJustLetters(value),
            message: 'nombre de la cita invalido'
        }
    },
    apellidoMaterno: {
        type: mongoose.Schema.Types.String,
        required:true,
        validate:{
            validator: (value) => validateJustLetters(value),
            message: 'nombre de la cita invalido'
        }
    },
    edad: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 0,
        max: 150
    },
    motivo: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate:{
            validator: (value) => validateMotivo(value),
            message: 'motivo invalido'
        }
    },
    fecha: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate: {
            validator: (value) => validateFecha(value),
            message: 'fecha invalida'
        }
    }
},{versionKey:false});

const citaModel = mongoose.model('cita', citaSchema, 'citas');

export default citaModel;