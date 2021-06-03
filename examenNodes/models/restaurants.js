const mongoose = require('mongoose');



const restaurantesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    }
  

});

const Restaurante = mongoose.model("restaurantes", restaurantesSchema);
module.exports = Restaurante;