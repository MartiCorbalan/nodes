const express = require('express');
const router = express.Router();

const Superheroes = require("../models/superheroes");

router.get('/', (req, res) => {
    Superheroes.find({}, (err, doc) => {
        if (!err) {
			res.json(doc);
        }
		else{
			res.json({ respuesta:'error'});
		}
        
    });
});

router.get('/:id', (req, res) => {
    Superheroes.findById(req.params.id, (err, document) => {
		if (!err) {
			res.json(document);
		} else {
			res.json({ respuesta:'error'});
		}
	});
});

router.get('/search/:text', (req, res) => {
	
	let filtro = {};
	
		let exp = new RegExp(req.params.text, 'i');
		filtro.nombre = exp;
	
		Superheroes.find(filtro).exec((err, document) => {
			if (!err && document.length > 0) {
				res.json(document);
			} else {
				res.json({ respuesta:'error'});
			}
		});
});


router.get('/sort/:propietat', (req, res) => {
    if(req.params.propietat === "altura" || req.params.propietat === "pes" || req.params.propietat === "nombre" )
    {
        Superheroes.find({}).sort(req.params.propietat).exec((err, doc) => {
            if (!err ) {
				res.json(doc);
            }else{		
				res.json({ error: err });
                return;
			} 
        });
    }
    else{
        res.json({ respuesta:'error'});
    } 
});


router.get('/vs/:id0/:id1', (req, res) => {

    Superheroes.findById(req.params.id0, (err,player1) => {
        if (!err) {
            Superheroes.findById(req.params.id1, (err, player2) => {

                if (!err) {

                    var promitgP1 = player1.inteligencia + 
						player1.fuerza + 
						player1.velocitat +
						player1.resistencia +
						player1.poder + 
						player1.habilitat / 6;

                    var promitgP2 = player2.inteligencia + 
						player2.fuerza + 
						player2.velocitat + 
						player2.resistencia +
						player2.poder + 
						player2.habilitat / 6;

                    if(promitgP1 > promitgP2)
                    {
                        res.json({ respuesta: player1});
                    }
                    else{
                        if(promitgP1 < promitgP2)
                        {
                            res.json({ respuesta: player2});
                        }
                        else{
                            if(promitgP1 == promitgP2)
                            {
                                const infoPlayers = [player1, player2];
                                res.json({ respuesta: infoPlayers});
                            }
                        }
                    }
                } else {
                    res.json({ respuesta:'error'});
                }
            });
        } else {
            res.json({ respuesta:'error'});
        }
    });

});


router.post('/', (req, res) => {
	let nouHeroe = {
	  nombre: req.body.nombre,
	  genero: req.body.genero,
	  raza: req.body.raza,
	  altura: req.body.altura,
	  pes: req.body.pes,
	  poblacion: req.body.poblacion,
	  inteligencia: req.body.inteligencia,
	  fuerza: req.body.fuerza,
	  velocitat: req.body.velocitat,
	  resistencia: req.body.resistencia,
	  poder: req.body.poder,
	  habilitat: req.body.habilitat,
  };

	  let heroe = new Superheroes(nouHeroe);
	  heroe.save((err, doc) => {
	  if (!err) {
		  res.json({ respuesta:'ok'});
	  }
	  else{
		  res.json({ respuesta: err});
	  }

  });
});


router.put('/:id', (req, res) => {
	let nouHeroe = {
			nombre: req.body.nombre,
			genero: req.body.genero,
			raza: req.body.raza,
			altura: req.body.altura,
			pes: req.body.pes,
			poblacion: req.body.poblacion,
			inteligencia: req.body.inteligencia,
			fuerza: req.body.fuerza,
			velocitat: req.body.velocitat,
			resistencia: req.body.resistencia,
			poder: req.body.poder,
			habilitat: req.body.habilitat,
		};
		Superheroes.findByIdAndUpdate(req.params.id,nouHeroe, (err, doc) => {
			if (!err) {
				res.json({ respuesta:'ok'});
			}
			else{
				let errores = [];
				let campos = Object.keys(err.errors);
				for (let campo of campos) {
					errores.push(err.errors[campo].message);
				}
				res.json({ respuesta: errores});
			}
	
			});
	});


router.delete('/:id', (req, res) => {
		Superheroes.findByIdAndDelete(req.params.id, (err, data) => {
			if (!err) {
				res.json({ respuesta:'ok'});
			}
			else{
				res.json({ respuesta: 'error'});
			}
		});
	});




module.exports = router;