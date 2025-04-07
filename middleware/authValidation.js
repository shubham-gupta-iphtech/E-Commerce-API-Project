import { body } from "express-validator"
    
const registerValidation = 
[
    body('email').isEmail().withMessage('Invalid email'),
    body('name').notEmpty().withMessage('Please provide name'),
    body('password').isLength({ min: 6 }).withMessage('Password too short'),
    body('role').trim().toLowerCase().isIn(['admin','customer']).withMessage('invalid role. Must be an admin or customer'),
]   

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
   

export {registerValidation, loginValidation};