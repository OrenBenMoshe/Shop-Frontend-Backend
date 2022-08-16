const Schemas = require("../models/Schemas.js");

exports.findAllUsers = async(req, res)=>{
    await Schemas.Users.find({})
     .then((data)=>{
         res.json(data);
     }).catch((error)=>{
         console.log(error);
     })
 }

 exports.saveUser =  async(req,res) =>{
     const userData = req.body.data;
    try{
        const temp = await Schemas.Users.findOne({name: userData.username});
        console.log("temp :" , temp);
        if(temp){
            console.log("user exists");
            res.json({
                msg: "this username already exist"
            })
            return;
        }else{
            const newUser = await new Schemas.Users({name: userData.username, password: userData.password})
            await newUser.save();
            res.json({
                msg: "user register successfully",
                username: userData.username
            })
    }
    }catch(error){
        console.log(error.message);
    }
    // res.end("data saved")
}

exports.findUser = async(req,res)=>{
    try{
        const userData = req.body.data;
        const currUser = await Schemas.Users.findOne({name: userData.username});
        console.log("current user: ",currUser);
        
        if( currUser === null){
            console.log("user does not exists");
            res.json({
                msg: "user does not exists"});
            return;
        }else{
            if(currUser.password == userData.password){
                console.log(currUser.password);
                res.json({
                    msg: "user connected successfully",
                    username: currUser.name
                })  
            }else{
                res.json({
                    msg: "the password is incorrect"
                })
            }
        }
    }catch(error){
        console.log(error.message);
    }
}