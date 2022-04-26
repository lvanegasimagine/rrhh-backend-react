const router = require("express").Router();
const {
  getDepartamentos,
  getDepartamento,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} = require("../controller/departamento.controller");

router.get("/", getDepartamentos);
router.get("/:id", getDepartamento);
router.post("/", createDepartamento);
router.put("/:id", updateDepartamento);
router.delete("/:id", deleteDepartamento);

module.exports = router;
