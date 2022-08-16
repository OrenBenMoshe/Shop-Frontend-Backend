import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import ItemsContext from "../contexts/ItemsContext";

const Navbar = () => {
  console.log("render Navbar.jsx");
  const { valueOfCart, cartValue, cart, setCart } = useContext(CartContext);
  const { user, setUser, authorized, setAuthorized } = useContext(UserContext);
  const { items } = useContext(ItemsContext);

  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    valueOfCart();
  }, [cart, valueOfCart]);

  const handleChange = (event) => {
    if (authorized) {
      const currentSearchWord = event.target.value;
      setSearchWord(currentSearchWord);
    }
  };

  const toggleBar = () => {
    const icon = document.querySelector(".icon-search");
    icon.classList.toggle("active-search");
    const clearInput = icon.classList.value.includes("active-search");
    if (!clearInput) setSearchWord("");
  };

  const toggleLogout = () => {
    const icon = document.querySelector(".logout");
    icon.classList.toggle("logout-active");
  };

  const resetDate = () => {
    setCart([]);
    setAuthorized(false);
    setUser(null);
  };

  const HandleSearch = (id) => {
    console.log("the id we wanna save in the localStore: ", id);
    localStorage.setItem("selectedItemID", id);
    navigate("/ItemPage");
    setSearchWord("");
  };

  return (
    <nav>
      <h2 className="logo" onClick={() => navigate("/home")}>
        Logo
      </h2>

      <ul className="nav-links">
        <li
          // className="nav-item"
          style={{ pointerEvents: authorized ? "auto" : "none" }}
        >
          <div className="search">
            <div className="icon-search">
              <FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                onClick={toggleBar}
              />
              {authorized && (
                <input
                  type="text"
                  id="search-input"
                  value={searchWord}
                  placeholder="Search word"
                  onChange={handleChange}
                  autoComplete="off"
                />
              )}
            </div>
            {searchWord && (
              <div className="search-box">
                {items.map((item, index) => {
                  if (
                    item.name.toLowerCase().includes(searchWord.toLowerCase())
                  ) {
                    return (
                      <div
                        key={index}
                        className="search-item"
                        onClick={() => HandleSearch(item.id)}
                      >
                        {item.name}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </li>
        <li className="nav-item" onClick={() => navigate("/Register")}>
          Register
        </li>
        <li className="nav-item" onClick={() => navigate("/Login")}>
          Login
        </li>
        <li className="nav-item" onClick={() => navigate("/Store")}>
          Store
        </li>
        <li className="nav-item" onClick={() => navigate("/About")}>
          About
        </li>
        <li className="nav-item" onClick={() => navigate("/Posts")}>
          Posts
        </li>
        <li
          className="nav-item"
          style={{ pointerEvents: authorized ? "auto" : "none" }}
          onClick={() => navigate("/cart")}
        >
          <div
            className="cart"
            style={{ width: cartValue > 9 ? "50px" : "40px" }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartValue === 0 ? " 0" : " " + cartValue}
          </div>
        </li>
        <li
          className="nav-item user"
          style={{
            pointerEvents: user ? "auto" : "none",
            marginTop: user ? "0" : "12px",
          }}
          onClick={toggleLogout}
        >
          <FontAwesomeIcon icon={faUser} />
          {user}
          {authorized && (
            <div className="logout">
              <div className="show-logout">
                <button
                  onClick={() => {
                    var val = window.confirm(
                      "All your data saved.\n you sure you want to logout?"
                    );
                    if (val === true) {
                      resetDate();
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
