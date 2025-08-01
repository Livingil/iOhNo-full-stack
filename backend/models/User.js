const mongoose = require("mongoose");
const validator = require("validator");
const roles = require("../constants/roles");

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
      default:
        "https://abrakadabra.fun/uploads/posts/2022-03/1646346868_4-abrakadabra-fun-p-standartnaya-avatarka-standoff-13.png",
    },
    password: {
      type: String,
      required: true,
    },
    role_id: {
      type: String,
      default: roles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
