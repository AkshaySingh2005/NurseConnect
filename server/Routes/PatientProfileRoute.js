import express from 'express';
import PatientProfile from '../models/PatientProfileModal.js';

const router = express.Router();

router.post('/patientSignUp', async (req, res) => {
    try{
        const newPrfoile = new PatientProfile(req.body);
        const profile = await newPrfoile.save();
        res.status(201).json(newPrfoile);
        console.log('New profile created:', profile);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default router;