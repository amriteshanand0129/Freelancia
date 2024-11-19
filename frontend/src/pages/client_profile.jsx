import "./Client_Profile.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../components/navbar";
import Buffer from "../components/buffer";
import Message from "../components/message";
import JobDescription from "../components/jobDescription";

const Client_Profile = () => {

  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    bio: "",
    linkedIn: "",
    twitter: "",
    languages: "",
  });

  const fetchProfile = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

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
        linkedIn: profile.linkedIn || "",
        twitter: profile.twitter || "",
        languages: profile.languages.join(", "),
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
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

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
        <Navbar></Navbar>
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
        <Navbar></Navbar>
        <Buffer></Buffer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {message && <Message message={message} setMessage={setMessage}></Message>}
      <div className="freelancer-profile">
        <div className="profile-header">
          <div className="profile-info">
            <img key={user.picture} src={user.picture} referrerPolicy="no-referrer" className="profileIcon_large" alt="ProfilePic" />
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
            <img src="/edit.png" alt="" className="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setIsEditing(true)} />
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
                    <label htmlFor="languages" className="form-label">
                      Languages
                    </label>
                    <input type="text" name="languages" className="form-control" id="languages" placeholder="Enter languages in csv format" value={formData.languages} onChange={handleChange} />
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
          </div>

          <div className="right-column">
            <div className="bio-section">
              <h2>Bio</h2>
              <div className="bio-content">{profile.bio}</div>
            </div>
            <div className="jobs-section">
              <h2>Jobs Posted: {profile.jobs_posted.length}</h2>
              {profile.jobs_posted.map((element) => (
                <JobDescription key={element._id} job={element} message={message} setMessage={setMessage}></JobDescription>
              ))}
              <h2>Jobs Assigned: {profile.jobs_assigned.length}</h2>
            </div>

            <div className="reviews-section">
              <h2>Reviews</h2>
              {profile.reviews && Object.keys(profile.reviews).length > 0 ? (
                <ul>
                  {Object.entries(profile.reviews).map(([reviewer, review], index) => (
                    <li key={index}>
                      <strong>{reviewer}:</strong> {review}
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

export default Client_Profile;
