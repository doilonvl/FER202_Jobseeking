import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateCV = () => {
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        userId: user.id,
        fullName: '',
        email: '',
        phone: '',
        careerObjective: '',
        degree: '',
        university: '',
        graduationYear: '',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        technicalSkills: [],
        softSkills: []
    });
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData)
    },[])
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSkillsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.split(',')
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/CV', formData);
            console.log('CV created successfully:', response.data);
            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            console.error('Error creating CV:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Phone:
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label>
                Career Objective:
                <textarea name="careerObjective" value={formData.careerObjective} onChange={handleChange} />
            </label>
            {/* Education Fields */}
            <label>
                Degree:
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} />
            </label>
            <label>
                University:
                <input type="text" name="university" value={formData.university} onChange={handleChange} />
            </label>
            <label>
                Graduation Year:
                <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
            </label>
            {/* Work Experience Fields */}
            <label>
                Company:
                <input type="text" name="company" value={formData.company} onChange={handleChange} />
            </label>
            <label>
                Position:
                <input type="text" name="position" value={formData.position} onChange={handleChange} />
            </label>
            <label>
                Start Date:
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </label>
            <label>
                End Date:
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </label>
            {/* Skills Fields */}
            <label>
                Technical Skills (comma-separated):
                <input type="text" name="technicalSkills" value={formData.technicalSkills} onChange={handleSkillsChange} />
            </label>
            <label>
                Soft Skills (comma-separated):
                <input type="text" name="softSkills" value={formData.softSkills} onChange={handleSkillsChange} />
            </label>
            <button type="submit" >Create CV</button>
        </form>
    );
};

export default CreateCV;
