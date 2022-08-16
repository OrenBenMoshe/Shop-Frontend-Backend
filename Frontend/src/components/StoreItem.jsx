import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StoreItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../contexts/CartContext";

const StoreItem = (props) => {
  const navigate = useNavigate();
  console.log("render StoreItem.jsx");
  const { item } = props;
  const { id, name, info, price, img } = props.item;
  const { addToCart } = useContext(CartContext);
  const setItemId = () => {
    localStorage.setItem("selectedItemID", id);
    navigate("/ItemPage");
  };

  return (
    <div className="grid-item">
      <div className="data-item" onClick={setItemId}>
        <img src={img} alt="pic" />
        <h2>{name}</h2>
        <p>{info}</p>
        <p>{price}$</p>
      </div>
      <div className="add-btn">
        <button
          onClick={() => {
            addToCart(item);
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} className="icon-btn" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
