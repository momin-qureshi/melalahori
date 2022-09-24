const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  locationId: {
    type: "ObjectId",
    required: true,
  },
  path: String,
});

const Image = (module.exports = mongoose.model("Image", ImageSchema));
