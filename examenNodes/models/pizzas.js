const mongoose = require('mongoose');


const pizzasSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        maxlength: [20, 'El nom no pot ser tan llarg'],
       
    },
    precio:{
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: 1,
    },
    vegetariana:{
        type: String,
        required: [true, "es obligatorio"],
        validate: {
            validator: (v) => {
                return v == 'SI' || v == 'NO';
            },
            message: 'El genero debe ser "SI" o "NO"'
        }
    },
    restaurante:{
        type: mongoose.ObjectId,
        required: [true, "es obligatorio"],
        ref: "restaurants",
    }
  

});


/*pizzasSchema.virtual('precioIVA').get(function() {
    return this.precio + ' ' + this.apellidos;
});*/


const Pizzas = mongoose.model("pizzas", pizzasSchema);
module.exports = Pizzas;