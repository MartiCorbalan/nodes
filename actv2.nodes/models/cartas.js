const mongoose = require('mongoose');


const cartasSchema = mongoose.Schema({
        nino: {
            type: mongoose.ObjectId,
            required: true,
            ref: "ninos"
        },
    paje: {
        type: mongoose.ObjectId,
        required: true,
        ref: "pajes"
    },
    peticiones: {
        type: [mongoose.ObjectId],
        required: [true, "Las peticiones son obligatorias"],
        ref: "juguetes"
    },
    aceptada: {
        type: Boolean,
        required: [true, "Es obligatorio"]
    }
});

const Cartas = mongoose.model("cartas", cartasSchema);

module.exports = Cartas;