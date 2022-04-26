const ObjectId = require("mongoose").Types.ObjectId;
const { Departamento } = require("../models/departamento.schema");

const getDepartamentos = async (req, res) => {
  try {
    const departamentoList = await Departamento.find();
    if (departamentoList.length === 0) {
      return res.status(404).json({ msg: "No hay departamentos" });
    }
    res.status(200).json({ data: departamentoList });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const getDepartamento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const departamento = await Departamento.findById(id);

    if (!departamento) {
      return res.status(400).json({
        message: "Departamento no encontrado",
      });
    }

    res.status(200).json({ data: departamento });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const createDepartamento = async (req, res) => {
  try {
    let emailExists = await Departamento.findOne({
      email_corporativo: req.body.email_corporativo,
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email ya existe",
      });
    }

    let departamento = new Departamento({
      nombre_departamento: req.body.nombre_departamento,
      email_corporativo: req.body.email_corporativo,
      telefono_corporativo: req.body.telefono_corporativo,
    });

    departamento = await departamento.save();

    if (!departamento) {
      return res.status(400).json({
        message: "Departamento no creado",
      });
    }

    res.status(200).json({ data: departamento });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const updateDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }
    const departamento = await Departamento.findByIdAndUpdate(
      id,
      {
        nombre_departamento: req.body.nombre_departamento,
        email_corporativo: req.body.email_corporativo,
        telefono_corporativo: req.body.telefono_corporativo,
      },
      {
        new: true,
      }
    );

    if (!departamento) {
      return res.status(400).json({
        message: "Departamento no se pudo encontrar",
      });
    }

    res
      .status(200)
      .json({ msg: "departamento actualizado", data: departamento });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const deleteDepartamento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const departamento = await Departamento.findOneAndDelete(id);

    if(!departamento) {
      return res.status(400).json({
        message: "Departamento no encontrado",
      });
    }

    res.status(200).json({ msg: "Departamento Eliminado", departamento });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  getDepartamentos,
  getDepartamento,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};
