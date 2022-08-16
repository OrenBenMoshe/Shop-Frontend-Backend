const Schemas = require("../models/Schemas.js");    

exports.findAllPosts = async(req,res) =>{
    const posts = Schemas.Posts;
    posts.find({}, (err, data)=>{
        if(err){
            console.log("error: ", err);
        }
        else{
            res.end(JSON.stringify(data));
        }
    })
}

exports.findPost = async (req,res) =>{
    const posts =Schemas.Posts;
    const id = req.query.id
    try{
       const currentPost =  await posts.findOne({_id: id});
       if (currentPost){
           res.json({
               msg: "we found the post that you looking for",
               post: currentPost
           })
       }
    }
    catch(error){
        console.log(error);
    }
}

exports.editPost = async (req,res) =>{
    const posts  = Schemas.Posts;
    const id = req.body.id;
    const body = req.body.body;
    const date = req.body.date;
    const currPost = await posts.findOne({_id: id})
    try{
        currPost.body = body;
        currPost.date = date;
        await currPost.save();
        res.json({
            msg: `the post ${id} was change successfully`
        })
    }
    catch(error){
        console.log(error);
    }
}