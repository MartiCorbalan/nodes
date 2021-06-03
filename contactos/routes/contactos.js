const express = require('express');
const router = express.Router();

const Contacts = require("../models/contactos");


router.get('/', (req, res) => {
	Contacts.find((err, docs) => {
		if (!err && docs.length > 0) {
			res.render('contactos', { contactos: docs });
		} else {
			res.render('contactos', { nocontactos: true });
		}
	});
});

router.get('/create', (req, res) => {
	let contacto = {name: "",
					mail: "",
					phone: "",
					instagram: ""};

	res.render('form-contactos', { contacto: contacto });
});

router.post('/', (req, res) => {
	res.redirect('/contactos');
});

router.get('/:id/edit', (req, res) => {
	
	let contacto = {name: req.body.name,
					mail: req.body.mail,
					phone: req.body.phone,
					instagram: req.body.instagram};

	res.render('form-contactos', { contacto: contacto });
});

router.post('/update', (req, res) => {
	let id = req.params.id;

	let dades = {
			name: "",
			mail: "",
			phone: "",
			instagram: ""
	};
		
	Contacts.findByIdAndUpdate(id, dades, { runValidators: true }, (err) => {
		if (!err) {
			res.redirect('/contactos');
		} else {
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			console.log(errores);
			
		}
	});
});

router.get('/:id/delete', (req, res) =>{
	let id = req.params.id;

	Contacts.findByIdAndRemove(id, (err) => {
		if (!err) {
			res.redirect('/contactos');
		} else {
			console.log("Error al eliminar un contacte");
		}
	});   
});


module.exports = router;