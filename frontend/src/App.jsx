import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client_Homepage from "./pages/client_homepage";
import Homepage from "./pages/homepage";
import Profile from "./pages/profile";
import axios from "axios";

const App = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ isAuthenticated && user.userType === "CLIENT" ? <Client_Homepage /> : <Homepage></Homepage>} />
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
