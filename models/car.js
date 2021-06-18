const Joi = require("joi");
const mongoose = require("mongoose");


const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    model: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    plateNo: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 5,
    },
    priceOfPass : {
        type: Number,
        required: true,
        default:4
    },
});


const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
    const schema = Joi.object({
        brand: Joi.string().min(3).max(50).required(),
        position: Joi.string().min(3).max(50).required(),
        plateNo: Joi.string().min(4).max(5).required(),
    });
    return schema.validate(car);
}


module.exports.Car = Car;
module.exports.validate = validateCar;
