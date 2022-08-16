const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: Number, required: true},
    cart: []
})

const itemSchema = new Schema({
    name: {type: String},
    img: {type: String},
    info: {type: String},
    price: {type: "number"},
});

const postsSchema = new Schema({
    name: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: String}
})

const Items = mongoose.model("items", itemSchema);
const Users = mongoose.model("users", userSchema);
const Posts = mongoose.model("posts", postsSchema)
const mySchemas = {"Items": Items, "Users": Users, "Posts": Posts};
module.exports = mySchemas;