const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
	username : {
		type: String,
		required: [true, "El nombre de usuario es obligatorio"]
	},
	pass: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
		minlength: [8, "Debes introducir 8 o más caracteres"]
	}
});

const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;