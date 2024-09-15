const express = require("express");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, age, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await User.create({
        username,
        email,
        age,
        password: hash,
      });

      let token = jwt.sign({ email }, "shshhshsh");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Something went wrong");
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) res.send("Yes You can login your account");
    else res.send("Something went wrong ");
  });
});

app.listen(3000);
