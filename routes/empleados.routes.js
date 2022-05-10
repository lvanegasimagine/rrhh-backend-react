const router = require("express").Router();
const {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  contadorEmpleado
} = require("../controller/empleado.controller");

router.get("/", getEmpleados);
router.get("/:id", getEmpleado);
router.post("/", createEmpleado);
router.put("/:id", updateEmpleado);
router.delete("/:id", deleteEmpleado);
router.get('/get/count', contadorEmpleado);


module.exports = router;
