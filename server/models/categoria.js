const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    }

});

categoriaSchema.methods.toJSON = function() {

    let categoria = this;
    let objCategoria = categoria.toObject();
    return objCategoria;
} 

module.exports = moongose.model('Categoria', categoriaSchema);