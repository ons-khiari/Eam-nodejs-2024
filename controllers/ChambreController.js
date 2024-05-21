const Chambre = require("../models/Chambre");
const Hotel = require("../models/Hotel");

const AddChambre = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    hotel.nbChambre += 1;
    await hotel.save();

    const chambre = new Chambre({
      numero: req.body.numero,
      hotel: req.params.id,
      reservee: "false",
      nom_client: "",
    });
    await chambre.save();
    res.status(201).send(chambre);
  } catch (error) {
    console.error("Error creating chambre:", error);
    res.status(500).json({ message: "Error creating chambre" });
  }
};

const reserverChambre = async (req, res) => {
  try {
    const chambre = await Chambre.findById(req.params.id);
    chambre.reservee = true;
    chambre.nom_client = req.body.nom_client;
    await chambre.save();
    res.status(200).send(chambre);
  } catch (error) {
    console.error("Error reserving chambre:", error);
    res.status(500).json({ message: "Error reserving chambre" });
  }
};

const reserverSocket = async (data, io) => {
  try {
    const chambre = await Chambre.findById(data.id);
    chambre.reservee = true;
    chambre.nom_client = data.nom_client;
    await chambre.save();
    io.emit("chambreAdded", {
      numero: chambre.numero,
      hotel: chambre.hotel,
      reservee: chambre.reservee,
      nom_client: chambre.nom_client,
    });
  } catch (error) {
    console.error("Error reserving chambre:", error);
    io.emit("error", { message: "Error creating chambre" });
  }
};

const GetAllSocket = async (io) => {
  try {
    const chambres = await Chambre.find({ reservee: false });
    io.emit("chambresGetAll", chambres);
  } catch (error) {
    console.error("Error getting chambres:", error);
    io.emit("error", { message: "Error getting chambres" });
  }
};

module.exports = {
  AddChambre,
  reserverChambre,
  reserverSocket,
  GetAllSocket,
};
