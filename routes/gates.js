const { Gate } = require('../models/gate');
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

router.post('/', async (req,res)=>{
    
    let passgate = new Gate({
        car: req.body.car,
        dateOfPass: Date.now(),
        
    })
    
    passgate = await passgate.save();
    if (!passgate) {
        return res.status(404).send("the pass from  gate cannot be created!");
    }
    return res.status(201).send({ message: 'car pass gate', data: passgate });    
});



module.exports = router;
