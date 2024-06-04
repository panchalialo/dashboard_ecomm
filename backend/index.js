const express = require("express");
const cors = require("cors");
require("./db/config");
const multer = require("multer");
const path = require("path");
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
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
  const { name, price, brand } = req.body;
  const newProductData = new productData({
    fileName: req.file.filename,
    filePath: req.file.path,
    name,
    brand,
    price,
  });

  try {
    await newProductData.save();
    console.log(newProductData.filePath)
    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.listen(5000, () => {
  console.log("server is listening on 5000 port");
});
