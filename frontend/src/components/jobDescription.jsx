import "./JobDescription.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Buffer from "./buffer";
import Applicant from "./applicant";

const JobDescription = ({ job, message, setMessage }) => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [applications, setApplications] = useState([]);
  const [fetchingApplications, setFetchingApplications] = useState(false);

  const timeSincePosted = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days} days ago` : `${hours} hours ago`;
  };

  const viewApplications = async () => {
    setFetchingApplications(true);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

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
            <span className="time-posted">{timeSincePosted(job.createdAt)}</span>
          </div>
          <p className="job_concise_description">{job.description}</p>
          <div className="job_concise_details">
            <div className="job_concise_tags">
              <div className="tag-title">Skills:</div>
              {job.skills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="job_concise_tags">
              <div className="tag-title">Qualifications:</div>
              {job.qualification.map((qual, index) => (
                <span key={index} className="tag">
                  {qual}
                </span>
              ))}
            </div>
            <p>
              Location: <strong>{job.location}</strong>
            </p>
            <p>
              Preferred Experience: <strong>{job.preferred_experience}</strong>
            </p>
            <p>
              Daily Working Hours: <strong>{job.working_hours} hrs</strong>
            </p>
            <p>
              Pay: &#8377;<strong>{job.wage}</strong>
            </p>
          </div>
          <div className="proposals-count">
            Proposals: <strong>{job.proposals}</strong>
          </div>
          {user.userType == "CLIENT" && (
            <button className="application-button" data-bs-toggle="modal" data-bs-target="#applicationsModal" onClick={() => viewApplications(job._id)}>
              See Applications
            </button>
          )}
        </div>
      </div>
      <div className="modal fade" id="applicationsModal" tabIndex="-1" role="dialog" aria-labelledby="applicationsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="applicationsModalLabel">
                Job Applications
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!fetchingApplications ? (
                applications == null || applications.length === 0 ? ( // Check for empty array
                  <h2 style={{ textAlign: "center" }}>No applications yet</h2>
                ) : (
                  applications.map((element) => (
                    <Applicant key={element._id} applicant={element}></Applicant> // Ensure a key is provided
                  ))
                )
              ) : (
                <Buffer />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
