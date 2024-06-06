const express=require("express");
const mongoose=require("mongoose");
const User = require("./user");
const Schema=mongoose.Schema;

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },    
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },  
    likes:{
        type:Number,
        default:0,
    },
    date:Date,  
})

const Blog=mongoose.model("Blog",blogSchema);
module.exports=Blog;