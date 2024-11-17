import React from "react";
import "./Job.css";

const Job = ({ job }) => {
  const timeSincePosted = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days} days ago` : `${hours} hours ago`;
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="time-posted">{timeSincePosted(job.createdAt)}</span>
      </div>
      <div className="posted-by">Posted by: <strong>{job.postedBy.name}</strong></div>
      <p className="job-description">{job.description}</p>
      <div className="job-details">
        <div className="job-tags">
          <div className="tag-title">Skills:</div>
          {job.skills.map((skill, index) => (
            <span key={index} className="tag">{skill}</span>
          ))}
        </div>
        <div className="job-tags">
          <div className="tag-title">Qualifications:</div>
          {job.qualification.map((qual, index) => (
            <span key={index} className="tag">{qual}</span>
          ))}
        </div>
        <p>Location: <strong>{job.location}</strong></p>
        <p>Preferred Experience: <strong>{job.preferred_experience}</strong></p>
        <p>Daily Working Hours: <strong>{job.working_hours} hrs</strong></p>
        <p>Pay: &#8377;<strong>{job.wage}</strong></p>
      </div>
      <div className="proposals-count">
        Proposals: <strong>{job.proposals}</strong>
      </div>
      <button className="apply-button">Apply</button>
    </div>
  );
};

export default Job;