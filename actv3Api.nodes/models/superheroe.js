const mongoose = require('mongoose');


const superheroeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nom es obligatori"],
        maxLenght:[20, "Màx 20 caràcters"]
    },
    genero: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v == 'Masculino' || v == 'Femenino';
            },
            message: 'El genero debe ser "Masculino" o "Femenino"'
        }
    },
    raza: {
        type: String
        
    },
    altura: {
        type: Number,
        min: 0,
        required: [true, "És obligatorio"]
    },
    pes: {
        type: Number,
        min: 0,
        required: [true, "És obligatorio"]
    },
    poblacion: {
        type: String,
       
    },
    inteligencia: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatoria"]
    },
    fuerza: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatori"]
    },
    velocitat: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatori"]
    },
    resistencia: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatori"]
    },
    poder: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatori"]
    },
    habilitat: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, " És obligatori"]
    }


});

const Superheroe = mongoose.model("superheroe", superheroeSchema);

module.exports = Superheroe;