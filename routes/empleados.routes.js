const router = require("express").Router();
const {
  getCargos,
  createCargo,
  getCargo,
  deleteCargo,
  updateCargo,
} = require("../controller/cargo.controller");

router.get("/", getCargos);
router.get("/:id", getCargo);
router.post("/", createCargo);
router.put("/:id", updateCargo);
router.delete("/:id", deleteCargo);

module.exports = router;
