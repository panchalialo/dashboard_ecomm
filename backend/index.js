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
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedFileType = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileType.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
});

app.post("/add-product", upload.single("image"), async (req, res) => {
  // const name = req.body.name;
  // const price = req.body.price;
  // const brand = req.body.brand;
  // const image = req.file.fieldname;

  // const newProductData = {
  //   name, price, brand, image
  // }

  // let product = new productData(newProductData);
  // let result = await product.save();
  // res.send(result);
  console.log(req.body);
  console.log(req.file);
});

app.listen(5000, () => {
  console.log("server is listening on 5000 port");
});
