import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/navbar";
import JobList from "../components/jobList";
import Buffer from "../components/buffer";
import Message from "../components/message";
import axios from "axios";

const Homepage = () => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [message, setMessage] = useState(null);

  const applyJob = async (job_id) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });
      console.log(accessToken)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/applyJob/${job_id}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage({ message: "Applied for Job successfully!" });
    } catch (error) {
      console.log("Failed to Apply for Job", error);
      setMessage({ error: "Failed to Apply for Job" });
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar></Navbar>
        <Buffer></Buffer>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      {message && <Message message={message} setMessage={setMessage}></Message>}
      <JobList applyJob={applyJob}></JobList>
    </>
  );
};

export default Homepage;
