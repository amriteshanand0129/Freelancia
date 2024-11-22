import React, { useEffect, useState } from "react";
import { userContext } from "../../context/userContext.jsx";
import Buffer from "./buffer";
import axios from "axios";
import Job from "./job";

const JobList = ({ applyJob }) => {
  const { accessToken, isAuthenticated } = userContext();
  const [jobs, setJobs] = useState([]);

  const getJobsList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getJobs`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getJobsList();
    }
  }, [isAuthenticated]);

  if (jobs.length == 0) {
    return <Buffer></Buffer>;
  }

  return (
    <div className="jobList">
      {jobs.map((job) => (
        <Job key={job._id} job={job} applyJob={applyJob} />
      ))}
    </div>
  );
};

export default JobList;
