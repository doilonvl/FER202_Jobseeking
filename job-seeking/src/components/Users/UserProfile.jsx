import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Profile.css";
import Login from "./Login";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleImageClick = () => {
    // Trigger file input click when the image is clicked
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setUser({ ...user, avatar: event.target.result });
        localStorage.setItem("user", JSON.stringify({ ...user, avatar: event.target.result }));
        axios.patch(`http://localhost:9999/Users/${user.id}`, { ...user, avatar: event.target.result })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Avatar updated successfully!",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((error) => {
            console.error("Error updating avatar:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred while updating your avatar. Please try again later.",
              confirmButtonText: "OK"
            });
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to save changes to your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (user.username === "" || user.email === "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all the required fields.",
            confirmButtonText: "OK"
          });
          return;
        }
        
        try {
          await axios.patch(`http://localhost:9999/Users/${user.id}`, user);
          setEditMode(false);
          localStorage.setItem("user", JSON.stringify(user));
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.error("Error submitting data:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while updating your profile. Please try again later.",
            confirmButtonText: "OK"
          });
        }
      }
    });
  };
  

  return (
    <Container style={{ marginTop: "2%" }}>
      {user === null ? (
        <Login />
      ) : (
        
        <div className=" bootstrap snippets bootdey">
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#" className="img_hover" onClick={handleImageClick}>
                    {user.avatar != null ? (
                      <img src={user.avatar} alt="" />
                    ) : (
                      <img src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0OTMxNTc0Njc1NzQzOTA2/avatar-3-evil-navi-james-cameron.jpg" alt="" />
                    )}
                  </a>
                </div>
                <ul className="nav nav-pills nav-stacked">
                  <li className="active">
                    <a href="/profile">
                      {" "}
                      <i className="fa fa-user"></i> Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={handleEditClick}>
                      {" "}
                      <i className="fa fa-edit"></i> Edit profile
                    </a>
                  </li>
                </ul>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} accept="image/*" />
              </div>
            </div>
            <div className="profile-info col-md-9" style={{ borderRadius: "6px" }}>
              <div className="panel">
                <div className="bio-graph-heading">
                  Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna
                  metus.
                </div>
                <div className="panel-body bio-graph-info">
                  <h1>Bio Graph</h1>
                  <div className="row">
                    <div className="col-md-6">
                      <form>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={user.username}
                            readOnly={!editMode}
                            placeholder="Enter your name"
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone number</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={user.phoneNumber}
                            readOnly={!editMode}
                            placeholder="Enter your phone number"
                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6">
                      <form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={user.email}
                            readOnly={!editMode}
                            placeholder="Enter your email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={user.address}
                            readOnly={!editMode}
                            placeholder="Enter your address"
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  {editMode && (
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
