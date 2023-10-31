import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    console.log("hola mundo")
    try {
      console.log("hola mundo")
      await axios.delete(apiUrl + `posts/${postId}`, { withCredentials: true});
      navigate("/");
    } catch (err) {
      // Manejar errores de solicitud
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl + `posts/${postId}`, { withCredentials: true});
        setPost(res.data);
      } catch (err) {
        // Manejar errores de solicitud
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post.img || `../upload/${post?.img}`} alt="" />
        <div className="user">
          <div className="data">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>
          {currentUser.username === post.username && (
          <div className="edit">
            <Link to={`/write?edit=${post.id}`} state={post}>
              <EditOutlinedIcon className="icon" />
            </Link>
            <DeleteOutlineOutlinedIcon className="icon" onClick={handleDelete} />
          </div>
        )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>{" "}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
