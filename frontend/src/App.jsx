import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Client_Profile from "./pages/client_profile";
import Client_Homepage from "./pages/client_homepage";
import Freelancer_Profile from "./pages/freelancer_profile";

const App = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ isAuthenticated && user.userType === "CLIENT" ? <Client_Homepage /> : <Homepage></Homepage>} />
        <Route path="/profile" element={ isAuthenticated && user.userType === "CLIENT" ? <Client_Profile /> : <Freelancer_Profile></Freelancer_Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
