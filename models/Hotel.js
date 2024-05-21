const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  adresse: {
    type: String,
  },
  nbChambre: {
    type: Number,
  },
  email: {
    type: String,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
