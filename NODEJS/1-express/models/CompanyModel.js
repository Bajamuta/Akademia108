const mongoose = require("mongoose");

const CompanyModel = new mongoose.Schema({
    name: String,
    catchPhrase: String,
    bs: String
});

module.exports = mongoose.model('Company', CompanyModel);
