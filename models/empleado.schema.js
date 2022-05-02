const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 150
    },
    apellido: {
        type: String,
        required: true,
        max: 150
    },
    sexo: {
        type: String,
        required: true,
        max: 9
    },
    direccion: {
        type: String,
        required: true,
        max: 300
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        max: 9
    },
    ciudad_nacimiento: {
        type: String,
        required: true,
        max: 50
    },
    telefono: {
        type: String,
        required: true,
        max: 9
    },
    estado_civil: {
        type: String,
        required: true,
        max: 20
    },
    correo_electronico: {
        type: String,
        required: true,
        max: 50
    },
    departamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required:true
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo',
        required: true
    }
}, {
    timestamps: true
})

exports.Empleado = mongoose.model('Empleado', empleadoSchema);
