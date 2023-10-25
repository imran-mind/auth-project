const Joi =  require('joi');

const userRegisterValidation = (req,res,next)=>{
    const schema = Joi.object({
        fullName: Joi.string().min(1).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(4).required()
    });
    const {error, value} = schema.validate(req.body);
    if(error){
        return res.status(400).json({error, message: 'Bad Request'})
    }
    return next();
}

const userLoginValidation = (req,res,next)=>{
    console.log("login validation: ",req.body)
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(4).required()
    });
    const {error, value} = schema.validate(req.body);
    if(error){
        return res.status(400).json({error, message: 'Bad Request'})
    }
    return next();
} 


module.exports = {
    userRegisterValidation,
    userLoginValidation
};
