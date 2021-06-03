const express = require('express');
const router = express.Router();

const Usuario = require("../models/usuarios");

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res) => {	
	
	
	let filtro = {}
	filtro.username = req.body.username;
	filtro.pass = req.body.pass;
	

	Usuario.findOne(filtro, (err, document)=>{
		if(!err){
			if(document){
				
				req.session.usuario = document._id;
				res.redirect('/contactos');
			}else{
				res.render('login', {error: 'datos de acceso incorrectos'});
			}
			
		}else{
			res.render('login', {error: 'se ha producido un error'});
		}
	});

	
});

router.get('/signup', (req, res) => {
	res.render('form-signup');
});

router.post('/signup', (req, res) => {

	if (req.body.pass == req.body.pass_rp) {

		let datosNuevoUsuario = {
			username: req.body.username,
			pass: req.body.pass
		};

		let nuevoUsuario = new Usuario(datosNuevoUsuario);

		nuevoUsuario.save((err) =>  {
			if (!err) {
				res.redirect('login');
			} else {

				let errores = [];
				let campos = Object.keys(err.errors);

				for (let campo of campos) {
					errores.push(err.errors[campo].message);
				}

				res.render('form-signup', { errores: errores });
				
			}
		});

	} else{
		let errores = ['Las contraseñas no coinciden'];

		res.render('form-signup', { errores: errores });
	}
	
});


router.get('/logout', (req, res) =>{
req.session.destroy((err)=>{
	if(err){
		console.log("error al crear usuari")
	}else{

	}
})
});

module.exports = router;