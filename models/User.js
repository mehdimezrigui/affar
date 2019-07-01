const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 firstName: {
        type: String,
        required: true
      },
 lastName: {
          type: String,
          required: true
      },
  // avatar: {
  //   type: String,
  //   required: true
  // },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  cp: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
})

module.exports = User = mongoose.model("users", UserSchema);