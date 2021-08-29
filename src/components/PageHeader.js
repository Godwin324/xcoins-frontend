import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const PageHeader = () => {
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState(undefined);

  const logOut = () => {
    AuthService.logout().then(() => {
      setCurrentUser(undefined);
      history.push("/login");
    });
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <div className="me-auto">
        <Link to={"/"} className="navbar-brand">
        Xcoins
      </Link>
      </div>
      

      {currentUser ? (
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="#javascript" className="nav-link" onClick={logOut}>
              Logout
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default PageHeader;
