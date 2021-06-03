const express = require('express');
const router = express.Router();

const Contacto = require("../models/contactos");


router.all('*', (req,res,next)=>{
	if(req.session.usuario){
		next();
	}else{
		res.render('login', {error: "debes iniciar sesion para acceder a esa seccion"})
	}
});

router.get('/', (req, res) => {

	let filtro = {};

	if (req.query.search) {

		let exp = new RegExp(req.query.search, 'i');
		filtro.name = exp;

	}

	Contacto.find(filtro).populate('user', 'username').exec((err, documents) => {
		if (!err && documents.length > 0) {
			res.render('contactos', { contactos: documents , usuario:req.session.Mandril});
		} else {
			res.render('contactos', { sinContactos: true });
		}
	});

});

router.get('/create', (req, res) => {
	res.render('form-contactos');
});

router.post('/', (req, res) => {

	let datosNuevoContacto = {
		name: req.body.name,
		phone: req.body.phone,
		mail: req.body.mail,
		instagram: req.body.instagram
	};

	let nuevoContacto = new Contacto(datosNuevoContacto);

	nuevoContacto.save((err) =>  {
		if (!err) {
			res.redirect('/contactos');
		} else {

			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			res.render('form-contactos', { contacto: datosNuevoContacto, errores: errores });
			
		}
	});

});

router.get('/:id/edit', (req, res) => {

	Contacto.findById(req.params.id, (err, document) => {
		if (!err) {
			res.render('form-contactos', {contacto: document});
		} else {
			res.redirect('/contactos');
		}
	});
	
});

router.post('/:id', (req, res) => {

	let datosContactoEditado = {
		name: req.body.name,
		phone: req.body.phone,
		mail: req.body.mail,
		instagram: req.body.instagram
	};
		
	Contacto.findByIdAndUpdate(req.params.id, datosContactoEditado, { runValidators: true }, (err) => {
		if (!err) {
			res.redirect('/contactos');
		} else {
			
			datosContactoEditado._id = req.params.id;
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			res.render('form-contactos', { contacto: datosContactoEditado, errores: errores });
			
		}
	});

});

router.get('/:id/delete', (req, res) => {

	Contacto.findByIdAndRemove(req.params.id, function(err){
		if (!err) {
			res.redirect('/contactos');
		} else {
			console.log("Error al eliminar el contacto");
		}
	});
   

});

module.exports = router;