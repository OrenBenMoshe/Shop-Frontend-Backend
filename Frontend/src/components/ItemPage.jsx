import { useContext, useEffect } from "react";
import "../styles/ItemPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../contexts/CartContext";
import ItemsContext from "../contexts/ItemsContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ItemPage = () => {
  console.log("render ItemPage.jsx");
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const { items } = useContext(ItemsContext);
  const { addToCart } = useContext(CartContext);
  const itemID = JSON.parse(localStorage.getItem("selectedItemID"));
  const selectedItem = items.find((x) => x.id === itemID);
  return (
    <div>
      {items.length > 0 && (
        <div>
          <h1 className="page-title">
            The selected item is: {selectedItem.name}
          </h1>
          <div className="selected-item">
            <div className="selected-item-details">
              <ul>
                <li>info: {selectedItem.info}</li>
                <li>price: {selectedItem.price}$</li>
                <li className="available">Available in stock</li>
              </ul>
              <button
                onClick={() => {
                  addToCart(selectedItem);
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} className="icon-btn" />
                Add To Cart
              </button>
            </div>
            <img src={selectedItem.img} alt="item pic" />
            <button className="go-back" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faAngleRight} className="go-back-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
