const mongoose = require('mongoose');


const ninosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellidos: {
        type: String,
        required: [true, "Los apellidos son obligatorios"]
    },
    fechaNacimiento: {
        type: Date,
        required: [true, "La fecha es obligatoria"]
    },
    comportamiento: {
        type: String,
        required: [true, "El comportamiento es obligatorios"]
    },
    poblacion: {
        type: String,
        required: [true, "La poblacion es obligatorios"]
    },
    pais: {
        type: String,
        required: [true, "El pais es obligatorios"]
    }

});

ninosSchema.virtual('nombreCompleto').get(function() {
    return this.nombre + ' ' + this.apellidos;
  });

ninosSchema.virtual('edad').get(function() {

        const diff = Date.now() - this.fechaNacimiento.getTime();
        return Math.abs(new Date(diff).getUTCFullYear() - 1970);

});



const Ninos = mongoose.model("ninos", ninosSchema);

module.exports = Ninos;