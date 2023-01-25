const mongoose = require("mongoose");
const AddressModel = require("./AddressModel");
const CompanyModel = require("./CompanyModel");

const UserModel = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address: AddressModel.schema,
    phone: String,
    website: String,
    company: CompanyModel.schema
},
    {
        timestamps: true
    });
module.exports = mongoose.model('User', UserModel);
