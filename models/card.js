const Joi = require("joi");
const mongoose = require("mongoose");


const cardSchema = mongoose.Schema({
    total: {
        type: Number,
        required: true,
        default: 10,
    },
    passAt:{ 
        type: Date,
        default: Date.now(),
    },
});


const Card = mongoose.model("Card", cardSchema);



module.exports.Card = Card;
