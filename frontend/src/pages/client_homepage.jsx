import React, { useState } from "react";
import Navbar from "../components/navbar";
import JobPostModal from "../components/jobPostModal";
import JobList from "../components/jobList";
import Message from "../components/message";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Buffer from "../components/buffer";
const Client_Homepage = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();
  const [message, setMessage] = useState(null);

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

    const modalElement = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/postJob`, Job, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setMessage({ message: "Job posted successfully!" });
    } catch (error) {
      console.log("Failed to Post Job", error);
      setMessage({ error: "Failed to post Job!" });
    }
  };

  if (!user) {
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
      <JobPostModal postJob={postJob}></JobPostModal>
      <JobList></JobList>
    </>
  );
};

export default Client_Homepage;
