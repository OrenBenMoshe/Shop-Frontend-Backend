import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/EditPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const EditPost = () => {
  const { authorized, setChangePost } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const postID = JSON.parse(localStorage.getItem("selectedPostID"));
  const date = new Date();
  const hours = date.getHours();
  const year = date.getFullYear();
  const currDate = date.getDate();
  const month = date.getMonth() + 1;
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const dateForm = `${currDate}/${month}/${year} ${hours}:${minutes}`;

  useEffect(() => {
    axios
      .get("/EditPost", { params: { id: postID } })
      .then(async (res) => {
        const post = res.data.post;
        setName(post.name);
        setBody(post.body);
      })
      .catch((error) => console.log(error));
  }, [postID]);

  const handleChange = (e) => {
    const input = e.target.value;
    setBody(input);
  };

  const handleSave = () => {
    axios
      .patch("/EditPost", { id: postID, body: body, date: dateForm })
      .then(() => setChangePost((prevValue) => prevValue + 1))
      .catch((error) => console.log(error));
    navigate("/posts");
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <h3>{name}</h3>
      <textarea value={body} onChange={handleChange}></textarea>
      <button onClick={handleSave}>
        <FontAwesomeIcon icon={faSave} className="save-icon" />
        save post
      </button>
    </div>
  );
};

export default EditPost;
