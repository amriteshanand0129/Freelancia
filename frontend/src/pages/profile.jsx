import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/navbar";
import axios from "axios";

const Profile = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

  const makerequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitBio = async (event) => {
    event.preventDefault();
    const bio = event.target.bio.value;
    console.log(bio);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateBio`,
        { bio: bio },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <button onClick={makerequest}>Make Request</button>
      <form action="/updateBio" onSubmit={submitBio}>
        <label htmlFor="Bio">Bio: </label>
        <input type="text" name="bio" id="bio" />
        <input type="submit" />
      </form>
    </>
  );
};

export default Profile;
