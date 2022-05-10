const ObjectId = require("mongoose").Types.ObjectId;
const { Cargo } = require("../models/cargo.schema");
const { Empleado } = require("../models/empleado.schema");

const getEmpleados = async (req, res) => {
  try {
    const empleadoList = await Empleado.find()
      .populate("departamento", {
        _id: 0,
        nombre_departamento: 1,
        email_corporativo: 1,
        telefono_corporativo: 1,
      })
      .populate("cargo", {
        _id: 0,
        nombre_cargo: 1,
      });

    if (empleadoList.length === 0) {
      return res.status(404).json({ msg: "No hay empleados" });
    }

    res.status(200).json(empleadoList);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const empleado = await Empleado.findById(id)
      .populate("departamento")
      .populate("cargo");

    if (!empleado) {
      return res.status(400).json({
        message: "Empleado no encontrado",
      });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const createEmpleado = async (req, res) => {
  try {
    let emailExists = await Empleado.findOne({
      correo_electronico: req.body.correo_electronico,
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email ya existe",
      });
    }

    let empleado = new Empleado({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      sexo: req.body.sexo,
      direccion: req.body.direccion,
      fecha_nacimiento: req.body.fecha_nacimiento,
      cedula: req.body.cedula,
      ciudad_nacimiento: req.body.ciudad_nacimiento,
      telefono: req.body.telefono,
      estado_civil: req.body.estado_civil,
      correo_electronico: req.body.correo_electronico,
      departamento: req.body.departamento,
      cargo: req.body.cargo,
    });

    empleado = await empleado.save();

    if (!empleado) {
      return res.status(400).json({
        message: "Empleado no creado",
      });
    }

    res.status(200).json({ data: empleado });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const empleado = await Empleado.findByIdAndUpdate(
      id,
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        sexo: req.body.sexo,
        direccion: req.body.direccion,
        fecha_nacimiento: req.body.fecha_nacimiento,
        cedula: req.body.cedula,
        ciudad_nacimiento: req.body.ciudad_nacimiento,
        telefono: req.body.telefono,
        estado_civil: req.body.estado_civil,
        correo_electronico: req.body.correo_electronico,
        departamento: req.body.departamento,
        cargo: req.body.cargo,
      },
      { new: true }
    );

    if (!empleado) {
      return res.status(400).json({
        message: "Empleado no encontrado",
      });
    }

    res.status(200).json({ msg: "Empleado actualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const empleado = await Empleado.findByIdAndDelete(id);

    if (!empleado) {
      return res.status(400).json({
        message: "Empleado no encontrado",
      });
    }

    res.status(200).json({ msg: "Empleado eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const contadorEmpleado = async (req, res) => {
  try {
    const empleadoCount = await Empleado.countDocuments((count) => count);

    if (empleadoCount === 0) {
      return res.send("No hay Empleados Actualmente");
    }

    res.status(200).json(empleadoCount);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  contadorEmpleado,
};
