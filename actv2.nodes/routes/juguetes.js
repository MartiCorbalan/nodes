const express = require('express');
const router = express.Router();

const Juguete = require("../models/juguetes");

router.get('/', (req, res) => {


	if(req.session.paje){
		
	
	let filtro = {};

	if (req.query.search) {

		let exp = new RegExp(req.query.search, 'i');
		filtro.name = exp;

	}

		Juguete.find(filtro).populate('user', 'username').exec((err, juguetes) => {
			if (!err && juguetes.length > 0) {
				res.render('juguetes', { juguetes: juguetes, paje: req.session.paje });
			} else {
				res.render('juguetes', { sinJuguetes: true });
			}
		});
	}
	else{
		res.render("formulari", {err: "no has iniciat sessio, no pots accedir "})
	}
});

router.get('/create', (req, res) => {

	/////// es el bueno //////////
	router.get('/create', (req, res) => {

		if(req.session.paje){
			res.render('createjuguetes', { paje: req.session.paje });
		}
		else{
			res.render('login', {error: "No has iniciado sesion, no puedes acceder." });
		}
	
	});

/*


	if(req.session.paje){
		
	
		let filtro = {};
	
		if (req.query.search) {
	
			let exp = new RegExp(req.query.search, 'i');
			filtro.name = exp;
	
		}
	
			Juguete.find(filtro).populate('user', 'username').exec((err, juguetes) => {
				if (!err && juguetes.length > 0) {
					res.render('formjuguetes', { juguetes: juguetes, paje: req.session.paje });
				} else {
					res.render('formjuguetes', { sinJuguetes: true });
				}
			});
		}
		else{
			res.render("formulari", {err: "no has iniciat sessio, no pots accedir "})
		}*/
	//res.render('formjuguetes');
});

router.post('/', (req, res) => {

	let datosNuevoJuguete = {
		nombre: req.body.nombre,
		precio: req.body.precio,
		peso: req.body.peso,
		stock: req.body.stock
	};

	let nuevoJuguete = new Juguete(datosNuevoJuguete);

	nuevoJuguete.save((err) =>  {
		if (!err) {
			res.redirect('/juguetes');
		} else {

			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			res.render('formjuguetes', { juguetes: datosNuevoJuguete, errores: errores });
			
		}
	});

});


router.get('/:id/edit', (req, res) => {

	Juguete.findById(req.params.id, (err, juguetes) => {
		if (!err) {
			res.render('formjuguetes', {juguetes: juguetes});
		} else {
			res.redirect('/juguetes');
		}
	});
	
});

router.post('/:id', (req, res) => {

	let datosJugueteEditado = {
		nombre: req.body.nombre,
		precio: req.body.precio,
		peso: req.body.peso,
		stock: req.body.stock
	};
		
	Juguete.findByIdAndUpdate(req.params.id, datosJugueteEditado, { runValidators: true }, (err) => {
		if (!err) {
			res.redirect('/juguetes');
		} else {
			
			datosJugueteEditado._id = req.params.id;
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			res.render('formjuguetes', { juguetes: datosJugueteEditado, errores: errores });
			
		}
	});

});


router.get('/:id/delete', (req, res) => {

	Juguete.findByIdAndRemove(req.params.id, function(err){
		if (!err) {
			res.redirect('/juguetes');
		} else {
			console.log("Error al eliminar el juguete");
		}
	});
   

});






module.exports = router;