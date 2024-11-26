import React, { useState } from "react";
import { userContext } from "../../context/userContext.jsx";
import JobList from "../components/jobList";
import Buffer from "../components/buffer";
import Message from "../components/message";
import axios from "axios";

const Homepage = () => {
  const { user, accessToken, isAuthenticated, isLoading } = userContext();
  const [message, setMessage] = useState(null);
  const [refreshJobs, setRefreshJobs] = useState(() => () => {});

  const applyJob = async (job_id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/applyJob/${job_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      refreshJobs();
      setMessage({ message: "Applied for Job successfully! You can check the status in the Profile Section" });
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
      <div class="resourcesOuterBody">
            <div class="resourcesContent">
                <h1>Welcome to Freelancia</h1>
                <h1>Looking for a Job ? You landed at the right place</h1><br />
                <h1>Checkout Jobs on Freelancia</h1>
            </div>
        </div>
      <JobList applyJob={applyJob} setRefreshJobs={setRefreshJobs}></JobList>
    </>
  )
};

export default Homepage;
