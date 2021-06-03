const mongoose = require('mongoose');

const pajesSchema = mongoose.Schema({
	usuario : {
		type: String,
		required: [true, "El nom d'usuari es obligatorio"]
	},
	password: {
		type: String,
		required: [true, "La contrasenya es obligatoria"]
	},
	nombre: {
		type: String,
		required: [true, "El nom es obligatori"]
	},
	apellidos: {
		type: String,
		required: [true, "El cognom es obligatori"]
	}
});

const Pajes = mongoose.model("pajes", pajesSchema);

module.exports = Pajes;