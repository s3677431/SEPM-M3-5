const db = require('../models')
const bcrypt=require('bcrypt');
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')
const StaffUser = db.staff;
const Availability = db.availbilty;

getProfileData=(req,res)=>{
    StaffUser.find({_id:req.session.user_id },(err,user)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            const userData = user[0];
            const {fullname,email,phone,address}=userData
            res.render('edit-profile', { fullname,email,phone,address , isManager:req.session.isManager})
        }
    })
}


signUp = (req,res,err)=>{
    const _staff = new StaffUser({
        fullname:req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password,8),
        hours_limit:req.body.hours_limit,
        added_by:req.session.user_id
    })
    _staff.save((err,manager)=>{
       if(err){
           res.status(500).send({message:err})
           return
       }
       else{
           res.status(200).send({
               message:"staff member inserted successfully"
           })
       }
    })
    
}

signIn=(req,res,next)=>{
    StaffUser.findOne({email:req.body.email}).exec((err,user)=>{
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
            req.session.user_id = user.id;
            req.session.username = user.fullname;
            req.session.isLoggedIn = true;
            req.session.isManager = false;
            res.status(200).send({
                id:user.id,
                fullname:user.fullname,
                email:user.email,
                accessToken:token,
                message:"successfully logged in!"
            })
        })
    })
}
updateProfile=(req,res,next)=>{
    const user_id = req.session.user_id;

    const updateData={
        fullname:req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
    }

    StaffUser.findOneAndUpdate({_id:user_id},updateData,(error,result)=>{
        if(error){
            res.status(500).send({message:error})
        }
        else{
            res.status(200).send({message:'your information updated successfully'})
        }
    })
}
createAvailability = (req,res,next)=>{
const _availibility = new Availability({
    start_time:req.body.start_time,
    end_time:req.body.end_time,
    created_at:Date.now(),
    user_id:req.session.user_id
})
_availibility.save((err,availibility)=>{
    if(err){
        res.status(500).send({message:err})
        return
    }
    else{
        res.status(200).send({
            message:"Your availability slot added successfully"
        })
    }
 })
}
const staffCont = { signUp,signIn,createAvailability,updateProfile,getProfileData}
module.exports = staffCont;