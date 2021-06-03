const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');


mongoose.connect('mongodb://localhost/examen', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }); 

//rutes / modelos
const pizzas = require('./routes/pizzas');
const mensaje = require('./routes/mensaje');
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
  
app.use(session({
	secret:  'res',
	resave: true,
	saveUninitialized: true
}));


app.use('/pizzas', pizzas);
//app.use('/mensaje', mensaje);


app.get('/', (req, res) => {
    res.render("mensaje", {mensaje: 'Hola, Bienvenido/a'});
})


app.all('*', (req, res) => {
	res.render('error', { mensaje: "ERROR 404: Pàgina no trobada" });
});


app.listen(80); 