const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items")
const userController = require("../controllers/user")
const cartController = require("../controllers/cart")
const postController = require("../controllers/posts");

router.get("/store", itemsController.findAllItems);

router.get("/", userController.findAllUsers)

 router.post("/user", userController.saveUser)

router.post("/login", userController.findUser)

router.get("/cart", cartController.findCart)

router.post("/cart", cartController.updateCart)

router.patch("/cart/id", cartController.updateCartItemQuantity);

router.put("/user/cart", cartController.deleteCart);

router.get("/posts", postController.findAllPosts);

router.get("/EditPost", postController.findPost);

router.patch("/EditPost" , postController.editPost);

module.exports = router;