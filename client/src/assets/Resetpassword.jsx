import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {id, token} = useParams();

  axios.defaults.withCredentials = true;
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.status === "success") {
            navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center display-5">Reset Password</h1>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-success text-center mt-3">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </>
  );
}

export default ResetPassword;
