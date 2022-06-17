const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  address: {
    type: String,
  },
  age: {
    type: String,
  },last_name: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Estudiante", userSchema);
