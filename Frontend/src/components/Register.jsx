import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  console.log("render Register.jsx");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [uniqueNickName, setUniqueNickName] = useState(true);
  const [identicalPasswords, setIdenticalPasswords] = useState(false);
  const {
    setUser,
    authorized,
    setAuthorized,
    validUsername,
    setValidUsername,
  } = useContext(UserContext);

  useEffect(() => {
    if (authorized) navigate("/Home");
  }, [authorized, navigate]);

  const register = (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.username.length > 10) {
      setValidUsername(false);
      setUniqueNickName(true);
      setIdenticalPasswords(false);
      resetFormData();
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIdenticalPasswords(true);
      setUniqueNickName(true);
      resetFormData();
      return;
    } else {
      axios
        .post("/user", { data: formData })
        .then(async (res) => {
          const receivedMessage = await res.data.msg;
          const currentLoggedInUser = await res.data.username;
          console.log(currentLoggedInUser);
          if (receivedMessage === "this username already exist") {
            setUniqueNickName(false);
            setIdenticalPasswords(false);
            setValidUsername(true);
          } else if (receivedMessage === "user register successfully") {
            setUniqueNickName(true);
            setIdenticalPasswords(false);
            setUser(currentLoggedInUser);
            setAuthorized(true);
            navigate("/Home");
          }
        })
        .catch((error) => {
          console.log("Error is made");
          console.log(error);
        });
    }
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegister = (event) => {
    const id = event.target.id;
    const userInput = event.target.value.replace(/\s+/g, "");
    console.log("user input: ", userInput);
    switch (id) {
      case "username":
        setFormData({ ...formData, username: userInput });
        break;
      case "password":
        setFormData({ ...formData, password: userInput });
        break;
      case "confirm-password":
        setFormData({ ...formData, confirmPassword: userInput });
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={register}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          onChange={handleRegister}
          required
          value={formData.username}
          autoComplete="off"
          autoFocus
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          onChange={handleRegister}
          required
          value={formData.password}
        />
        <div className="confirm-password">
          <label htmlFor="confirm password">confirm password:</label>
          <input
            id="confirm-password"
            type="password"
            onChange={handleRegister}
            required
            value={formData.confirmPassword}
          />
        </div>

        {identicalPasswords && (
          <div className="not-identical-passwords">
            The passwords are not identical.
          </div>
        )}
        {!validUsername && (
          <div className="valid-username">
            the username must be less then 10 chars
          </div>
        )}
        {!uniqueNickName && (
          <div className="unique-name">
            This username already exists, please choose another name.
          </div>
        )}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
