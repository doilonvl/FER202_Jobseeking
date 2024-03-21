import React, { useState, useEffect } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import "../Styles/ApplyJob.css";

const ApplyJob = () => {
  const [jobApply, setJobApply] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    if (user && user.roleId === 3) {
      axios
        .get(`http://localhost:9999/JobApplications?userId=${user.id}`)
        .then((response) => {
          setJobApply(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      axios
        .get(`http://localhost:9999/JobApplications`)
        .then((response) => {
          setJobApply(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/Jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (jobId, newStatus) => {    
    if (window.location.href.includes("/JobApplications")) {
      axios.patch(`http://localhost:9999/JobApplications`, { status: newStatus })
        .then((response) => {
          setJobApply(jobApply.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
          setAlertMessage("Status updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          setAlertMessage("Failed to update status. Please try again.");
        });
    } else {
      console.error("Invalid URL for status update.");
      setAlertMessage("Failed to update status. Invalid URL.");
    }
  };
  
  
  const handleDropdownSelect = (jobId, eventKey) => {
    setSelectedJobId(jobId);
    setEditedStatus(eventKey);
    handleStatusChange(jobId, eventKey); 
  }

  return (
    <Container className="page">
    <Row>
      {user?.roleId === 3 ? (<h1>Job apply</h1>) : (<h1>Manage Job apply</h1>)}
      
      <Col md={9}>
        {loading && <p>Loading articles...</p>}
        {jobApply.map((ja) => {
          const job = jobs.find((j) => j.id === parseInt(ja.jobId));
          return (
            <div key={ja.id}>
              <Row className="article-preview">
                <Col md="11" className="flex">
                  {job && (
                    <a href={job.image} className="size-img">
                      <img src={job.image} alt="" />
                    </a>
                  )}
                  <p>{job?.industry}</p>
                  <div className="user-detail">
                    <a className="size-img">Salary: {job?.salaryRange}</a>
                  </div>
                </Col>
                <Col md={1}>
                  {user.roleId !== 3 && (
                    <Dropdown onSelect={(eventKey) => handleDropdownSelect(ja.id, eventKey)}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <BsPencilSquare />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                        <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
                        <Dropdown.Item eventKey="Accepted">Accepted</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  <div>{ja.status}</div>
                </Col>
              </Row>
              <Link className="font-link-ar">
                <h1 className="font-title">{job?.title}</h1>
              </Link>
              <Link className="font-desc-ar">
                <p className="font-desc">{job?.description}</p>
              </Link>
            </div>
          );
        })}
      </Col>
    </Row>
    {alertMessage && (
      <div className="alert">{alertMessage}</div>
    )}
  </Container>
  );
};

export default ApplyJob;
