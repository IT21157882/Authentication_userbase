import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

  const [suc, setsuc] = useState('')
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:3001/dashboard')
      .then((res) => {
       if (res.data === "success") {
         setsuc("success ok")
       } else {
         navigate("/dashboard")
       }
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
