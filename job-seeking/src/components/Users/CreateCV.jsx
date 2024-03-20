import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const CreateCV = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "", // Khởi tạo userId là một chuỗi rỗng
    fullName: "",
    email: "",
    phone: "",
    careerObjective: "",
    degree: "",
    university: "",
    graduationYear: "",
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    technicalSkills: [],
    softSkills: [],
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.id) {
      setUser(userData);
      setFormData((prevState) => ({
        ...prevState,
        userId: userData.id, // Gán userId nếu userData tồn tại và có id
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.split(","),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return; // Dừng việc gửi form nếu có trường bị bỏ trống
      }
    }
    const dataSubmit = {
      userId: user?.id,
      basicInformation: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        careerObjective: formData.careerObjective,
      },
      education: {
        degree: formData.degree,
        university: formData.university,
        graduationYear: formData.graduationYear,
      },
      workExperience: {
        company: formData.company,
        position: formData.position,
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      skills: {
        technicalSkills: formData.technicalSkills,
        softSkills: formData.softSkills,
      },
    };
    try {
      const response = await axios.post("http://localhost:9999/CV", dataSubmit);
      console.log("CV created successfully:", response.data);
      alert("Tao Cv thành cong");
      navigate(`/MyResume/${user?.id}`);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error creating CV:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Personal Information */}
          <Col md={6}>
            <h4>Personal Information</h4>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="careerObjective">
              <Form.Label>Career Objective:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="careerObjective"
                value={formData.careerObjective}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* Education & Work Experience */}
          <Col md={6}>
            <h4>Education & Work Experience</h4>
            <Form.Group controlId="degree">
              <Form.Label>Degree:</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="university">
              <Form.Label>University:</Form.Label>
              <Form.Control
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="graduationYear">
              <Form.Label>Graduation Year:</Form.Label>
              <Form.Control
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="company">
              <Form.Label>Company:</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="position">
              <Form.Label>Position:</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Skills */}
        <Row>
          <Col md={6}>
            <h4>Skills</h4>
            <Form.Group controlId="technicalSkills">
              <Form.Label>Technical Skills:</Form.Label>
              <Form.Control
                type="text"
                name="technicalSkills"
                value={formData.technicalSkills}
                onChange={handleSkillsChange}
              />
            </Form.Group>
            <Form.Group controlId="softSkills">
              <Form.Label>Soft Skills:</Form.Label>
              <Form.Control
                type="text"
                name="softSkills"
                value={formData.softSkills}
                onChange={handleSkillsChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Create CV
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateCV;
