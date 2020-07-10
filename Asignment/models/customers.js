const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./db.js');
const Schema = mongoose.Schema;


const customerSchema =  new Schema({
    name: {type:String,
        required:[true, 'name is required'],
    },
    email: {
        type:String,
        required:[true,'email is required'],
        unique:[true, 'email must be unique']
    },
    address:[String],
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    cart:[{
        productID:String,
        quantity: {
            type:Number,
            min: [0, 'Quantity cannot be negative']
        },
        size:String,
        color:String
    }],
    wishlish:[String],
});


customerSchema.statics.findAll = function( cb){
    return this.model('Customers').find({}, cb)
}

customerSchema.statics.findCustomerByID = function(id, cb){
    return this.model('Customers').findOne({_id:id}, cb)
}

module.exports = mongoose.model('Customers', customerSchema);