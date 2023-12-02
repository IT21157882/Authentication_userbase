import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup  />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
