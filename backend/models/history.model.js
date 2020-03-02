const mongoose = require('mongoose')

const Schema = mongoose.Schema

const historySchema = new Schema({
    customerName:{type:String, required:true},
    totalAmount:{type:Number, required:true},
    productHistory:{type:Array, required:true}
},{
    timestamps:true,
})

const History = mongoose.model('History',historySchema);

module.exports = History;