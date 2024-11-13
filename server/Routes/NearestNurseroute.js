import express from 'express';
import NearestNurseController from '../Controllers/NearestNurseController.js'
const router = express.Router();

router.post('/findNearestNurse',NearestNurseController);

export default router;