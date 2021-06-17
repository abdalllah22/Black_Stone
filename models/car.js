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
        minlength: 4,
        maxlength: 5,
    },
    card: {
        type: Number,
        required: true,
        default: 10,
    },
    passAt:{ 
        type: Date,
        default: Date.now(),
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


});


const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        position: Joi.string().min(3).max(50).required(),
        age: Joi.number().min(20).max(60).required(),
    });
    return schema.validate(car);
}

function validateEditCar(car) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        position: Joi.string().min(3).max(50).required(),
        age: Joi.number().min(20).max(60).required(),
    });
    return schema.validate(car);
}

module.exports.Car = Car;
module.exports.validate = validateCar;
module.exports.editValidate = validateEditCar;