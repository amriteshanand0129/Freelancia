import "./Applicant.css";
import React from "react";

const Applicant = ({ applicant }) => {
  return (
    <div className="applicant">
      <span className="name">{applicant.name}</span>
      <span className="experience">{applicant.experience}</span>
      <p>{applicant.email}</p>
      <p>Rating: {applicant.rating} <>&#40;{applicant.ratingCount}&#41;</></p>
      <button type="button" className="btn btn-primary" onClick={() => assignJob(applicant._id)}>
          Assign Job
        </button>
    </div>
  );
};

export default Applicant;
