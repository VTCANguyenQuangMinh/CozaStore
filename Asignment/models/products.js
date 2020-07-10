const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product =  new Schema({
    name: {type:String,
        required:[true, 'name is require'],
        unique:[true],
    },
    price: {type: Number,
        min: [0, 'price cannot be negative'],
        required:[true, 'price is require'],
    },
    description: String,
    size: [{
        sizeName: String,
        quantity: {
            type:Number,
            min: [0, 'Quantity cannot be negative'],
            required:[true, 'Quantity is require'],
        }
    }],
    color: [{
        colorName: String,
        quantity: {
            type:Number,
            min: [0, 'Quantity cannot be negative'],
            required:[true, 'Quantity is require'],
        }
    }],
    status: {
        type: String,
        enum: ['active', 'deactive'],
        require: [true]
      },
    imgLink: [String],
    categories: [String]
});

product.statics.getAllProductsManagers = function(cb){
    return this.model('Product').find({}, cb)
}

product.statics.getAllProducts = function(cb){
    return this.model('Product').find({status:'active'}, cb)
}

product.statics.findProductByName = function(Name, cb){
    return this.model('Product').find({name:Name, status:'active'}).exec(cb);
}

product.statics.findProductByID = function(ID, cb){
    return this.model('Product').findOne({_id:ID}).exec(cb);
}

product.statics.findProductByIDCus = function(ID, cb){
    return this.model('Product').findOne({_id:ID, status:'active'}).exec(cb);
}

product.statics.getProducts = function(sl, cb){
    return this.model('Product').find({status:'active'})
    .limit(sl)
    .exec(cb);
}

const Product = mongoose.model('Product', product);
module.exports = Product;