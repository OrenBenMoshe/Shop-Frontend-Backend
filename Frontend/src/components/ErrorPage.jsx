import { useNavigate } from "react-router-dom";
import "../styles/ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>We sorry we cannot find this page</h1>
      <div className="error-page-emoji"></div>
      <div className="go-back-container">
        <h2>you can go back to our entrance page</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorPage;
