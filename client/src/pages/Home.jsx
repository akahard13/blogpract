import React from "react";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl + `posts${cat}`, {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent;
    const maxLength = 200;
    if (textContent.length <= maxLength) {
      return textContent; // Si el contenido es igual o más corto que maxLength, no se corta.
    } else {
      return textContent.slice(0, maxLength) + " "; // Si es más largo, se corta y se agrega " ..." al final.
    }
  };
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img || `../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link
                className="link"
                to={currentUser ? `/post/${post.id}` : "/login"}
              >
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}<b> ...</b></p>
              <Link
                className="link"
                to={currentUser ? `/post/${post.id}` : "/login"}
              >
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
