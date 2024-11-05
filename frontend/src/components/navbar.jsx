import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/login";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  if (isAuthenticated) console.log(user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <a className="nav-link " href="/profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className="profileIcon" src={user.picture} alt="" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Logout
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <LoginButton></LoginButton>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
