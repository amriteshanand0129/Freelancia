import "../css/Applicant.css";
import React, { useState } from "react";

const Applicant = ({ applicant, visitProfile, assignJob }) => {
  const [assigning, setAssigning] = useState(false);

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
        { assigning == false ? ( <button type="button" className="btn btn-primary" style={{padding: "8px 14px"}} onClick={() => {
          setAssigning(true);
          assignJob(applicant._id)
        }}>
          Assign Job
        </button>) : (
          <div className="assign-button-buffer"></div>
        )}
      </div> 
    </div>
  );
};

export default Applicant;
