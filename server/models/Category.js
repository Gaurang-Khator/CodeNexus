const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
    categoryDescription:{
        type:String,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }]

});

module.exports=mongoose.model("Category",categorySchema);