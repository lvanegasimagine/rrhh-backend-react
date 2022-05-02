const { Cargo } = require("../models/cargo.schema");
const { Departamento } = require("../models/departamento.schema");
const ObjectId = require("mongoose").Types.ObjectId;

const getCargos = async (req, res) => {
  try {
    const cargoList = await Cargo.find().populate("departamento", {
      _id: 0,
      nombre_departamento: 1,
      // email_corporativo: 1,
    });

    if (cargoList.length === 0) {
      return res.status(404).json({ msg: "No hay cargos" });
    }
    res.status(200).json(cargoList);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const getCargo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Id No valido" });
    }

    const cargo = await Cargo.findById(id).populate("departamento", {
      _id: 0,
      nombre_departamento: 1,
      // email_corporativo: 1,
    });

    if (!cargo) {
      return res.status(400).json({
        message: "Cargo no encontrado",
      });
    }

    res.status(200).json(cargo);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const createCargo = async (req, res) => {
  try {
    const departamento = await Departamento.findById(
      req.body.departamento
    ).populate("Departamento", "nombre_departamento");

    if (!departamento) {
      return res.status(400).json({ msg: "Departamento no Existe" });
    }

    let cargo = new Cargo({
      departamento: req.body.departamento,
      nombre_cargo: req.body.nombre_cargo,
      descripcion: req.body.descripcion,
    });

    cargo = await cargo.save();

    if (!cargo) {
      return res.status(400).json({
        message: "Cargo no creado",
      });
    }

    res.status(200).json({ data: cargo });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};

const updateCargo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const departamento = await Departamento.findById(req.body.departamento);

    if (!departamento) {
      return res.status(400).json({ msg: "Departamento no Existe" });
    }

    const cargo = await Cargo.findByIdAndUpdate(
      id,
      {
        departamento: req.body.departamento,
        nombre_cargo: req.body.nombre_cargo,
        descripcion: req.body.descripcion,
      },
      {
        new: true,
      }
    );

    if (!cargo) {
      return res.status(400).json({
        message: "Cargo no se pudo encontrar",
      });
    }

    res.status(200).json({ msg: "Cargo actualizado", data: cargo });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const deleteCargo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id No valido" });
    }

    const cargo = await Cargo.findByIdAndRemove(id);

    if (!cargo) {
      return res.status(400).json({
        message: "Cargo no encontrado",
      });
    }

    res.status(200).json({ msg: "Cargo Eliminado", cargo });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const contadorCargo = async (req, res) => {
  const cargoCount = await Cargo.countDocuments((count) => count);

  if (!cargoCount) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
  res.send({
    cargoCount: cargoCount,
  });
};

module.exports = {
  getCargos,
  getCargo,
  createCargo,
  updateCargo,
  deleteCargo,
  contadorCargo,
};
