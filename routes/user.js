const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {validateReview ,saveRedirectUrl, isLoggedIn}=require("../middleware.js");
const User = require("../models/user.js");
const userController=require("../controllers/user.js");

router.route("/signup")
    .get(userController.renderSignUp)
    .post(userController.signUp)

router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash:true}),userController.login)

router.get("/logout",userController.logout);

module.exports=router;
