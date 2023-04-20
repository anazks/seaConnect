const mongoose = require('mongoose');


const JurneyModel = new mongoose.Schema({
    Boatname: {
        type: String,
        required: [true, "Must Provide name"],
    }, 
    to: {
        type: String,
        required: [true, "Must Provide to"],
    },
   from: {
        type: String,
        required: [true, "Must Provide from"],
    },
    employee: {
        type: String,
        required: [true, "Must Provide emp"],
    },
    Time: {
        type: String,
        required: [true, "Must Provide time"],
    },
    Date: {
        type: String,
        required: [true, "Must Provide date"],
    },
    Seat: {
        type: String,
        required: [true, "Must Provide seat"],
    },
    rate: {
        type: String,
        required: [true, "Must Provide seat"],
    }
})

module.exports = mongoose.model('JurneyModel', JurneyModel);