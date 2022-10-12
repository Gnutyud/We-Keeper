const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    default: 'Employee'
  }],
  active: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;