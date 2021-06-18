const { Car } = require('../models/car');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require("lodash");

router.get('/',async (req,res)=>{
    const carlist = await Car.find().populate('employee','name');  
    if(!carlist){
        res.status(500).json({
            success: false
        })
    }
    res.send(carlist);
})

router.get('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invaild ID')
    }

    const car = await Car.findById(req.params.id).populate('employee','name')
    if(!car){
        res.status(500).json({
            success: false,
            message: 'the car with given ID was not found'
        })
    }
    res.status(200).send(car);
})

router.post('/', async (req,res)=>{
    let car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        plateNo: req.body.plateNo,
        priceOfPass: 4,
        employee: req.body.employee,
        card: req.body.card
    })
    
    car = await car.save();
    if (!car) {
        return res.status(404).send("the car cannot be created!");
    }
    return res.status(201).send({ message: 'new car created', data: car });    
});

router.patch('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send({ message:'Invaild ID'})
    }
    
    const car = await Car.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["brand", "model", "plateNo","card"]),      
        {new: true}
    );

    if (!car) {
        return res.status(404).send({message:"the car cannot be updated!"});
    }
    res.send(car);
})

router.delete('/:id',  async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send({ message:'Invaild ID'})
    }

    const car = await Car.findByIdAndRemove(req.params.id)
    if(!car){
        res.status(500).json({
            success: false,
            message: 'the car with given ID was not found'
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'car is deleted'
        });
    }
    
})

module.exports = router;