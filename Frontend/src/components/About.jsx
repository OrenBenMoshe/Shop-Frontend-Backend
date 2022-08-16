import "../styles/About.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const About = () => {
  console.log("render About.jsx");
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  return (
    <div className="container">
      <h1 className="page-title">About Us</h1>
      <div className="about-info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt
        enim voluptatem dicta eligendi vel ea optio tenetur totam blanditiis
        excepturi incidunt nihil minus iure tempora quia quae, nobis similique
        ad dignissimos provident atque ullam. Nobis cum voluptatibus repellendus
        quam, debitis ea provident ex vel sapiente excepturi eaque nihil
        molestias?
      </div>
      <div className="details">
        <p>Phone: +123456789</p>
        <p>Address: some place 1th</p>
        <p>Email: shop@shop.com</p>
      </div>
      <div className="social-media">
        <h1>you can find us in the social media</h1>
        <div className="social-icon-container">
          <div
            className="social-icon facebook"
            onClick={() => alert("Thank you for visiting our facebook page")}
          ></div>
          <div
            className="social-icon instagram"
            onClick={() => alert("Thank you for visiting our instagram page")}
          ></div>
          <div
            className="social-icon twitter"
            onClick={() => alert("Thank you for visiting our twitter page")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;
