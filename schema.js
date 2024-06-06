const Joi=require("joi");

module.exports.blogSchema=Joi.object({
    blog : Joi.object({
        title:Joi.string().required(),
        content: Joi.string().required(),
        
    }).required()
})