const mongoose = require('mongoose');

const profileSchmema=new mongoose.Schema({
    gender:{
        type:String,
        trim:true,
    },
    dateOfBirth:{
        type:Date,
    },
    phoneNumber:{
        type:Number,
        trim:true,
    },
    about:{
        type:String,
    },
});

module.exports=mongoose.model("Profile",profileSchmema);