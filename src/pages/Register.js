import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../pages/Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ucategory, setUCategory] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState("light");
  const [selectedCategory, setSelectedCategory] = useState("User Category"); // New state
  

  const registerForm = () => {
    if (name === "" && email === "" && password === "" && ucategory === "") {
      alert("Please Fill All Input Fields");
    } else {
      axios
        .post("http://localhost:5000/register", {
          name: name,
          email: email,
          password: password,
          ucategory: ucategory,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/login";
            toast("Registered Successfully!");
          } else {
            window.location.href = "/";
          }
        });
    }
  };
  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode"));
  }, []);
  const inputsHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "ucategory") {
      setUCategory(value);
    }
  };
  return (
    <div className={`authContainer ${darkMode === "light" ? "light" : "dark"}`}>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="authForm px-5 shadow">
        <h2 className="mb-5">Register</h2>
        <Form.Group className="mb-3" >
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={name}
            required
            onChange={inputsHandler}
          />
        </Form.Group>
       < Form.Group className="mb-3" >
        <div className="selected-category">{selectedCategory}</div>
        <select name="ucategory" value={ucategory} onChange={inputsHandler}>
          <option value="" disabled>
            User Category
          </option>
          <option value="senior">Senior</option>
          <option value="junior">Junior</option>
          <option value="faculty">Faculty</option>
        </select>
      </Form.Group>
      
        <Form.Group className="mb-3" >
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            required
            onChange={inputsHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            required
            onChange={inputsHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={registerForm}>
          Register
        </Button>
        <div className="mt-3">Already Registered ?</div>
        <div className="mt-3">
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
