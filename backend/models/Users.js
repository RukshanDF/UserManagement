const mongoose = require("mongoose");
const validateEmail = require("../utils/emailValidate");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Please enter a valid email"],
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  opportunities: {
    type: Array,
  },
});

module.exports = mongoose.model("User", usersSchema);
