const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    
   const polizas = [
       "P12345678",
       "P34854554",
       "P83958665",
       "P83958545",
       "P83955565"
   ];
   res.render("polizas", {
       items: polizas
   });
});
//enviem el id 
router.get("/:id(P[0-9]{8})", (req, res)=>{
    res.render("polizaView", {id: req.params.id});
});







module.exports = router;