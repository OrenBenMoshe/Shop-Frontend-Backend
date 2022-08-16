import { useNavigate } from "react-router-dom";
import "../styles/EnterPage.css";

const EnterPage = () => {
  const navigate = useNavigate();
  console.log("render EnterPage.jsx");
  return (
    <div className="connection">
      <h2>Welcome</h2>
      <h4>Please select your choice to continue to the site</h4>
      <div className="connection-btn-holder">
        <button className="connection-btn" onClick={() => navigate("/Login")}>
          Login
        </button>
        <button
          className="connection-btn"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EnterPage;
