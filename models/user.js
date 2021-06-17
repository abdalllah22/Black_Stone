const Joi = require("joi");
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    position: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    age: {
        type: Number,
        required: true,
        min: 20,
        max: 60,
    },


});


const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        position: Joi.string().min(3).max(50).required(),
        age: Joi.number().min(20).max(60).required(),
    });
    return schema.validate(user);
}


module.exports.User = User;
module.exports.validate = validateUser;
