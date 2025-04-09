const express = require('express');
const Patient= require('../models/patient');
const router= express.Router();
router.get('/' , async(req,res)=>{
    try{
        const patients = await Patient.find();
        res.status(200).json(patients );
    }catch(error){
        res.status(500).json({message : 'Server not found'});
    }
});