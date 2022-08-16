import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/fontawesome-free-brands";
import { faInstagram } from "@fortawesome/fontawesome-free-brands";
import { faTwitter } from "@fortawesome/fontawesome-free-brands";
import "../styles/Footer.css";

const Footer = () => {
  const { authorized } = useContext(UserContext);

  return (
    <footer className="footer-test">
      <div className="controller">
        <div className="footer-logo">Logo</div>
        <div className="w">
          <span>shop store</span>
          <span>|</span>
          <span>Address: some place 1th, Israel</span>
          <span>|</span>
          <span>Telephone: +123456789</span>
          <span>|</span>
          <span>Fax: +123456789</span>
        </div>
        <div className="footer-icons">
          <FontAwesomeIcon
            icon={faFacebook}
            className="footer-icon"
            onClick={() => alert("Thank you for visiting our facebook page")}
            style={{ pointerEvents: authorized ? "auto" : "none" }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faInstagram}
            className="footer-icon"
            onClick={() => alert("Thank you for visiting our instagram page")}
            style={{ pointerEvents: authorized ? "auto" : "none" }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faTwitter}
            className="footer-icon"
            onClick={() => alert("Thank you for visiting our twitter page")}
            style={{ pointerEvents: authorized ? "auto" : "none" }}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className="footer-copyright">&copy; Copyright By Oren BM</div>
    </footer>
  );
};

export default Footer;
