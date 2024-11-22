import "../css/Applicant.css";
import React from "react";

const Applicant = ({ applicant, visitProfile }) => {
  
  return (
    <div className="applicant">
      <span className="name">{applicant.name}</span>
      <span className="experience">{applicant.experience}</span>
      <p>{applicant.email}</p>
      <p>Rating: {applicant.rating} <>&#40;{applicant.ratingCount}&#41;</></p>
      <div className="buttons">
        <button type="button" className="btn btn-primary" style={{padding: "8px 14px"}} onClick={() => visitProfile(applicant._id)}>
          View Profile
        </button>
        <button type="button" className="btn btn-primary" style={{padding: "8px 14px"}} onClick={() => assignJob(applicant._id)}>
          Assign Job
        </button>
      </div>
    </div>
  );
};

export default Applicant;
