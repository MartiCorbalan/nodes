const mongoose = require('mongoose');

const jugueteSchema = mongoose.Schema({
	nombre : {
		type: String,
		required: [true, "El nom d'usuari es obligatori"],
		maxlength: [80, 'El nom no pot ser tan llarg'],
		//number: true,
		//match: [/[0-9]/, /[-]/, /[ ]/, 'No valid']
	},
	precio: {
		type: Number,
		required: [true, "El preu es obligatori"],
		min: 0
	},
	peso: {
		type: Number,
		required: [true, "El pes es obligatori"],
		min: 0,
		max: 20
	},
	stock: {
		type: Number,
		required: [true, "El stock es obligatori"],
		default: 0,
		min: 0
	}
});

const Juguete = mongoose.model("juguetes", jugueteSchema);

module.exports = Juguete;