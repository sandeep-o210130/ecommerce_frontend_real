import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/auth/register", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", email);
        window.location.href = "/";
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 border rounded shadow bg-white" style={{ width: "400px" }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
