const Schemas = require("../models/Schemas.js");

exports.findCart = async(req, res)=>{
    console.log("find cart function accrue");
    console.log("req data cart get " ,req.query.user);
    try{
        const currUser = await Schemas.Users.findOne({name: req.query.user})
        if (currUser){
        res.json({
            msg: `the cart of user: ${currUser.name} was change`,
            cart: currUser.cart
        })
    }
    }catch(error){
        console.log(error);
    }
}

exports.updateCart = async (req, res)=>{
    try{
        console.log("req.body: ", req.body);
        const userDate = req.body.user;
        const itemData = req.body.item;
        // Get the logged in user 
        const currUser = await Schemas.Users.findOne({name: userDate});
        //Check if the item exist in the cart
        if(currUser.cart.some((x)=> x.id === itemData.id)){
            console.log("this item exist in the cart");
            // Find the item 
            const currItem = currUser.cart.find((x)=> x.id === itemData.id);
            const newQuantity = currItem.quantity + 1;
            //Update the new quantity of this item
            Schemas.Users.findOneAndUpdate({name: userDate,"cart.id": itemData.id},
                {
                    "$set":{
                        "cart.$.quantity": newQuantity
                    }
                },
                function (error, res){
                    if(error) console.log(error);
                    console.log(res);
                }
                )
            res.json({
                msg: `the ${itemData.name} quantity was change`,
                cart: currUser.cart
            })
        }
        else{
            console.log(`${itemData.name} was added to the cart`);
            currUser.cart.push(itemData)
            await currUser.save();
            res.json({
                msg: `${itemData.name} was added to the cart`,
                cart: currUser.cart
            })
        }
    }catch(error){
        console.log(error.message);
    }
}

exports.updateCartItemQuantity = async(req,res)=>{
    try{
        const userDate = req.body.user;
        const itemData = req.body.item;
        const action = req.body.action;
        
        const currUser = await Schemas.Users.findOne({name: userDate});
        const currItem = currUser.cart.find((x)=> x.id === itemData.id);
        console.log("the current item is: ", currItem);
        const currQuantity = currItem.quantity;
        if(action === "increase"){
            Schemas.Users.findOneAndUpdate({name: userDate,"cart.id": itemData.id},
                {
                    "$set":{
                        "cart.$.quantity": currQuantity + 1
                    }
                },
                function (error, res){
                    if(error) console.log(error);
                    console.log(res);
                })
            res.json({
                msg: `the ${itemData.name} quantity was change`,
                cart: currUser.cart
            })
        }
        if(action === "subtract"){
            if(currQuantity === 1){
                console.log("the item that should deleted is");
                const index = currUser.cart.findIndex((x)=> x.id === currItem.id)
                currUser.cart.splice(index, 1);
                await currUser.save();
                res.json({
                    msg: `the ${currItem.name} was deleted from the cart`,
                    cart: currUser.cart,
                    isDone: true
                })
            }else{
                Schemas.Users.findOneAndUpdate({name: userDate,"cart.id": itemData.id},
                {
                    "$set":{
                        "cart.$.quantity": currQuantity - 1
                    }
                },
                function (error, res){
                    if(error) console.log(error);
                    console.log(res);
                })
                res.json({
                    msg: `the ${itemData.name} quantity was change`,
                    cart: currUser.cart
                })
            }
        }
    }catch(error){
        console.log(error.message);
    }
}

exports.deleteCart = async(req,res)=>{
    try{
        const currDate = req.body.user;
        const currUser = await Schemas.Users.findOne({name: currDate});
        currUser.cart = [];
        await currUser.save();
        res.json({
            msg: `${currDate}'s cart was deleted`,
            cart: currUser.cart
        })
    }catch(error){
        console.log(error.message);
    }
}