import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.role === "Admin") {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center display-5">Login</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-success text-center mt-3">
                Login
              </button>
            </div>
          </form>
          <div className="form-group text-center mt-2">
            <p>
              You haven't account, <Link to="/Signup/">Sign up here</Link>.
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
}

export default Login;
