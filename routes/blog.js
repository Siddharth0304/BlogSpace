const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateBlog, saveRedirectUrl, isLoggedIn ,isQuery,isblogAuthor} = require('../middleware');
const User = require('../models/user');
const Blog = require('../models/blog');
const blogController=require("../controllers/blog")

router.get('/home',blogController.renderHome);

router.route('/blogs')
    .get(isLoggedIn,isQuery,wrapAsync(blogController.allBlogs))
    .post(isLoggedIn,validateBlog,wrapAsync(blogController.createBlog));

router.get('/blogs/new',isQuery,blogController.newBlog);

router.route('/blogs/:id')
    .get(isLoggedIn,isQuery,wrapAsync(blogController.singleBlog))
    .put(isLoggedIn,isblogAuthor,validateBlog,wrapAsync(blogController.edit))
    .delete(isLoggedIn,isblogAuthor,wrapAsync(blogController.deleteBlog));

router.get('/blogs/:id/edit',isLoggedIn,isQuery,wrapAsync(blogController.renderEditForm));

module.exports = router;
