const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({
    
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number},
    gender:{type:String, trim:true},
    address:{
        plot_num:{type:String, default:"001"},
        street_map: {type:String}
    },
    owner_animals: [{type: mongoose.Schema.Types.ObjectId, ref: "Animal"}],
    created_by:{type:String},
    updated_by:{type:String},
    org:{type: mongoose.Schema.Types.ObjectId, ref:"Org"}

}, {timestamps:true});

module.exports = mongoose.model('Owner', ownerSchema);