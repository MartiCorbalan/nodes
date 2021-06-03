const express = require('express');
const router = express.Router();

const Cartas = require("../models/cartas");
const Ninos = require("../models/ninos");


/*router.get('/', (req, res) => {


	if(req.session.paje){

		let filtro = {};

		if (req.query.search) {

			let exp = new RegExp(req.query.search, 'i');
			filtro.nombre = exp;

		}
	//para pedir el nombre del paje
		filtro.paje = req.session.paje;
		//console.log(filtro.paje);
			Cartas.find(filtro).populate('nino').exec((err, documents) => {
				console.log(documents);
				if (!err && documents.length > 0) {
					console.log(documents)
					res.render('cartas', { cartas: documents, paje: req.session.paje });
				} else {
					res.render('cartas', { sinCartas: true });
				}
			});
	}
	else{
		res.render("formulari", {err: "no has iniciat sessio, no pots accedir "})
	}
});*/


///////////////////////////////////////////
router.get('/', (req, res) => {

    if (req.session.paje) {

        let filtro = {
			paje: req.session.paje
		};
       
		console.log("filtro");
		console.log(filtro);
        Cartas.find(filtro).populate('nino').exec((err, docs) => {
			console.log("docs");
			console.log(docs);
			console.log("Errores")
			console.log(err)
            if (!err && docs.length > 0) {
				//console.log(docs);
                res.render('cartas', { carta: docs, paje: req.session.paje});
            }
            else {
                res.render('cartas', { sinCartas: true, paje: req.session.paje});
            }
        });
    }
    else {
        res.render('formulari', { error: "No pots accedir a cartes sense iniciar sessió" });
    }
});

router.get('/:id/edit', (req, res) => {
var preu=0;
var pes=0;
	Cartas.findById(req.params.id).populate('nino').populate('paje').populate('peticiones').exec((err, cartas) => {
		if (!err) {
			console.log(cartas)
			//calcular el preu i el pes de les joguines de la carta
			for(i=0; i<cartas.peticiones.length;i++){
				preu = preu + cartas.peticiones[i].precio;
				pes = pes + cartas.peticiones[i].peso;
			}
			res.render('veurecarta', {cartas: cartas, paje: req.session.paje, preu: preu, pes: pes});
		}
	});
	
});




module.exports = router;