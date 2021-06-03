const express = require('express');
const router = express.Router();

const Jugador = require("../models/jugadores");

router.get('/', (req, res) => {

	Jugador.find((err, docs) => {
		if (!err && docs.length > 0) {
			res.render('vista', { jugadores: docs });
		} else {
			res.render('vista', { sinJugadores: true });
		}
	});

});

router.get('/insert', (req, res) => {

	let datosJugador = {
		nombre: 'Messi',
		dorsal: 10,
		posicion: 'delantero'
	};

	let nuevoJugador = new Jugador(datosJugador);

	nuevoJugador.save((err) =>  {
		if (!err) {
			res.redirect('/jugadores');
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

router.get('/update', (req, res) => {

	let id = '6082ccabaaddcd289ce0e7ad';

	let datosJugador = {
		nombre: 'Cristiano Ronaldo',
		dorsal: 7,
		posicion: 'delantero'
	};
		
	Jugador.findByIdAndUpdate(id, datosJugador, { runValidators: true }, (err) => {
		if (!err) {
			res.redirect('/jugadores');
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

router.get('/delete', (req, res) => {

	let id = '6082ccabaaddcd289ce0e7ad';

	Jugador.findByIdAndRemove(id, (err) => {
		if (!err) {
			res.redirect('/jugadores');
		} else {
			console.log("Error al eliminar el jugador");
		}
	});   

});

router.get('/select', (req, res) => {

	let exp = new RegExp('si', 'i');
	
	Jugador.find({ nombre: exp }, (err, docs) => {
		if (!err && docs.length > 0) {
			res.render('vista', { jugadores: docs });
		} else {
			res.render('vista', { sinJugadores: true });
		}
	});

});

module.exports = router;