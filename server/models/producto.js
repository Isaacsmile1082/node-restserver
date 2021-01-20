let moongose = require('mongoose');
let Schema = moongose.Schema;

let productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio unitario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
 
});

module.exports = moongose.model('Producto', productoSchema);