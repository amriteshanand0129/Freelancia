import "../css/Freelancer_Profile.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../context/userContext.jsx";
import Buffer from "../components/buffer";
import axios from "axios";
import Message from "../components/message";
import JobDescription from "../components/jobDescription";

const Freelancer_Profile = ({ viewOnly }) => {
  const { user, accessToken, isAuthenticated, isLoading } = userContext();
  const [ dropdown1, setDropdown1 ] = useState(true);
  const [ dropdown2, setDropdown2 ] = useState(true);

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedIn: "",
    twitter: "",
    skills: "",
    languages: "",
    experience: "",
    availability: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    if (viewOnly) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data.profile);
      } catch (err) {
        console.error("Error while fetching profile data:", err);
        setMessage({ error: "Failed to fetch profile data! Please try again." });
      }
    } else {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data.profile);
      } catch (err) {
        console.error("Error while fetching profile data:", err);
        setMessage({ error: "Failed to fetch profile data! Please try again." });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        github: profile.github || "",
        linkedIn: profile.linkedIn || "",
        twitter: profile.twitter || "",
        skills: profile.skills.join(", "),
        languages: profile.languages.join(", "),
        availability: profile.availability,
        location: profile.location || "Remote",
        experience: profile.experience || "BEGINNER",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    try {
      const profileUpdation_response = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateProfile`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const modalElement = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      setMessage({ message: "Profile updated successfully!" });
      fetchProfile();
    } catch (err) {
      console.error("Error:", err);
      setMessage({ error: "Failed to update profile!" });
    }
  };

  if (isLoading) {
    return (
      <>
        <Buffer></Buffer>
      </>
    );
  }

  if (!isAuthenticated) {
    return <div>You need to log in to view this profile.</div>;
  }

  if (!profile) {
    return (
      <>
        <Buffer></Buffer>
      </>
    );
  }

  return (
    <>
      {message && <Message message={message} setMessage={setMessage}></Message>}
      <div className="freelancer-profile">
        <div className="profile-header">
          <div className="profile-info">
            {!viewOnly && <img key={user.picture} src={user.picture} referrerPolicy="no-referrer" className="profileIcon_large" alt="ProfilePic" />}
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
            {!viewOnly && <img src="/edit.png" alt="" className="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setIsEditing(true)} />}
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Profile
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="profileUpdateForm">
                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">
                      Bio
                    </label>
                    <textarea name="bio" className="form-control" id="bio" rows="2" value={formData.bio} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="github" className="form-label">
                      Github
                    </label>
                    <input type="text" name="github" className="form-control" id="github" value={formData.github} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="twitter" className="form-label">
                      Twitter
                    </label>
                    <input type="text" name="twitter" className="form-control" id="twitter" value={formData.twitter} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="linkedIn" className="form-label">
                      LinkedIn
                    </label>
                    <input type="text" name="linkedIn" className="form-control" id="linkedIn" value={formData.linkedIn} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="skills" className="form-label">
                      Skills
                    </label>
                    <input type="text" name="skills" className="form-control" id="skills" placeholder="Enter skills in csv format" value={formData.skills} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="languages" className="form-label">
                      Languages
                    </label>
                    <input type="text" name="languages" className="form-control" id="languages" placeholder="Enter languages in csv format" value={formData.languages} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      Experience
                    </label>
                    <select className="form-select" name="experience" id="experience" aria-label="Default select example" value={formData.experience} onChange={handleChange}>
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="EXPERIENCED">Experienced</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Preferred Location of work
                    </label>
                    <select className="form-select" name="location" id="location" aria-label="Default select example" value={formData.location} onChange={handleChange}>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="availability" className="form-label">
                      Availability
                    </label>
                    <select className="form-select" name="availability" id="availability" aria-label="Default select example" value={formData.availability} onChange={handleChange}>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" className="btn btn-success">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <div className="left-column">
            <div className="social-links">
              <h2>Social Links</h2>
              <ul>
                {profile.github && (
                  <li>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </li>
                )}
                {profile.linkedIn && (
                  <li>
                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                )}
                {profile.twitter && (
                  <li>
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            <div className="skills-section">
              <h2>Skills</h2>
              <ul>
                {profile.skills.map((skill, index) => (
                  <li className="tags" key={index}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="languages-section">
              <h2>Languages</h2>
              <ul>
                {profile.languages.map((language, index) => (
                  <li className="tags" key={index}>
                    {language}
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability and Rate */}
            <div className="availability-rate">
              <h2>
                Availability: <li className="tags">{profile.availability}</li>
              </h2>
              <h2>
                Experience: <li className="tags">{profile.experience}</li>
              </h2>
              <h2>
                Location: <li className="tags">{profile.location}</li>
              </h2>
            </div>
          </div>

          <div className="right-column">
            <div className="bio-section">
              <h2>Bio</h2>
              <div className="bio-content">{profile.bio}</div>
            </div>
            <div className="jobs-section">
              <h2 className="job-classification" onClick={() => setDropdown1((prev) => !prev)}>Jobs Applied: {profile.jobs_applied.length}</h2>
              
              { dropdown1 && profile.jobs_applied.map((element) => (
                <JobDescription key={element._id} job={element} viewOnly={viewOnly}></JobDescription>
              ))}
              
              <h2 className="job-classification" onClick={() => setDropdown2((prev) => !prev)}>Jobs Undertaken: {profile.jobs_undertaken.length}</h2>
              {dropdown2 && profile.jobs_undertaken.map((element) => (
                <JobDescription key={element._id} job={element} viewOnly={viewOnly}></JobDescription>
              ))}
            </div>

            <div className="reviews-section">
              <h2>Reviews</h2>
              {profile.reviews && Object.keys(profile.reviews).length > 0 ? (
                <ul>
                  {Object.entries(profile.reviews).map(([reviewer, review], index) => (
                    <li key={index}>
                      {reviewer}: {review}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available</p>
              )}
              <h2>Rating:</h2> {profile.rating.toFixed(1)} ({profile.ratingCount} reviews)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Freelancer_Profile;
