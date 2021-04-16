const mongoose = require('mongoose');

const Shift = mongoose.model(
    "Shift",
    new mongoose.Schema({
        start_time:String,
        end_time:String,
        assigned_date:Date,
        status:String,
        assigned_by:{type:mongoose.Schema.Types.ObjectId,ref:'Manager'},
        availability_id:{type:mongoose.Schema.Types.ObjectId,ref:'Availibilty'}
    })
)

module.exports = Shift