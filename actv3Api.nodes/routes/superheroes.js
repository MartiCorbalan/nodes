const express = require('express');
const router = express.Router();

const superheroe = require("../models/superheroe");


router.get('/', (req, res) => {
    superheroe.find({}, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else{
            res.json({ respuesta:'error'});
        }
    });
});


router.get('/:id/delete', (req, res) => {

	superheroe.findByIdAndRemove(req.params.id, function(err){
		if (!err) {
			res.redirect('/juguetes');
		} else {
			console.log("Error al eliminar el superheroe");
		}
	});
   

});

module.exports = router;