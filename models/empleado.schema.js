const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
})

empleadoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
empleadoSchema.set('toJSON', {
    virtuals: true
});

exports.Empleado = mongoose.model('Empleado', empleadoSchema);
