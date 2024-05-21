const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/HotelController");
const validate = require("../middlewares/Validate");

router.post('/add', validate, HotelController.AddHotel)
router.get('/list', HotelController.GetAllHotels)
router.get("/hotel/:id", HotelController.GetHotelById);
router.delete("/delete/:id", HotelController.DeleteHotel);

module.exports = router;