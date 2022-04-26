const mongoose = require('mongoose');

const departamentoSchema = mongoose.Schema({
    nombre_departamento: {
        type: String,
        required: true
    },
    email_corporativo: {
        type: String,
        required: true
    },
    telefono_corporativo: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

exports.Departamento = mongoose.model('Departamento', departamentoSchema);
