import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/MyResume.css"; // Assuming you have a style.css file for custom styling
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateCV from './CreateCV';
import { useParams } from 'react-router-dom';

const MyResume = () => {
    const [loading, setLoading] = useState(true);
    const [resumeData, setResumeData] = useState();
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const {slug} = useParams()

    const fetchCVByUserID = async () => {
        try {
            axios
            .get(`http://localhost:9999/CV?userId=${slug}`)
            .then(res => {
                setResumeData(res.data[0]);
            })
            .catch(err => console.log(err))
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCVByUserID();
    }, []); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    };
    const handleUpdateCV = async () => {
        handleShow();
    }

    return (
        <Container>
         
                <>
                    <Row className="avatar">
                        <Col>
                            <Image src="https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg" alt="" />
                        </Col>
                    </Row>
                    <Row className="name">
                        <Col>
                            <h1>{resumeData?.basicInformation.fullName}</h1>
                            <div className="specialize">{resumeData?.basicInformation?.careerObjective}</div>
                            <ListGroup className="contact">
                                <ListGroup.Item><span>P</span> {resumeData?.basicInformation?.phone}</ListGroup.Item>
                                <ListGroup.Item><span>E</span> {resumeData?.basicInformation?.fullName}</ListGroup.Item>
                                <ListGroup.Item><span>W</span> Fer202.com</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="info">
                        <Col>
                            <ul>
                                <li>From <b>{resumeData?.education?.university}</b> - VietNam</li>
                                <li>{resumeData?.education?.graduationYear} - {resumeData?.education?.graduationYear + 5}</li>
                                <li>{resumeData?.education?.degree}</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="intro">
                        <Col>
                            <h2>INTRODUCE MYSELF</h2>
                            <p>
                                I recently graduated with a degree . Throughout my academic journey, I've developed a strong foundation in relevant skills or technologies, which I've had the opportunity to apply in various projects and internships. These experiences have not only honed my technical abilities but also taught me the importance of collaboration, adaptability, and problem-solving in a professional setting.
                            </p>
                        </Col>
                    </Row>
                    <Row className="experience">
                        <Col>
                            <h2>EXPERIENCE</h2>
                            <ul>
                                <li> Position: <b>{resumeData?.position}</b></li>
                                <li>
                                    {resumeData?.workExperience?.startDate && resumeData?.workExperience?.endDate ? (
                                        <>
                                            <span>Start Date: {formatDate(resumeData?.workExperience?.startDate)} </span><br />
                                            <span>End Date: {formatDate(resumeData?.workExperience?.endDate)}</span>
                                        </>
                                    ) : (
                                        "No dates available"
                                    )}
                                </li>
                                <li>From <b>{resumeData?.workExperience?.company}</b> </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="skills">
                        <Col>
                            <ul>
                                <h2>Technical Skills:</h2>
                                {resumeData?.skills?.technicalSkills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                                <h2>Soft Skills:</h2>
                                {resumeData?.skills?.softSkills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <Row className="project">
                        <Col>
                            
                            <Button variant="primary" onClick={handleShow}>
       Update CV
      </Button>
                        </Col>
                    </Row>
                    <>
      

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  
                </>
           
        </Container>
    );
};

export default MyResume;
