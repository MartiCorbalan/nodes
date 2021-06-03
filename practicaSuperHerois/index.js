const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/superheroe', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const superHeroes = require('./routes/superheroes');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/superheroes', superHeroes);

app.all('*', (req, res) => {
	res.json({ Respuesta: "error mother fucker" });
});

app.listen(80);