const express = require('express');
const formidable = require('formidable')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('partes.pug');
});
router.post("/", (req, res) => {
    var error = false;
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {});
    form.on("fileBegin", (name, file) => {
      const aux = file.name.split(".");
      console.log(aux);
      file.path = './files/' + Math.random().toString(36).substr(2)+".pdf";
      if (aux[1] == "pdf") {
        form.on("file", (name, files) => {
          res.render("partes",{error: true});
        });
      }else{
        res.render("partes",{error: false});
      }
    });
  });




module.exports = router;