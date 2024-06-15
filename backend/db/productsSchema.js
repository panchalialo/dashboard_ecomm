const mongoose = require("mongoose")

const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    imageUrl: String,
    userId:String
})

module.exports = mongoose.model("products", productsSchema);