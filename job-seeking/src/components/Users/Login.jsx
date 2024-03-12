import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address!",
      });
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:9999/Users?email=${email}&password=${password}`
      );
      const user = response.data[0];
      if (user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("user", JSON.stringify(user));
        nav("/home");
        
        window.location.reload();
      } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login failed. Please check your email and password.",
          });
          return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred during login.",
      });
      return;
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "600px" }}>
        <div className="card-header text-center">
          <h2>Sign in</h2>
          <Link
            to="/register"
            style={{ color: "#ccda8d", textDecoration: "none" }}
          >
            Need an account?
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="Email">Email</label>
            <div className="form-group text-left Emailcss">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="Password">Password</label>
            <div className="form-group text-left">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ float: "right", marginTop: "20px" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
