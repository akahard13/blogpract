import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
Link
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl + `posts/?cat=${cat}`, { withCredentials: true});
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const handleRead = (postId) => {
    Navigate(currentUser ? `/post/${post.id}` : "/login")
  }
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img || `../upload/${post?.img}`} alt="" />
          <Link
            className="link"
            to={currentUser ? `/post/${post.id}` : "/login"}
          >
            <h2>{post.title}</h2>
          </Link>
          <Link
            className="link"
            to={currentUser ? `/post/${post.id}` : "/login"}
          >
            <button onClick={handleRead} postId={post.id}>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
