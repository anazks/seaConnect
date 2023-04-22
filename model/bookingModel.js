const mongoose = require('mongoose');


const bookingModel = new mongoose.Schema({
    tickets: {
        type: String,
        required: [true, "Must Provide ticket"],
    }, 
    availableSeat: {
        type: String,
        required: [true, "Must Provide availableSeat"],
    },
    jurneyId: {
        type: String,
        required: [true, "Must Provide jurneyId"],
    },
    userId: {
        type: String,
        required: [true, "Must Provide userId"],
    },
    userName: {
        type: String,
        required: [true, "Must Provide userName"],
    },
    status: {
        type: String,
        required: [true, "Must Provide status"],
        default:"pending"
    },
    payment: {
        type: String,
        required: [true, "Must Provide payment"],
        default:"notpayed"
    },

})

module.exports = mongoose.model('bookingModel', bookingModel);  