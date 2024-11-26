
import React, { useState } from "react";
import "../css/jobPostModal.css";

const JobPostModal = ({ postJob }) => {
  const [posting, setPosting] = useState(false);
  return (
    <>
      <div className="job-posting-container">
        <p className="job-posting-text">
          <strong>Looking for top talent?</strong>
          <br />
          Take the first step towards finding the perfect freelancer! Post your job today and let skilled professionals bring your ideas to life.
        </p>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Post Job
        </button>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Post New Job
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postJob} id="jobPostForm">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Job Title
                  </label>
                  <input type="text" name="title" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea className="form-control" id="description" rows="2"></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Required Skills
                  </label>
                  <input type="text" name="skills" className="form-control" id="skills" placeholder="Enter skills in csv format" />
                </div>
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Required Qualifications
                  </label>
                  <input type="text" name="qualification" className="form-control" id="qualification" placeholder="Enter qualifications in csv format" />
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">
                    Preferred Experience
                  </label>
                  <select className="form-select" name="experience" id="experience" aria-label="Default select example">
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="EXPERIENCED">Experienced</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <select className="form-select" name="location" id="location" aria-label="Default select example">
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="working_hours" className="form-label">
                    Daily Working Hours
                  </label>
                  <input type="number" min="1" max="16" className="form-control" name="working_hours" />
                </div>
                <div className="mb-3">
                  <label htmlFor="wage" className="form-label">
                    Pay
                  </label>
                  <input type="number" min="1" className="form-control" id="wage" name="wage" aria-describedby="wagehelp" />
                  <div id="wagehelp" className="form-text">
                    Preferred Pay for <strong>Complete</strong> project in Rupees
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  { posting == false ? ( <button type="submit" className="btn btn-success">
                    Post
                  </button> ) : (
                    <div className="post-button-buffer"></div>
                  ) }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostModal;
