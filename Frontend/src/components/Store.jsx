import { useContext, useEffect } from "react";
import StoreItem from "./StoreItem";
import "../styles/Store.css";
import ItemsContext from "../contexts/ItemsContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const { storeItems, setStoreItems, items } = useContext(ItemsContext);
  // const { addToCart } = useContext(CartContext);

  const createStoreItem = (item) => {
    console.log("render Store.jsx");
    return <StoreItem key={item.id} item={item} />;
  };

  const handleFilter = () => {
    const filter = document.querySelector(".filter-choice");
    filter.classList.toggle("active-filter");
  };

  const handleRadio = (e) => {
    const id = e.target.id;
    const tempArray = items;
    switch (id) {
      case "high-to-low":
        const sortByPriceHighToLow = tempArray.sort((a, b) => {
          return b.price - a.price;
        });
        setStoreItems([...sortByPriceHighToLow]);
        handleFilter();
        break;
      case "low-to-high":
        const sortByPriceLowToHigh = tempArray.sort((a, b) => {
          return a.price - b.price;
        });
        setStoreItems([...sortByPriceLowToHigh]);
        handleFilter();
        break;
      case "under-500":
        console.log(id);
        const under500 = tempArray.filter((x) => x.price < 500);
        setStoreItems(under500);
        handleFilter();
        break;
      case "sort-by-name":
        const sortByName = tempArray.sort((a, b) => {
          if (a.name < b.name) return -1;
          return 1;
        });
        setStoreItems([...sortByName]);
        handleFilter();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="page-title">Our Products, enjoy shopping in the Store</h1>
      <div className="filter-icon" onClick={() => handleFilter()}></div>
      <div className="filter-choice">
        <div>
          <input
            type="radio"
            id="high-to-low"
            name="filter-btn"
            onChange={handleRadio}
          />
          <label htmlFor="high-to-low">High To Low Price</label>
        </div>
        <div>
          <input
            type="radio"
            id="low-to-high"
            name="filter-btn"
            onChange={handleRadio}
          />
          <label htmlFor="low-to-high">Low To High Price</label>
        </div>
        <div>
          <input
            type="radio"
            id="under-500"
            name="filter-btn"
            onChange={handleRadio}
          />
          <label htmlFor="under-500">Items Under 500$ </label>
        </div>
        <div>
          <input
            type="radio"
            id="sort-by-name"
            name="filter-btn"
            onChange={handleRadio}
          />
          <label htmlFor="sort-by-name">Sort by name </label>
        </div>
      </div>
      <div className="store">{storeItems.map(createStoreItem)}</div>
    </>
  );
};

export default Store;
