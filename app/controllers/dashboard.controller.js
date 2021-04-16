const { compareSync } = require('bcrypt');
const db = require('../models')
const StaffUser = db.staff;
const Shift = db.shift;
const Availability = db.availbilty;
dashboard=(req,res,next)=>{
    if(req.session.isManager){
        StaffUser.find({added_by:req.session.user_id}).lean().exec((err,staffDbData)=>{
            if(err){
                res.status(500).send({message:err})
            }
            else{
                Shift.find({assigned_by:req.session.user_id}).lean().exec((err,shiftDbData)=>{
                    if(err){
                        res.status(500).send({message:err});
                    }
                    else{
                        var shifts=shiftDbData.map(shift=>shift);
                        var staffs = staffDbData.map(staff=>staff);
                        res.render('dashboard',{ shifts , staffs , isManager:req.session.isManager});
                    }
                })
            }
        })
        
      
    }
    else{
        Availability.find({user_id:req.session.user_id}).lean().exec((err,dbSlotsData)=>{
            if(err){
                res.status(500).send({message:err})
            }
            else{
                var slots = dbSlotsData.map(slot=>slot);
                res.render('dashboard',{slots,isManager:req.session.isManager})
            }
        })
        
    }
    
}

const dashCont ={
    dashboard
}
module.exports=dashCont;