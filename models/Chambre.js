const mongoose = require("mongoose");

const chambreSchema = new mongoose.Schema({
  numero: {
    type: Number,
  },
  hotel: {
    type: String,
  },
  reservee: {
    type: String,
  },
  nom_client: {
    type: String,
  },
});

const Chambre = mongoose.model("Chambre", chambreSchema);
module.exports = Chambre;
