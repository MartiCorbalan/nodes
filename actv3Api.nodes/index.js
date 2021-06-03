const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/superheroe', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const superheroe = require("./routes/superheroes");



app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/superheroe', superheroe);




app.all('*', (req, res) => {
	res.render('error', { texto: "ERROR 404: Pàgina no trobada" });
});

app.listen(80);