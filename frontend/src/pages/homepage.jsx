import React, { useState } from "react";
import { userContext } from "../../context/userContext.jsx";
import JobList from "../components/jobList";
import Buffer from "../components/buffer";
import Message from "../components/message";
import axios from "axios";

const Homepage = () => {
  const { user, accessToken, isAuthenticated, isLoading } = userContext();
  const [message, setMessage] = useState(null);

  const applyJob = async (job_id) => {
    try {
      console.log(accessToken);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/applyJob/${job_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage({ message: "Applied for Job successfully!" });
    } catch (error) {
      console.log("Failed to Apply for Job", error);
      setMessage({ error: "Failed to Apply for Job" });
    }
  };

  if (isLoading) {
    return (
      <>
        <Buffer></Buffer>
      </>
    );
  }

  return (
    <>
      {message && <Message message={message} setMessage={setMessage}></Message>}
      <JobList applyJob={applyJob}></JobList>
    </>
  );
};

export default Homepage;
