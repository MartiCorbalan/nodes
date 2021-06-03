const mongoose = require('mongoose');

const JugadorSchema = mongoose.Schema({
	nombre : {
		type: String,
		required: [true, "El nombre es obligatorio"],
		minlength: [3, 'El nombre debe tener una longitud mínima de 3 carácteres']
	},
	dorsal: {
		type: Number,
		required: [true, "El dorsal es obligatorio"],
		min: [1, 'El dorsal debe ser superior a 0'],
		max: [99, 'El dorsal debe ser inferior a 100']
	},
	posicion: {
		type: String,
		required: [true, "La posición es obligatoria"],
		match: [/portero|defensa|centrocampista|delantero/, 'La posición introducida no es válida']
	}
});

const Jugador = mongoose.model("jugadores", JugadorSchema);

module.exports = Jugador;