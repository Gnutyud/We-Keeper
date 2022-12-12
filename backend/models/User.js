const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    roles: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
