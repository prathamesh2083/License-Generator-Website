const mongoose=require("mongoose");

const resultSchema=new mongoose.Schema({
    email:{
        type:"String",
        reqired:true
    },
    correct:{
        type:Number,
        required:true
    },
    attempted:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,

    }

});
module.exports = mongoose.model("Result", resultSchema);