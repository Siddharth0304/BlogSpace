const Blog = require("../models/blog");
const User = require("../models/user");


module.exports.renderHome=(req,res)=>{
    res.render("blog/home.ejs")
}

module.exports.allBlogs=async(req,res)=>{
    let allBlogs=await Blog.find().populate({path:'author'});
    res.render("blog/blog.ejs",{allBlogs});

}

module.exports.singleBlog=async(req,res)=>{
    let {id}=req.params;
    let blog=await Blog.findById(id);
    res.render("blog/show.ejs",{blog});
}

module.exports.newBlog=(req,res)=>{
    res.render("blog/new.ejs");
}

module.exports.createBlog=async(req,res)=>{
    let newBlog=new Blog(req.body.blog);
    newBlog.author=req.user._id;
    newBlog.date=Date.now();
    await newBlog.save();
    req.flash('success',"Blog Created");
    res.redirect("/blogs");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let blog=await Blog.findById(id);
    res.render("blog/edit.ejs",{blog});
}

module.exports.edit=async(req,res)=>{
    let {id}=req.params;
    let blog=await Blog.findByIdAndUpdate(id,{...req.body.blog});
    req.flash("success", "Blog Updated");
    res.redirect(`/blogs/${id}`);
}

module.exports.deleteBlog=async(req,res)=>{
    let {id}=req.params;
    let blog=await Blog.findByIdAndDelete(id);
    req.flash("success","Blog Deleted");
    res.redirect("/blogs");
}

