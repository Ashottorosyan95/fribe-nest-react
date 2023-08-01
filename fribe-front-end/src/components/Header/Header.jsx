import React from "react";
import fribeWhite from "../../assets/images/fribe-white.png";
import listIcon from "../../assets/images/list.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ userInfo }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('selectedPage');
    navigate("/");
  }

  return (
    <div className="header-bar fixed-header-bar">
      <div className="siebar-canvas-btn">
        <button
          className="btn border-0 p-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sideBarOffcanvas"
          aria-controls="sideBarOffcanvas"
        >
          <img src={listIcon} alt="" width="30px" />
        </button>
      </div>
      <div className="dasboard-text">
        <img src={fribeWhite} alt="" /> <span>Dashboard</span>
      </div>
      <div className="dropdown ms-auto header-bar-dropdown">
        <div className="header-bar-profile-pic">
          {/* <img src="" alt="" className="w-100 h-100 rounded-50" /> */}
        </div>
        <button
          className="btn btn-outline-light dropdown-toggle header-bar-dropdown-btn text-capitalize"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {userInfo.firstName + " " + userInfo.lastName}
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" onClick={handleLogoutClick}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
