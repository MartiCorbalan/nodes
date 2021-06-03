const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res) => {
	res.redirect('/contactos');
});

router.get('/signup', (req, res) => {
	res.render('form-signup');
});

router.post('/signup', (req, res) => {
	res.redirect('login');
});

module.exports = router;