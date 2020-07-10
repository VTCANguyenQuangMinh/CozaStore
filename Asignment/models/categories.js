const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./db.js');
const Schema = mongoose.Schema;


const categorySchema =  new Schema({
    name: {type:String,
        required:[true, 'name is require'],
    },
    description: String,
    
    status: {
        type: String,
        enum: ['active', 'deactive'],
        require: [true]
      },
});


categorySchema.statics.findAll = function( cb){
    return this.model('Categories').find({}, cb)
}

module.exports = mongoose.model('Categories', categorySchema);
