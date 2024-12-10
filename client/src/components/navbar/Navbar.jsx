import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const isProfilePage =
    location.pathname === "/profile" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Astrack Logo" className="logo-no-text" />
          <img
            src="/logo-text.png"
            alt="Astrack Logo with Text"
            className="logo-with-text"
          />
        </a>
        <a href="/">Home</a>
        <a href="/maps">Map</a>
        <a href="/facilities">Facilities</a>
        <a href="/">About</a>
      </div>
      <div className={`right ${isProfilePage ? "profile-bg" : ""}`}>
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="_" />
            <span className="name">{currentUser.username}</span>
            <Link
              to={currentUser.isAdmin ? "/admin-panel" : "/profile"}
              className="profile"
            >
              <span>{currentUser.isAdmin ? "Admin Panel" : "Profile"}</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register" className="reg">
              Register
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
        <div className={openMenu ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">Map</a>
          <a href="/">Facilities</a>
          <a href="/">About</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
