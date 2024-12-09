import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Layout() {
  return (
    <div className="Layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="Layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAdmin() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser || !currentUser.isAdmin ? (
    <Navigate to="/" /> // Redirect to home if not an admin
  ) : (
    <div className="Layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequireAuth, RequireAdmin };
