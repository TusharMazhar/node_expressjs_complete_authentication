const express=require('express')
const router=express.Router();
const verify=require('./verifyToken')

router.get('/post',verify,(req,res)=>{
    res.send(" hello Tushar")
})

module.exports=router;