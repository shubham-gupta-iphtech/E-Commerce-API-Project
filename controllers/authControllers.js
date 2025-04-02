import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

const registerUser = async (req,res) => {
    const {name,email,password,role} = req.body;
    
   try {
     const userExist = await User.findOne({email});
     if(userExist)
     {
         return res.json({message: "User already exist."});
     }
     const user = await User.create({name, email, password, role});
     res.status(201).json({message: "User created successfully"});
     
   } catch (error) {
      res.status(500).json({message: error.message});
   }
};


const loginUser = async (req,res) => {
  const {email, password} = req.body;
        
    try {
        if(!(email || password)) return res.json({message: "Either email or password is missing"});
     
        const user = await User.findOne({email});
        
        if(!user)
        {
          console.log("user not found");
        }
        else {
          console.log(user.name);
          console.log(user.email);
          const isMatch = await bcrypt.compare(password, user.password);
          user.comparePassword(password);
          if(isMatch)
          {
                 res.json({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 role: user.role,
                 token: generateToken(user._id)
               })
       
        }
        
        
        
      }
    } catch(error) {
      res.status(500).json({message: error.message});
    }
}
    
export {registerUser, loginUser };