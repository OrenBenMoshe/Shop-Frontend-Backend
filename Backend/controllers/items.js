const Schemas = require("../models/Schemas.js");

exports.findAllItems = async (req,res)=>{
    const items = Schemas.Items;
    items.find({},(err,data)=>{
        if(err){
            console.log("error: ", err);
        }
        else{
            res.end(JSON.stringify(data));
        }
    })
}