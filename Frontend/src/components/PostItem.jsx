import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "../styles/Posts.css";

const PostItem = (props) => {
  const { editPost } = props;
  const { _id, name, body, date } = props.item;
  const { user } = useContext(UserContext);
  return (
    <div className="post-item">
      <FontAwesomeIcon icon={faUser} className="post-user-icon" />
      <span className="post-name">({name}):</span>
      <span>{body}</span>
      <br />
      <div>
        <p>{date}</p>
        <button
          onClick={() => editPost(_id)}
          style={{ display: name === user ? "block" : "none" }}
        >
          <FontAwesomeIcon icon={faPen} className="pen-icon" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default PostItem;
