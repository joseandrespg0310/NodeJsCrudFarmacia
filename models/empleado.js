const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
  nombre: String,
  apellido: String,
   nombre_del_producto: String,
   descripcion: String,
  precio: Number
  
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
