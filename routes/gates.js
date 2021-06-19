const { Gate } = require('../models/gate');
const { Car } = require('../models/car')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require("lodash");


router.get('/',async (req,res)=>{
    const passgatelist = await Gate.find().populate('car').populate({path:'car', populate:'employee'})
    if(!passgatelist){
        res.status(500).json({
            success: false
        })
    }
    res.send(passgatelist);
})

router.get('/:id', async (req, res) =>{
    const passgate = await Gate.findById(req.params.id).populate('car').populate({path:'car', populate:'employee'})
    if(!passgate) {
        res.status(500).json({success: false})
    } 
    res.send(passgate);
})


// Develop an API that simulates passing through the highway gate (by car ID) and returns remaining balance in the card.
router.post('/', async (req,res)=>{
    let passgate = new Gate({
        car: req.body.car,
        dateOfPass: Date.now(),
    })

    passgate = await passgate.save();
    
    
    const passgatelatest = await Gate.find({car: passgate.car._id}).sort({ _id: -1 }).limit(2)
    
    let dateOfPassArray = passgatelatest.map(a => a.dateOfPass);
    dateOfPassArray.sort(function(a, b) {
        var dateA = new Date(a.release), dateB = new Date(b.release);
        return dateA - dateB;
    });
    
    let resultInMinutes = Math.round((dateOfPassArray[0] - dateOfPassArray[1]) / 60000);
    console.log(dateOfPassArray[1])
    console.log(dateOfPassArray[0])
    console.log(resultInMinutes)

    if(resultInMinutes === 0){
        let x = await Car.findById(passgate.car._id);
        await Car.findByIdAndUpdate(
            passgate.car._id,
            {
                card : x.card 
            }
        );
    }else{
        let x = await Car.findById(passgate.car._id);
        await Car.findByIdAndUpdate(
            passgate.car._id,
            {
                card : x.card - x.priceOfPass
            }
        );
    }
    
    
    
    
    if (!passgate) {
        return res.status(404).send("the pass from  gate cannot be created!");
    }
    return res.status(201).send({ message: 'car pass gate', data: passgate });    
});



module.exports = router;
