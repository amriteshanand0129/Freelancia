import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

//   useEffect(() => {
//     let isMounted = true;
//     const getTokenAndFetchUser = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently({
//           audience: import.meta.env.VITE_AUTH0_AUDIENCE,
//         });

//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     getTokenAndFetchUser();
//     return () => { 
//       isMounted = false; // Cleanup on unmount
//     };
//   }, [getAccessTokenSilently]); // Added dependency array

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
