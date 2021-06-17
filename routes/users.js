const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require("lodash");


router.get('/',async (req,res)=>{
    const userlist = await User.find();  
    if(!userlist){
        res.status(500).json({
            success: false
        })
    }
    res.send(userlist);
})

router.get('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invaild ID')
    }

    const user = await User.findById(req.params.id)
    if(!user){
        res.status(500).json({
            success: false,
            message: 'the user with given ID was not found'
        })
    }
    res.status(200).send(user);
})

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        position: req.body.position,
        age: req.body.age,
    })
    
    user = await user.save();
    if (!user) {
        return res.status(404).send("the user cannot be created!");
    }
    return res.status(201).send({ message: 'new user created', data: user });    
});

router.patch('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send({ message:'Invaild ID'})
    }
    
    const user = await User.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["name", "position", "age"]),      
        {new: true}
    );

    if (!user) {
        return res.status(404).send({message:"the user cannot be updated!"});
    }
    res.send(user);
})

router.delete('/:id',  async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send({ message:'Invaild ID'})
    }

    const user = await User.findByIdAndRemove(req.params.id)
    if(!user){
        res.status(500).json({
            success: false,
            message: 'the user with given ID was not found'
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'user is deleted'
        });
    }
    
})

module.exports = router;