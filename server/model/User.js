const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profilePic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      Role3: {
        type: Number,
        default: 3,
      },
      Role2: Number,
      Role1: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
