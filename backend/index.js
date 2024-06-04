const express = require("express");
const cors = require("cors");
require("./db/config");
const userData = require("./db/usersSchema");
const productData = require("./db/productsSchema");

const app = express();

app.use(express.json());
app.use(cors());

//Sign up
app.post("/signup", async (req, res) => {
  let user = new userData(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

//login
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await userData.findOne(req.body);
    if (user) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  } else {
    res.send("user not found");
  }
});

//Product create
app.post("/add-product", async (req, res) => {
  let product = new productData(req.body);
  let result = await product.save();
  res.send(result);
});

app.listen(5000, () => {
  console.log("server is listening on 5000 port");
});
