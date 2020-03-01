const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    productCategoryName: {type:String, required:true}
},{
    timestamps:true,
})

const ProductCategory = mongoose.model('ProductCategory',productCategorySchema);

module.exports = ProductCategory