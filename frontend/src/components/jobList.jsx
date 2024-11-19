import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Buffer from "./buffer";
import axios from "axios";
import Job from "./job";

const JobList = ({applyJob}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [jobs, setJobs] = useState([]);

  const getJobsList = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

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
    <div>
      {jobs.map((job) => (
        <Job key={job._id} job={job} applyJob={applyJob}/>
      ))}
    </div>
  );
};

export default JobList;
