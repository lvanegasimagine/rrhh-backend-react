const mongoose = require('mongoose');

const departamentoSchema = mongoose.Schema({
    nombre_departamento: {
        type: String,
        required: true,
        max: 150
    },
    email_corporativo: {
        type: String,
        required: true,
        max: 150
    },
    telefono_corporativo: {
        type: String,
        required: true,
        max: 15
    },
},{
    timestamps: true
});

exports.Departamento = mongoose.model('Departamento', departamentoSchema);
