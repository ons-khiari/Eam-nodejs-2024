const express = require("express");
const router = express.Router();
const ChambreController = require("../controllers/ChambreController");
const validate = require("../middlewares/Validate");

router.post("/add/:id", ChambreController.AddChambre);
router.put("/reserver/:id", ChambreController.reserverChambre);
router.get("/chambretwig", (req, res) => {
  res.render("Chambre");
});

module.exports = router;