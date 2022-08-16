import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Posts.css";
import axios from "axios";
import PostItem from "./PostItem";

const Posts = () => {
  const { authorized, changePost } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const [posts, setPosts] = useState([]);
  const date = new Date();
  const hours = date.getHours();
  const year = date.getFullYear();
  const currDate = date.getDate();
  const month = date.getMonth() + 1;
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const dateForm = `${currDate}/${month}/${year} ${hours}:${minutes}`;

  useEffect(() => {
    console.log("render from Posts.jsx");
    axios
      .get("/posts")
      .then(async (res) => {
        const data = await res.data;
        setPosts(data);
      })
      .catch((error) => console.log(error));
  }, [changePost, setPosts]);

  const editPost = (id) => {
    localStorage.setItem("selectedPostID", JSON.stringify(id));
    navigate("/EditPost");
  };

  const createPostItem = (item) => {
    return <PostItem key={item._id} item={item} editPost={editPost} />;
  };

  return (
    <div>
      <h1>Posts</h1>
      <div className="posts-container">{posts.map(createPostItem)}</div>
    </div>
  );
};

export default Posts;
