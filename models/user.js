const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/jwttestapp");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  password: String,
});
const User = mongoose.model("user", userSchema);
module.exports = User;
