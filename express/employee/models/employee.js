const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    name : String,
    salary : Number,
    position : String
});

module.exports = mongoose.model('Employee',employeeSchema);