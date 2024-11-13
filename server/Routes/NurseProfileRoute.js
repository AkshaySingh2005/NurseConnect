import express from 'express';
import NurseProfile from '../models/NurseProfileModal.js';

const router = express.Router();

router.post('/nurseSignUp', async (req, res) => {
    try{
        const newPrfoile = new NurseProfile(req.body);
        const profile = await newPrfoile.save();
        res.status(201).json(newPrfoile);
        console.log('New profile created:', profile);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default router;