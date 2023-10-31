
import React from "react";


import { Link } from "react-router-dom";
import Menu from "../components/Menu";
const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://news.artnet.com/app/news-upload/2022/12/Lionel-Messi-2022-World-Cup-GettyImages-1245739377-1024x761.jpg"
          alt=""
        />
        <div className="user">
          <div className="data">
            <img
              src="https://news.artnet.com/app/news-upload/2022/12/Lionel-Messi-2022-World-Cup-GettyImages-1245739377-1024x761.jpg"
              alt=""
            />
            <div className="info">
              <span>John</span>
              <p>Posted 2 days ago</p>
            </div>
          </div>
          <div className="edit">
            <Link to={`/write?2`}>
              <EditOutlinedIcon className="icon" />
            </Link>
            <DeleteOutlineOutlinedIcon className="icon" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          autem neque voluptatum, quod fugit, sit consectetur sequi a nostrum
          voluptas laborum libero tenetur reprehenderit illo possimus nesciunt
          ut rem maiores! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Architecto fuga et error beatae dolores voluptate similique vel
          sint ratione autem. Facilis hic at iste similique facere blanditiis
          odit doloremque voluptates?
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          autem neque voluptatum, quod fugit, sit consectetur sequi a nostrum
          voluptas laborum libero tenetur reprehenderit illo possimus nesciunt
        </p>
      </div>
      <div className="menu">
        <Menu /> {/**Procedamos a crear la vista menu */}
      </div>
    </div>
  );
};

export default Single;
