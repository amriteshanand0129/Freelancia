import "../css/Applicant.css";
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const Applicant = ({ applicant }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/user/${applicant._id}`);
  };
  return (
    <div className="applicant">
      <span className="name">{applicant.name}</span>
      <span className="experience">{applicant.experience}</span>
      <p>{applicant.email}</p>
      <p>
        Rating: {applicant.rating} <>&#40;{applicant.ratingCount}&#41;</>
      </p>
      <div className="buttons">
        <button type="button" className="btn btn-primary" onClick={visitProfile}>
          Visit Profile
        </button>
        <button type="button" className="btn btn-primary" onClick={() => assignJob(applicant._id)}>
          Assign Job
        </button>
      </div>
    </div>
  );
};

export default Applicant;
