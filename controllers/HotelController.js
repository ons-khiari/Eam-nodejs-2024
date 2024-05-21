const Hotel = require("../models/Hotel");

const AddHotel = async (req, res) => {
  try {
    const hotel = new Hotel({
      adresse: req.body.adresse,
      nbChambre: 0,
      email: req.body.email,
      nom: req.body.nom
    });
    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ message: "Error creating hotel" });
  }
};

const GetAllHotels = async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).send(hotels);
    } catch (error) {
      console.error("Error getting hotels:", error);
      res.status(500).json({ message: "Error getting hotels" });
    }
}

const GetHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (error) {
    console.error("Error getting Hotel:", error);
    res.status(500).json({ message: "Error getting Hotel" });
  }
};

const DeleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Hotel:", error);
    res.status(500).json({ message: "Error deleting Hotel" });
  }
};


module.exports = {
    AddHotel,
    GetAllHotels,
    GetHotelById,
    DeleteHotel
};
