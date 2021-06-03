const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/reyesmagos', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const Pajes = require("./models/pajes");
const juguetes = require('./routes/juguetes');
const cartas = require('./routes/cartas');
const registre = require('./routes/registre');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(session({
	secret:  'res',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/juguetes', juguetes);
app.use('/cartas', cartas);
app.use('/registre', registre);

app.get('/', (req, res) => {
	res.render('formulari');
});

app.post('/login', (req, res) => {	
	
	let busqueda = {};
	busqueda.usuario = req.body.usuario;
	busqueda.password = req.body.password;

	Pajes.findOne(busqueda, (err,document)=>{
		if(!err)
		{
			if(document)
			{
				console.log(document);
				req.session.paje= document._id;
				res.redirect('/juguetes');
			}
			else{
				res.render('formulari', {error: 'Datos de acceso incorrecto'});
			}
		}
		else{
			res.render('formulari', {error: 'Se produjo error'});
		}
	});
});


app.all('*', (req, res) => {
	res.render('error', { texto: "ERROR 404: Pàgina no trobada" });
});

app.listen(80);