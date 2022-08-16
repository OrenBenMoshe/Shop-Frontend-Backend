import { useContext, useEffect } from "react";
import "../styles/CartItem.css";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const CartItem = (props) => {
  console.log("render CartItem.jsx");
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const { item } = props;
  const { name, info, price, img, quantity } = props.item;
  const { updateCart } = useContext(CartContext);

  const handleAddClick = (item) => {
    updateCart(item, "increase");
  };

  const handleSubtractClick = (item) => {
    updateCart(item, "subtract");
    //older code
    // if (quantity === 1) {
    //   var temp = cart.findIndex((x) => x.id === id);
    //   cart.splice(temp, 1);
    //   setCart(cart);
    //   console.log(cart);
    //   setIsDone(true);
    //   valueOfCart();
    //   setCart((prevItems) => [...prevItems]);
    // } else subtractQuantity(id);
  };

  return (
    //Was a style on this element style={{ display: isDone ? "none" : "show" }}
    //with this useState // const [isDone, setIsDone] = useState(false);
    <div className="cart-item">
      <img src={img} alt="" className="cart-item-image" />
      <ul>
        <li>name: {name}</li>
        <li>info: {info}</li>
        <li>price: {price}$</li>
      </ul>
      <div className="add-and-remove">
        <div className="button-group">
          <button
            className="add"
            id="add"
            onClick={() => {
              handleAddClick(item);
            }}
          >
            +
          </button>
          <span>{quantity}</span>
          <button
            className="subtract"
            onClick={() => {
              handleSubtractClick(item);
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
