const UsersModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginErrorResponse = (res)=>{
    res.status(401).json({ message:
        'Authentication failed. Invalid user or password.' });
}
module.exports = {
    //create user schema
    //encrypt password
    //save data
    registerUser : async (req,res)=>{
        const userModel = new UsersModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try{
            const response = await userModel.save();
            response.password = undefined;
            return res.status(200).json(response);
        }catch(err){
            return res.status(400).send({message: err});
        }
    },

    loginUser: async (req,res)=>{
        //check user using email
        //compare password
        //create jwt token 
        //send resposne to client
        try{
            const user = await UsersModel.findOne({email: req.body.email});
            console.log('user ',user);
            if(!user)
                return loginErrorResponse(res);
            
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if(!isEqual)
                return loginErrorResponse(res);
            const tokenObject ={
                email: user.email,fullName: user.fullName,_id: user._id
            }
            const jwtToken = jwt.sign(tokenObject,process.env.SECRET,{ expiresIn: '4h' });
            res.status(200).json({ token: jwtToken, user: tokenObject});
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Internal server error",error: err});
        }
        
    },

    getUsers: async (req,res)=>{
        console.log('req.userInfo ',req.userInfo);
        const users = await UsersModel.find({},{password:0});
        res.status(200).json({data:users});
    }
}