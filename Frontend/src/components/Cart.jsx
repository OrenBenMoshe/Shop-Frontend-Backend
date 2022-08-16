import { useState, useEffect, useContext } from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  console.log("render Cart.jsx");
  const { authorized, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const { cart, setCart, cartValue } = useContext(CartContext);

  useEffect(() => {
    console.log("render useEffect on Cart.jsx");
    if (cartValue === 0) {
      setCurrentPrice(0);
      setTaxPrice(0);
      setTotalPrice(0);
    }

    var currQuantity = 0;
    var currPrice = 0;
    var priceResult = 0;
    var tex = 17;
    var taxResult = 0;
    var currTotalPrice = 0;
    cart.forEach((item) => {
      currQuantity = item.quantity;
      currPrice = item.price;
      priceResult = priceResult + currQuantity * currPrice;
    });
    setCurrentPrice(priceResult);
    taxResult = (tex * priceResult) / 100;
    setTaxPrice(taxResult);
    currTotalPrice = priceResult + taxResult;
    setTotalPrice(currTotalPrice);
  }, [cart, cartValue]);

  const [currentPrice, setCurrentPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleteAll, setDeleteAll] = useState(false);

  const createCartItem = (item) => {
    return <CartItem key={item.id} item={item} />;
  };

  const handleDeleteClick = async () => {
    axios
      .put("/user/cart", { user: user })
      .then((res) => setCart(res.data.cart))
      .catch((error) => console.log(error.message));
    setDeleteAll(true);
    // setCart([]);
    // valueOfCart();
  };

  const handleBuyClick = () => {
    axios
      .put("/user/cart", { user: user })
      .then((res) => setCart(res.data.cart))
      .catch((error) => console.log(error.message));
    alert("Thank you for buying those products");
    setDeleteAll(true);
  };

  return (
    <div>
      {cartValue === 0 ? (
        <h1 className="page-title">
          your cart is empty go to the store and add some items
        </h1>
      ) : (
        <h1 className="page-title">your cart items</h1>
      )}
      <div
        className="cart-container"
        style={{ display: deleteAll ? "none" : "show" }}
      >
        {cart.map(createCartItem)}
      </div>
      <div className="cart-info">
        <h2>cart details</h2>
        <div className="cart-details">
          <p>Items {cartValue}</p>
          <p>Current price {currentPrice}$</p>
          <p>Tax payment {taxPrice}$</p>
          <h4>
            Summery:
            {cart.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.name}</span> <span>x</span>{" "}
                  <span>{item.quantity}</span>
                  <span> </span>
                  <span>=</span>
                  <span> </span>
                  <span>{item.price * item.quantity}$</span>
                </div>
              );
            })}
          </h4>
          <h3>Total price: {totalPrice}$</h3>
          {cartValue > 0 && (
            <div className="btn-details">
              <button className="buy" onClick={handleBuyClick}>
                Buy Now
              </button>
              <button className="delete-all" onClick={handleDeleteClick}>
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
