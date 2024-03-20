import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const JobDetail = () => {
  const { jId } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
    const nav= useNavigate()
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  const fetchCVByUserID = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/CV?userId=${user?.id}`);
      console.log(response.data);
      setResumeData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCVByUserID();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9999/Jobs/${jId}`)
      .then((response) => response.json())
      .then((data) => setJobDetail(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [jId]);

  const handleApplyNow = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/JobApplications?userId=${user.id}&jobId=${jId}`);
      if (response.data.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'CV already applied for this job',
          text: 'You have already applied for this job.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } else {
        const currentDate = new Date().toLocaleDateString("en-US");
        const postData = {
          userId: user.id,
          jobId: jId,
          applicationDate: currentDate,
          status: "Pending",
        };
        await axios.post("http://localhost:9999/JobApplications", postData);
        setShowModal(false);
        Swal.fire({
          icon: 'success',
          title: 'CV submitted successfully!',
          text: 'Your CV has been submitted successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error checking job application:", error);
      setError(error);
    }
  };
  

  const handleShowModal = () => {
    if(user){
        setShowModal(true);
    }else{
        nav("/login")
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <Container fluid style={{ marginTop: "1%", width: "90%" }}>
      {jobDetail && (
        <>
          <Row className="avatar">
            <Col>
              <Image src={jobDetail.image} alt={jobDetail.image} />
            </Col>
          </Row>
          <Row className="name">
            <Col>
              <h1>{jobDetail.title}</h1>
              <div className="specialize">{jobDetail.companyName} </div>
              <ListGroup className="contact">
                <ListGroup.Item>
                  <span>J</span> {jobDetail.location}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>O</span> {jobDetail.industry}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>B</span> {jobDetail.jobType}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="intro">
            <Col>
              <h2>{jobDetail.salaryRange}</h2>
              <p>{jobDetail.description}</p>
            </Col>
          </Row>
          <Row className="experience">
            <Col>
              <h2>EXPERIENCE REQUIRE</h2>
              <ul>
                <li>
                  {" "}
                  <b>{jobDetail.requiredExperience} year</b>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="skills">
            <Col>
              <ul>
                <h2>Skills require:</h2>
                {jobDetail.skills.split(",").map((skill, index) => (
                  <li
                    key={index}
                    style={{
                      display: "inline-block",
                      backgroundColor: "gray",
                      color: "#fff",
                      padding: "4px 8px",
                      marginRight: "8px",
                      marginBottom: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    {skill.trim()}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="project">
            <Col>
              <Button variant="primary" onClick={handleShowModal}>
                Apply Now
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>Personal CV</Card.Title>
              <Form>
                {resumeData?.basicInformation !== null ? (<>
                    <Form.Group controlId="formFullName">
                  <Form.Label>Full Name: {resumeData?.basicInformation?.fullName}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number: {resumeData?.basicInformation?.phone}</Form.Label>
                </Form.Group>
                </>) : ""}
                
                <Form.Group controlId="formDegree">
                  <Form.Label>Degree: {resumeData?.education?.degree}</Form.Label>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <span style={{ color: "red" }}>* Lưu ý:</span>
          <p>
            JobPortal khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình
            tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc
            làm trước khi ứng tuyển. Ứng viên cần có trách nhiệm với hành vi ứng
            tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên
            lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho JobPortal qua
            email hotro@JobPortal.vn để được hỗ trợ kịp thời.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleApplyNow}>Submit CV</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JobDetail;
