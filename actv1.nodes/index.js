const express = require('express');
const app = express();

app.use(express.urlencoded({
    extended: true
}));

//instanciem rutes
const form = require('./routes/form');
const polizas = require('./routes/polizas');
const presupuestos = require('./routes/presupuestos');
const clientes = require('./routes/clientes');
const partes = require('./routes/partes');

app.use(express.static('public'))

//per poder utilitzar views
app.set('view engine', 'pug');
app.set('views', './views');

//utilitzem rutes
app.use('/presupuestos', presupuestos)
app.use('/polizas', polizas)
app.use('/clientes', clientes)
app.use('/partes', partes)

app.get('/', (req, res) => {
    res.render("form");
})

app.get('/info', (req, res) => {
    res.render("info.pug");
})










//posat el get polizas/PXXXXXX
/*
app.get('/partes', (req, res) => {
    res.render('partes.pug');
})

app.get('/clientes/login', (req, res) => {
    res.render('form.pug');
})*/



app.all('*', (req, res) => {
    res.render('error.pug');
});



app.listen(80);