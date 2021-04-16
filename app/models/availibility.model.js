const mongoose = require('mongoose');

const Availability = mongoose.model(
    "Availibilty",
    new mongoose.Schema({
        start_time:String,
        end_time:String,
        created_at:Date,
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'Staff'}
    })
)

module.exports = Availability