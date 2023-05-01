const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    org_name:{type:String},
    org_description: {type: String},
    org_users:[{type:mongoose.Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model('Org', orgSchema);