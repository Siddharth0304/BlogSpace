const Blog = require("./models/blog");
const { blogSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.session.tempCart = req.session.cart;
        req.flash("error","You must me logged in.");
        res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.validateBlog=(req,res,next)=>{
    let {error}=blogSchema.validate(req.body);
    if(error){
        let erMsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,error);
    }
    next();
}


module.exports.isblogAuthor=async(req,res,next)=>{
    let {id}=req.params;
    let blog=await Blog.findById(id);
    if(res.locals.curruser && !blog.author._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/blogs/${id}`);
    }
    next();
}


module.exports.isQuery = async (req, res, next) => {
    let fin = req.query.item;
    if(fin && fin.length>0){
        try{
            const capitalized=fin.charAt(0).toUpperCase()+fin.slice(1);
            let bl=await Blog.find({title:{$regex:capitalized,$options:'i'}});
            if(bl.length>0){
                return res.render("blog/search.ejs", { bl });               
            } 
            else{
                req.flash("error","No blogs found");   
                return res.redirect("/blogs");         
            }
        } 
        catch(error){
            console.error(error);
            req.flash("error", "An error occurred while searching for item");
            return res.redirect("/blogs");
        }
    } 
    next();
}