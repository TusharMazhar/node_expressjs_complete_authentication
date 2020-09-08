const express=require('express')
const User=require('../model/User')
const bcrypt=require('bcryptjs')
const {registerValidation,loginValidation}=require('../validation')
const router=express.Router();

router.post('/register',async(req,res)=>{

    const{error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const emailExists= await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send('Email Exists,Try differnet email address')
    const salt= await bcrypt.genSalt(12);
    const hashPassword= await bcrypt.hash(req.body.password,salt)


    const user=new User({

        name:req.body.name,
        email:req.body.email,
        password:hashPassword


    });
    try{

        const userData=await user.save()
        //res.status(201).send({user:user._id})
        res.send("New User Created Successfully!")

    }catch(err){

        res.status(400).send('User Registration failed')

    }

});




router.post('/login',async(req,res)=>{
    const{error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const emailExists= await User.findOne({email:req.body.email})
    if(!emailExists) return res.status(400).send('Email  not Found')
    const validPass=await bcrypt.compare(req.body.password,emailExists.password)
    if(!validPass) return res.status(400).send('Password  is wrong')


    res.status(201).send(" welcome to this portal")


});


module.exports=router;