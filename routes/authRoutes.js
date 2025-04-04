import express from "express";
import { registerUser, loginUser } from '../controllers/authControllers.js';
import validate from '../middleware/validate.js'; 
import {registerValidation, loginValidation} from '../middleware/authValidation.js'

const router = express.Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
    
export default router;