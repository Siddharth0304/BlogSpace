const User = require("../models/user");

module.exports.renderSignUp=(req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
                
            }
            req.flash("success","User registered");
            res.redirect("/blogs");
        })        
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to BlogSpace");
    req.session.cart = req.session.tempCart;
    delete req.session.tempCart;
    let redirectUrl=res.locals.redirectUrl || "/blogs";
    res.redirect(redirectUrl);        
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        //res.send(err);
        }
        req.flash("success","You are logged out.");
        res.redirect("/blogs");
    }) 
};