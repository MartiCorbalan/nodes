const express = require('express');
const router = express.Router();

const Paje = require("../models/pajes");


router.get('/login', (req, res) => {
	res.render('login');
});

/*router.post('/login', (req, res) => {	
	
	
	let filtro = {}
	filtro.username = req.body.username;
	filtro.pass = req.body.pass;


	Paje.findOne(filtro, (err, document)=>{
		if(!err){
			if(document){
				
				req.session.paje = document._id;
				res.redirect('/juguetes');
			}else{
				res.render('formulari', {error: 'datos de acceso incorrectos'});
			}
			
		}else{
			res.render('formulari', {error: 'se ha producido un error'});
		}
	});

	
});*/


router.get('/signup', (req, res) => {
	res.render('signup');
});

router.post('/signup', (req, res) => {

	if (req.body.pass == req.body.pass_rp) {

		let datosNuevoUsuario = {
			username: req.body.username,
			pass: req.body.pass,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos
		};

		let nuevoUsuario = new Paje(datosNuevoUsuario);

		nuevoUsuario.save((err) =>  {
			if (!err) {
				res.redirect('formulari');
			} else {

				let errores = [];
				let campos = Object.keys(err.errors);

				for (let campo of campos) {
					errores.push(err.errors[campo].message);
				}

				res.render('signup', { errores: errores });
				
			}
		});

	} else{
		let errores = ['Las contraseñas no coinciden'];

		res.render('signup', { errores: errores });
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