const Joi = require("joi");
const mongoose = require("mongoose");


const gateSchema = mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required:true
    },
    dateOfPass: {
        type: Date,
        default: Date.now,
    },
});


const Gate = mongoose.model("Gate", gateSchema);
module.exports.Gate = Gate;
