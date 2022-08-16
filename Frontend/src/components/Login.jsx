import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  console.log("render Login.jsx");
  const { setUser, authorized, setAuthorized } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) navigate("/Home");
  }, [authorized, navigate]);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const loginUser = (event) => {
    event.preventDefault();

    axios
      .post("/login", { data: formData })
      .then(async (res) => {
        const receivedMessage = await res.data.msg;
        const currentLoggedInUser = await res.data.username;
        switch (receivedMessage) {
          case "user does not exists":
            setUserExist(true);
            // setLoggedIn(false);
            setPasswordMatch(false);
            break;
          case "user connected successfully":
            // setLoggedIn(true);
            setUserExist(false);
            setPasswordMatch(false);
            setUser(currentLoggedInUser);
            setAuthorized(true);
            navigate("/Home");
            break;
          case "the password is incorrect":
            setPasswordMatch(true);
            // setLoggedIn(false);
            setUserExist(false);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log("Error is made");
        console.log(error);
      });
    setFormData({
      username: "",
      password: "",
    });
  };

  const handleLogin = (event) => {
    const id = event.target.id;
    const userInput = event.target.value.replace(/\s+/g, "");
    switch (id) {
      case "username":
        setFormData({ ...formData, username: userInput });
        break;
      case "password":
        setFormData({ ...formData, password: userInput });
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginUser}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          onChange={handleLogin}
          required
          value={formData.username}
          autoComplete="off"
          autoFocus
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          onChange={handleLogin}
          required
          value={formData.password}
        />
        {passwordMatch && (
          <div className="not-identical-passwords">
            The password is incorrect.
          </div>
        )}
        {userExist && (
          <>
            <div className="user-exist">
              This user dose not exist in the data.
            </div>
            <div className="username-Information">
              Try to remember if you used capital letters or numbers in the
              register process.
            </div>
          </>
        )}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
