var express = require('express');
var router = express.Router();

const Pizzas = require("../models/pizzas");
const Restaurants = require("../models/restaurants");


router.get('/', (req, res) => {
    res.render("pizzas");
});


router.get('/', (req, res) => {

	let filtro = {};

    Pizzas.find(filtro).populate('restaurants').exec((err, pizzas) => {
			if (!err && pizzas.length > 0) {
				res.render('pizzas', { pizzas: pizzas });
			} else {
				
			}
		});
});



router.get('/:id/delete', (req, res) => {

	Pizzas.findByIdAndRemove(req.params.id, function(err){
		if (!err) {
			res.redirect('/pizzas');
		} else {
			console.log("Error al eliminar la pizza");
		}
	});
   

});

//API
router.get('/', (req, res) => {
    Pizzas.find({}, (err, doc) => {
        if (!err) {
			res.json(doc);
        }
		else{
			res.json({ respuesta:'error'});
		}
        
    });
});

router.get('/:id(P[0-9]{24})', (req, res) => {
    Pizzas.findById(req.params.id, (err, document) => {
		if (!err) {
			res.json(document);
		} else {
			res.json({ respuesta:'error'});
		}
	});
});

router.post('/', (req, res) => {
	let novaPizza = {
	  nombre: req.body.nombre,
	  precio: req.body.precio,
      vegetariana: req.body.vegetariana
  };

	  let picsa = new Superheroes(novaPizza);
	  picsa.save((err, doc) => {
	  if (!err) {
		  res.json({ respuesta:'ok'});
	  }
	  else{
		  res.json({ respuesta: err});
	  }

  });
});



module.exports = router;