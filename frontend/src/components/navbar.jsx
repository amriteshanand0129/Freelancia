import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/login";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo on the left */}
          <a className="navbar-brand" href="/">
            <img src="/logo.jpg" height="40px" alt="Logo" />
          </a>

          {/* Middle section (navigation links) */}
          <div className="nav-links position-absolute start-50 translate-middle-x">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  <h5>Home</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <h5>Jobs</h5>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <h5>Contact Us</h5>
                </a>
              </li>
            </ul>
          </div>

          {/* Right section (login/profile) */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <h5>{user.name}</h5>
                <div className="nav-item dropdown">
                  <a className="nav-link" href="/profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img key={user.picture} src={user.picture} referrerPolicy="no-referrer" className="profileIcon" alt="ProfilePic" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/"
                        onClick={() =>
                          logout({
                            logoutParams: {
                              returnTo: window.location.origin,
                              federated: true,
                            },
                          })
                        }
                      >
                        Logout
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Change Password
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="nav-item dropdown">
                <a className="nav-link" href="/login" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/account_circle.png" className="profileIcon" alt="ProfilePic" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/profile">
                      <LoginButton />
                    </a>
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
