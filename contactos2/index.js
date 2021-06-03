const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/agenda', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const contactos = require('./routes/contactos');
const usuarios = require('./routes/usuarios');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(session({
	secret: 'es un secreto',
	resave: true,
	saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/contactos', contactos);
app.use('/usuarios', usuarios);

app.get('/', (req, res) => {
	res.redirect('/contactos');
});

app.all('*', (req, res) => {
	res.render('error', { texto: "ERROR 404: SITIO NO ENCONTRADO" });
});

app.listen(80);