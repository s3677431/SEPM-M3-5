const db = require('../models')
const bcrypt=require('bcrypt');
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken');
const { request } = require('express');
const StaffManager = db.manager;
const Shift = db.shift;

createShift=(req,res,next)=>{
    const user_id = req.session.user_id;
   var date = new Date().toLocaleDateString("en-US");
   var result = new Date(date + " " + req.body.start_time);
   console.log(result);
    const _shift=new Shift({
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        assigned_date:Date.now(),
        status:req.body.status,
        assigned_by:user_id
    })
    _shift.save((err,shift)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            res.status(200).send({message:"shift has been created successfully"})
        }
    })
}

signUp = (req,res,err)=>{
    const _staffmanager = new StaffManager({
        fullname:req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password,8)
    })
    _staffmanager.save((err,manager)=>{
       if(err){
           res.status(500).send({message:err})
           return
       }
       else{
           res.status(200).send({
               message:"manager inserted successfully"
           })
       }
    })
    
}

signIn=(req,res,next)=>{
    StaffManager.findOne({email:req.body.email}).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
           return res.status(404).send({message:"user not found"});
        }
        const passwordIsValid= bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            return res.status(404).send({
                accessToken:null,
                message:"Inavlid password"})
        }
        token = jwt.sign({id:user.id},config.secret,{expiresIn:86400})
        req.session.save(()=>{
            req.session.user_id=user.id;
            req.session.manager_name=user.fullname;
            req.session.isLoggedIn = true;
            req.session.isManager = true;
            res.status(200).send({message:"you are successfully logged in!"})
        })

      

    })
}

const managerCont = { signUp,signIn,createShift}
module.exports = managerCont;