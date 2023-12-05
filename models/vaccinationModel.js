const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({

    disease_name:{type: String},
    vaccinated:{type:String},
    by_name:{type: String},
    at_name:{type: String},
    vaccinated_on:{type:String},
    next_vaccination:{type: String}
},{timestamps:true});

module.exports = mongoose.model('Vaccination', vaccinationSchema);