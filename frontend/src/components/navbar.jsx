import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/login";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  console.log(user);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img src="/logo.jpg" height="40px" alt="Logo" />
          </a>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <ul className="navbar-nav gap-2">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
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

          <div className="d-flex align-items-center m-2 gap-3">
            {isAuthenticated ? (
              <>
                <h5>{user.name}</h5>
                <div className="nav-item dropdown">
                  <a className="nav-link" href="/profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img key={user.picture} src={user.picture} referrerpolicy="no-referrer" className="profileIcon" alt="ProfilePic" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/" onClick={() => logout({ logoutParams: { returnTo: window.location.origin, federated: true } })}>
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
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
