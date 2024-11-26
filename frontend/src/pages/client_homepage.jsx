import React, { useState } from "react";
import axios from "axios";
import { userContext } from "../../context/userContext.jsx";
import JobPostModal from "../components/jobPostModal";
import JobList from "../components/jobList";
import Message from "../components/message";
import Buffer from "../components/buffer";

const Client_Homepage = () => {
  const { accessToken, user, isAuthenticated, isLoading } = userContext();
  const [message, setMessage] = useState(null);
  const [refreshJobs, setRefreshJobs] = useState(() => () => {});

  const postJob = async (event) => {
    event.preventDefault();
    const Job = {
      title: event.target.title.value,
      description: event.target.description.value,
      skills: event.target.skills.value,
      qualification: event.target.qualification.value,
      location: event.target.location.value,
      preferred_experience: event.target.experience.value,
      working_hours: event.target.working_hours.value,
      wage: event.target.wage.value,
    };    

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/postJob`, Job, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      refreshJobs();
      setMessage({ message: "Job posted successfully!" });
    } catch (error) {
      console.log("Failed to Post Job", error);
      setMessage({ error: "Failed to post Job!" });
    }

    const modalElement = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  if (!user) {
    return (
      <>
        <Buffer></Buffer>
      </>
    );
  }

  return (
    <>
      {message && <Message message={message} setMessage={setMessage}></Message>}
      <JobPostModal postJob={postJob}></JobPostModal>
      <JobList setRefreshJobs={setRefreshJobs}></JobList>
    </>
  );
};

export default Client_Homepage;
