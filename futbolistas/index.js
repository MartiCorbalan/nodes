const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/futbolistas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const jugadores = require('./routes/jugadores');
app.use('/jugadores', jugadores);

app.get('/', (req, res) => {
	res.redirect('/jugadores');
});

app.all('*', (req, res) => {
	res.send('ERROR 404: SITIO NO ENCONTRADO');
});

app.listen(80);