var express = require('express');
var router = express.Router();


router.get('/login', (req, res)=>{
    res.render("clientes");
});

router.post('/login', (req, res)=>{
    var nif = req.body.nif;
    var password = req.body.password;
    var error = false;

    if(nif == '123' && password == 'user1234'){
        error = true;
        res.render('form');
    }else{
        error = false;
        res.render('clientes', {error: false});
    }
   
    

});

module.exports = router;