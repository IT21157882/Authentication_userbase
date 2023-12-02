import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3001/register', {name, email, password, phone})
      .then((re) => {
        alert("created")
      }).catch((err) => {
        console.log(err)
      })

    }

  return (
    <div>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">Sign Up</h1>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required // This field is required
              />
            </div> 
            <div className="form-group">
              <label>Phone No.</label>
              <input
                type="tel"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group mt-3">
              <button className="btn btn-success">Register</button>
            </div>
          </form>
          <div className="form-group text-center mt-2">
            <p>
              You have an account, <Link to="/login">Login here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
