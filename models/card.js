const Joi = require("joi");
const mongoose = require("mongoose");


const cardSchema = mongoose.Schema({
    noOfPasses: {
        type: Number,
        required: true,
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
});


const Card = mongoose.model("Card", cardSchema);



module.exports.Card = Card;
