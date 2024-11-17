import React from "react";
import Navbar from "../components/navbar";
import JobPostModal from "../components/jobPostModal";
import JobList from "../components/jobList";
const Client_Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <JobPostModal></JobPostModal>   
      <JobList></JobList> 
    </>
  );
};

export default Client_Homepage;
