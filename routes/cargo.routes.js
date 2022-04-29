const router = require("express").Router();
const {
  getCargos,
  createCargo,
  getCargo,
  deleteCargo,
  updateCargo,
  contadorCargo
} = require("../controller/cargo.controller");

router.get("/", getCargos);
router.get("/:id", getCargo);
router.post("/", createCargo);
router.put("/:id", updateCargo);
router.delete("/:id", deleteCargo);
router.get(`/get/count`, contadorCargo);

module.exports = router;
