import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getMenuClass = (path) => {
    return location.pathname === path ? activeMenuClass : menuClass;
  };

  return (
    <div className="menu-container">
      <img
        src="/icon.png"
        alt="Zerodha Logo"
        style={{ width: "50px" }}
      />

      <div className="menus">
        <ul>
          <li>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/")}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/orders"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/orders")}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/holdings"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/holdings")}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/positions"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/positions")}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/funds"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/funds")}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/apps"
              style={{ textDecoration: "none" }}
            >
              <p className={getMenuClass("/apps")}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        <div
          className="profile"
          onClick={handleProfileClick}
        >
          <div className="avatar">ZU</div>

          <p className="username">USERID</p>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <p>Profile</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;