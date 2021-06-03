const mongoose = require('mongoose');

const ContactoSchema = mongoose.Schema({
	name : {
		type: String,
        required: [true, "El nom es obligatorio"],
	},
	mail: {
		type: String,
		required: [true, "El email es obligatorio"],
		
	},
	phone: {
		type: Number,
		required: [true, "el numero es obligatori"],
		
	},
    instagram: {
		type: String,
		
	}

    
});



const contactoo = mongoose.model("contactos", ContactoSchema);
module.exports = contactoo;