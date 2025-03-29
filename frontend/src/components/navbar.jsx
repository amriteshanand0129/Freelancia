import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../auth/login";
import { userContext } from "../../context/userContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout } = userContext();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo on the left */}
          <Link className="navbar-brand" to="/">
            <img src="/logo.jpg" height="40px" alt="Logo" />
          </Link>

          {/* Middle section (navigation links) */}
          <div className="nav-links position-absolute start-50 translate-middle-x">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <h5>Home</h5>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#jobListView">
                  <h5>Jobs</h5>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <h5>Contact Us</h5>
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section (login/profile) */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <h5>{user.name}</h5>
                <div className="nav-item dropdown">
                  <Link className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img key={user.picture} src={user.picture} referrerPolicy="no-referrer" className="profileIcon" alt="ProfilePic" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          logout({
                            logoutParams: {
                              returnTo: window.location.origin,
                            },
                          })
                        }
                      >
                        Logout
                      </a>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/change-password">
                        Change Password
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="nav-item dropdown">
                <Link className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/account_circle.png" className="profileIcon" alt="ProfilePic" />
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item">
                      <LoginButton />
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
