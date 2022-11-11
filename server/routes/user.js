const { validate, User } = require("../models/user");

const router=require("express").Router();
const bcrypt=require("bcrypt")

router.post("/",async(req,res)=>{
    try {
        
        const{error}=validate(req.body)
        if (error) {
            return res.status(400).send({message:error.details[0].message})

        }
        user=await User.findOne({email:req.body.email})

        if (user) {
            return res.status(409).send({message:"user with given mail allready exist"})
        }
        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword=bcrypt.hash(req.body.password,salt)
        await new User({...req.body,password:hashedPassword}).save()
        res.status(201).send({message:"user created successfully"})
    } catch (error) {
        res.status(500).send({message:"internal server error occured"})
    }


})



module.exports=router