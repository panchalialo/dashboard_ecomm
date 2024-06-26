const express = require("express");
const cors = require("cors");
require("./db/config");
const multer = require("multer");
const path = require("path");
const userData = require("./db/usersSchema");
const productData = require("./db/productsSchema");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "images")));

//verify token middleware
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log("verifyToken", token);
  } else {
  }
  console.log("verifyToken", token);
  next();
};

//Sign up
app.post("/signup", async (req, res) => {
  let user = new userData(req.body);
  let userEmail = await userData.findOne({ email: user.email });
  if (userEmail) {
    res.status(500).json({ error: "Failed to upload file" });
  } else {
    let signUpUser = await user.save();
    signUpUser = signUpUser.toObject();

    delete signUpUser.password;
    jwt.sign({ signUpUser }, jwtKey, { expiresIn: "2hr" }, (err, token) => {
      if (err) {
        res.send("something went wrong");
      }
      res.send({ signUpUser, authToken: token });
    });
  }
});

//login
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await userData.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2hr" }, (err, token) => {
        if (err) {
          res.send("something went wrong");
        }
        res.send({ user, authToken: token });
      });
    } else {
      res.status(500).json({ error: "Failed to upload file" });
    }
  } else {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

//Product create

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

app.post("/add-product", upload.single("file"), async (req, res) => {
  const { name, price, brand, userId } = req.body;
  const newProductData = new productData({
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    name,
    brand,
    price,
    userId,
  });
  if (newProductData) {
    try {
      await newProductData.save();
      // console.log(newProductData.fileName);
      res.send({ message: "File uploaded successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  } else {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

//show Products
app.get("/products", async (req, res) => {
  let products = await productData.find();
  if (productData.length > 0) {
    res.json(products);
  } else {
    res.send("No product found");
  }
});

//Delete Product
app.delete("/products/:id", async (req, res) => {
  const result = await productData.deleteOne({ _id: req.params.id });
  res.send(result);
});

//Edit Products
app.get("/products/:id", async (req, res) => {
  let result = await productData.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});

//update Product
app.put("/products/:id", async (req, res) => {
  let result = await productData.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

//Search Product
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await productData.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

//listening port
app.listen(5000, () => {
  console.log("server is listening on 5000 port");
});
