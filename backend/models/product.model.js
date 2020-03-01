const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {type:String, required:true},
    productPrice: {type:Number, required:true},
    productCategory: {type:String, required:true},
},{
    timestamps:true,
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;