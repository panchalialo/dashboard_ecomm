const mongoose = require("mongoose")

const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    fileName: String,
  filePath: String,
    userId:String
})

module.exports = mongoose.model("products", productsSchema);