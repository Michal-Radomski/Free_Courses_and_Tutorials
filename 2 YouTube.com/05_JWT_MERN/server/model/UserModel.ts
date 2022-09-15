import mongoose, { Schema } from "mongoose";
const bcrypt = require("bcrypt");
import validator from "validator";

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 8,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // console.log("this:", this);
  // console.log({ user });
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    // console.log({ user });
    const auth: boolean = await bcrypt.compare(password, user.password);
    // console.log({ auth });
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
