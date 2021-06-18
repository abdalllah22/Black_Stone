const Joi = require("joi");
const mongoose = require("mongoose");


const gateSchema = mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required:true
    },
    totalPrice: {
        type: Number,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOfPass: {
        type: Date,
        default: Date.now,
    },
});


const Gate = mongoose.model("Gate", gateSchema);
module.exports.Gate = Gate;
