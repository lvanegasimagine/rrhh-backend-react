const {Empleado} = require('../models/empleado.schema');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const empleadoList = await Empleado.find();

    if(!empleadoList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(empleadoList);
});

router.get('/:id', async(req, res) => {
    const empleado = await Empleado.findById(req.params.id);
    if(!empleado){
        return res.status(500).json({
            success: true,
            message: 'Id de empleado Invalido'
        });
    }

    res.status(200).send(empleado);
})

router.post('/', async (req, res) => {
    let empleado = new Empleado({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        celular: req.body.celular,
        sexo: req.body.sexo,
        ciudad: req.body.ciudad
    });

    empleado = await empleado.save();

    if(!empleado){
        res.status(400).send('Empleado no creado');
    }

    res.send(empleado);
});

router.put('/:id', async(req, res) => {
    const empleado = await Empleado.findByIdAndUpdate(
        req.params.id, //id
        {             //Datos Actualizado
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            celular: req.body.celular,
            sexo: req.body.sexo,
            ciudad: req.body.ciudad
        },
        {new: true}
    );

    if(!empleado){
        return res.status(400).send('Empleado no se pudo Actualizar!');
    }

    res.status(200).send(empleado);
});

//api/v1/empleados/id
router.delete('/:id', (req, res) => {
    Empleado.findByIdAndRemove(req.params.id).then( empleado => {
        if(empleado){
            return res.status(200).json({
                success: true,
                message: 'Empleado Borrado'
            });
        }else{
            return res.status(400).json({
                success: false,
                message: 'Empleado no existe'
            });
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err});
    })
})

module.exports =router;