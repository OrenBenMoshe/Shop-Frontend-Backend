import { useContext, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { Slideshow } from "./Slideshow";
const Home = () => {
  console.log("render Home.jsx");
  const { authorized } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  return (
    <div className="home-page">
      <span>Welcome</span>
      <span>To</span>
      <span>Our</span>
      <span>Store</span>
      <h3>We hope you will found what you are looking for</h3>

      <Slideshow />
      <div className="separator">
        <div className="separator-item">
          <FontAwesomeIcon icon={faTruck} className="icon"></FontAwesomeIcon>
          <br />
          Free and fast delivery nationwide
        </div>
        <hr />
        <div className="separator-item">
          <FontAwesomeIcon
            icon={faCreditCard}
            className="icon"
          ></FontAwesomeIcon>
          <br />
          Buy now and pay later with afterPay or zippay
        </div>
        <hr />
        <div className="separator-item">
          <FontAwesomeIcon icon={faBarcode} className="icon"></FontAwesomeIcon>
          <br />
          Our products have the highest quality on the market
        </div>
      </div>

      <div className="show-options">
        <div className="show-item" onClick={() => navigate("/about")}>
          <h2>About</h2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
          numquam, placeat veniam laboriosam, ipsam fugiat iste quae tenetur
          recusandae minima amet tempore sunt eum qui est? Esse alias aut quasi
          dolor accusantium voluptatum molestiae vero?
        </div>
        <div className="show-item" onClick={() => navigate("/store")}>
          <h2>Store</h2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
          numquam, placeat veniam laboriosam, ipsam fugiat iste quae tenetur
          recusandae minima amet tempore sunt eum qui est? Esse alias aut quasi
          dolor accusantium voluptatum molestiae vero?
        </div>
        <div className="show-item" onClick={() => navigate("/post")}>
          <h2>Posts</h2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
          numquam, placeat veniam laboriosam, ipsam fugiat iste quae tenetur
          recusandae minima amet tempore sunt eum qui est? Esse alias aut quasi
          dolor accusantium voluptatum molestiae vero?
        </div>
      </div>
    </div>
  );
};

export default Home;
