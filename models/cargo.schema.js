const mongoose = require('mongoose');

const cargoSchema = mongoose.Schema({
    departamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required:true
    },
    nombre_cargo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

exports.Cargo = mongoose.model('Cargo', cargoSchema);
