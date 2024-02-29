import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (username === '' || email === '' || password === '' || rePassword === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address!',
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 6 characters long and contain at least one number!',
      });
      return;
    }
    if (password !== rePassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      const registerResponse = await axios.post(
        'http://localhost:9999/Users',
        {
          username,
          password,
          email,
          roleId: 3,
        }
      );

      const user = registerResponse.data;

      if (user && user.username) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      } else {
        console.error('Unexpected response format:', user);
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'Unexpected response format. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: 'An error occurred while registering. Please try again later.',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: '600px' }}>
        <div className="card-header text-center">
          <h2>Sign up</h2>
          <Link to="/login" style={{ color: '#ccda8d', textDecoration: 'none' }}>
            Have an account?
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group text-left Emailcss">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="pass"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="rePassword">Re-enter Password</label>
              <input
                type="password"
                id="rePass"
                className="form-control"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Re-enter Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ float: 'right', marginTop: '20px' }}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
