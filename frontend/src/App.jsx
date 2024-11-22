import React from "react";
import { userContext } from "../context/userContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Client_Profile from "./pages/client_profile";
import Client_Homepage from "./pages/client_homepage";
import Freelancer_Profile from "./pages/freelancer_profile";

const App = () => {
  const { accessToken, user, isAuthenticated, isLoading } = userContext();

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={isAuthenticated && user.userType === "CLIENT" ? <Client_Homepage /> : <Homepage></Homepage>} />
        <Route path="/profile" element={isAuthenticated && user.userType === "CLIENT" ? <Client_Profile /> : <Freelancer_Profile viewOnly={false}></Freelancer_Profile>}></Route>
        <Route path="/profile/user/:id" element={<Freelancer_Profile viewOnly={true}></Freelancer_Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
