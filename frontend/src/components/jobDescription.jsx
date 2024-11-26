import "../css/JobDescription.css";
import React, { useState, useEffect } from "react";
import { userContext } from "../../context/userContext.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Buffer from "./buffer";
import Applicant from "./applicant";

const JobDescription = ({ job, fetchProfile, message, setMessage, viewOnly }) => {
  const { user, accessToken, isAuthenticated, isLoading } = userContext();
  const [applications, setApplications] = useState([]);
  const [fetchingApplications, setFetchingApplications] = useState(false);

  const navigate = useNavigate();
  const visitProfile = (id) => {
    const modalElement = document.getElementById("applicationsModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    navigate(`/profile/user/${id}`);
  };

  const assignJob = async (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignJob/${job._id}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchProfile();
      setMessage({ message: "Assigned Job Successfully!" });
    } catch (err) {
      console.error("Error while assigning Job:", err);
      setMessage({ error: "Failed to assign Job! Please try again." });
    }
    const modal = `applicationsModal${job._id}`;
    const modalElement = document.getElementById(modal);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  const timeSincePosted = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days} days ago` : `${hours} hours ago`;
  };

  const viewApplications = async () => {
    setFetchingApplications(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getJobApplications/${job._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setApplications(response.data.applications.applicants);
    } catch (err) {
      console.error("Error while fetching profile data:", err);
      setMessage({ error: "Failed to fetch profile data! Please try again." });
    }
    setFetchingApplications(false);
  };

  return (
    <>
      <div className="job_description">
        <div className="job_concise_card">
          <div className="job_concise_header">
            <h2 className="job_concise_title">{job.title}</h2>
            <span className="time-posted">
              <strong>&#40;{job.location}&#41;</strong> {timeSincePosted(job.createdAt)}
            </span>
          </div>
          <p className="job_concise_description">{job.description}</p>
          <div className="job_concise_details">
            <div className="job_concise_tags">
              <h2>
                Skills:
                {job.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                  </span>
                ))}
              </h2>
            </div>
            <div className="job_concise_tags">
              <h2>
                Qualifications:
                {job.qualification.map((qual, index) => (
                  <span key={index} className="tag">
                    {qual}
                  </span>
                ))}
              </h2>
            </div>
            <p>Preferred Experience: {job.preferred_experience}</p>
            <p>
              Pay: &#8377;<strong>{job.wage}</strong> &#40; {job.working_hours} hrs/day &#41;
            </p>
          </div>
          {!job.assignedTo ? (
            <div className="proposals-count">
              Proposals: <strong>{job.proposals}</strong>
              {user.userType == "CLIENT" && !viewOnly && (
                <button className="application-button" data-bs-toggle="modal" data-bs-target={`#applicationsModal${job._id}`} onClick={() => viewApplications(job._id)}>
                  View Applications
                </button>
              )}
            </div>
          ) : (
            user.userType == "CLIENT" && !viewOnly && (
            <div className="assignment-details">
              <p>Assigned To: {job.assignedFreelancer}</p>
            </div>)
          )}
        </div>
      </div>
      <div className="modal fade" id={`applicationsModal${job._id}`} tabIndex="-1" role="dialog" aria-labelledby="applicationsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="applicationsModalLabel">
                {console.log("Applications: ", applications)}
                Job Applications: {applications.length}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{!fetchingApplications ? applications != null || applications.length > 0 ? applications.map((element) => <Applicant key={element._id} applicant={element} visitProfile={visitProfile} assignJob={assignJob}></Applicant>) : <h2 style={{ textAlign: "center" }}>No applications yet</h2> : <Buffer />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
