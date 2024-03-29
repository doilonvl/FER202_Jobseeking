import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { saveJob, unsaveJob } from "../api/jobs.api";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    location: '',
    industry: '',
    jobType: '',
    salaryRange: ''
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [noJobsFound, setNoJobsFound] = useState(false);
  useEffect(() => {
    fetch('http://localhost:9999/Jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(filterJobs);
    setFilteredJobs(filtered);
    if (filtered.length === 0) {
      setNoJobsFound(true);
    } else {
      setNoJobsFound(false);
    }
  }, [filter, jobs]);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const filterJobs = (job) => {
    if (filter.location && job.location !== filter.location) return false;
    if (filter.industry && job.industry !== filter.industry) return false;
    if (filter.jobType && job.jobType !== filter.jobType) return false;
    if (filter.salaryRange && job.salaryRange !== filter.salaryRange) return false;
    return true;
  };

  return (
    <div className="container fluid">
      <h1 className="text-center mt-4">Danh sách công việc</h1>
      
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Địa điểm</Form.Label>
              <Form.Control name="location" as="select" value={filter.location} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Dallas">Dallas</option>
                <option value="Boston">Boston</option>
                <option value="Seattle">Seattle</option>
                <option value="Austin">Austin</option>
                <option value="Miami">Miami</option>
                <option value="Atlanta">Atlanta</option>
                <option value="Philadelphia">Philadelphia</option>
                <option value="Denver">Denver</option>
                <option value="Phoenix">Phoenix</option>
                <option value="San Diego">San Diego</option>
                <option value="Detroit">Detroit</option>
                <option value="Washington D.C.">Washington D.C.</option>


                
                {/* Thêm các lựa chọn khác nếu cần */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ngành nghề</Form.Label>
              <Form.Control name="industry" as="select" value={filter.industry} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Writing">Writing</option>
                <option value="Management">Management</option>
                <option value="Legal">Legal</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Legal">Legal</option>
                <option value="Event Planning">Event Planning</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Administration">Administration</option>
                
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Loại công việc</Form.Label>
              <Form.Control name="jobType" as="select" value={filter.jobType} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                {/* Thêm các lựa chọn khác nếu cần */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Mức lương</Form.Label>
              <Form.Control name="salaryRange" as="select" value={filter.salaryRange} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="$80,000 - $100,000">$80,000 - $100,000</option>
                <option value="$60,000 - $80,000">$60,000 - $80,000</option>
                <option value="$$40,000 - $60,000">$40,000 - $60,000</option>
                <option value="$60,000 - $80,000">$60,000 - $80,000</option>
                <option value="$70,000 - $90,000">$70,000 - $90,000</option>
                <option value="$50,000 - $70,000">$50,000 - $70,000</option>
                <option value="$30,000 - $40,000">$30,000 - $40,000</option>
                {/* Thêm các lựa chọn khác nếu cần */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {noJobsFound ? (
        <div className="text-center">Không tìm thấy công việc phù hợp.</div>
      ) : (
        <Row className="job-cards">
          {filteredJobs.map(job => (
            <Col key={job.id} xs={12} sm={6} md={4} lg={0}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

function JobCard({ job }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  const nav = useNavigate()
  const handleSaveJob = async () => {
    if(user === null) {
      nav("/login")
    }
    try {
        const userId = user.id;
        const jobId = job.id;

        const response = await axios.get(`http://localhost:9999/SavedJobs?userId=${userId}&jobId=${jobId}`);
        
        if (response.data.length > 0) {
            alert('Job already saved!');
            return; 
        }

        await axios.post(`http://localhost:9999/SavedJobs`, { userId, jobId });
        alert('Job saved successfully!');
    } catch (error) {
        console.error('Error saving job:', error);
        alert('You need account to save job.');
    }
};

  return (
    <Card className="job-card mb-4">
      <Card.Img variant="top" src={job.image} alt={job.title} />
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text className="company-name">{job.companyName}</Card.Text>
        <Card.Text className="job-location">{job.location}</Card.Text>
        <Card.Text className="job-salary">{job.salaryRange}</Card.Text>
        <Card.Text className="job-type">{job.jobType}</Card.Text>
        <Link to={`/job/${job.id}`}>
          <Button variant="info">Detail</Button>
        </Link>
        <Link>
          <Button variant="warning" onClick={handleSaveJob} style={{float:"right"}}>Save job</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default JobList;
