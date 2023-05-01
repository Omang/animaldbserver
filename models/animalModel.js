const mongoose = require('mongoose');


const animalSchema = new mongoose.Schema({

    animal_name:{type:String, required:true},
    animal_chip:{type:String, required: true},
    animal_breed:{type:String , required:true},
    animal_type:{type:String, required:true},
    animal_color:{type:String, required: true},
    animal_sex:{type:String},
    animal_owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    vaccinationdata:[{type: mongoose.Schema.Types.ObjectId, ref: "Vaccination"}]

}, {timestamps:true});

module.exports = mongoose.model('Animal', animalSchema);