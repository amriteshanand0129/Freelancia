import React, { useEffect, useState } from "react";
import { userContext } from "../../context/userContext.jsx";
import Buffer from "./buffer";
import axios from "axios";
import Job from "./job";

const JobList = ({ applyJob, setRefreshJobs }) => {
  const { accessToken, isAuthenticated } = userContext();
  const [jobs, setJobs] = useState([]);
  const [ fetching, setFetching] = useState(false);

  const getJobsList = async () => {
    setFetching(true);
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
    setFetching(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getJobsList();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setRefreshJobs(() => getJobsList);
  }, [setRefreshJobs]);

  if (fetching) {
    return <Buffer></Buffer>;
  }

  return (
    <div className="jobList" id="jobListView">
      <div className="jobListHeader"><h2>Total Open Postings: {jobs.length}</h2>
      </div>
      {isAuthenticated == true ? (jobs.length > 0 ? (jobs.map((job) => (
        <Job key={job._id} job={job} applyJob={applyJob} />
      ))) : (
        <h2>No Jobs Available</h2>

      )) : (
        <div className="jobListWLogin">
          <div>☹️Oops! Looks like you are not logged in.</div>
          <div>Login first to view Jobs</div>
        </div>
      ) }
    </div>
  );
};

export default JobList;
