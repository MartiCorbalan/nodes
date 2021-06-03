const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("LISTADO DE PRODUCTOS");
});


router.post('/', (req,res)=> {
    console.log(req.body);
    res.render("presupuestos", 
        {presupuesto: req.body.presupuesto,
        });
});












module.exports = router;