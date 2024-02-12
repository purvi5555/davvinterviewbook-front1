import React,{useEffect,useState}  from 'react'
import './sidebar.css'
import {NavLink} from 'react-router-dom';
import {MdDashboard,MdSubject,MdPeople} from "react-icons/md";
const baseUrl = 'https://davvinterviewbook-back.onrender.com'

function Sidebar() {
  const [userID, setUserID] = useState('');
  const [ucategory, setUCategory] = useState('');

  useEffect(() => {
    setUserID(localStorage.getItem("_id"));
    setUCategory(localStorage.getItem('ucategory'));
          
  }, []) 
    return (
        <div className="sidebar">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/dashboard">
                    <MdDashboard/>
                    Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to={`/profile/${userID}`}>
                    <MdPeople/>
                    Profile
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle">
                    <MdSubject/>
                    Questions
                </div>
                <div className="dropdown-menu show">
                  <NavLink className="dropdown-item" activeclassname="active" to="/allquestions">My Questions</NavLink>
                  <NavLink className="dropdown-item" activeclassname="active" to="/addquestion">Ask Question</NavLink>
                </div>
              </li>
              {ucategory !== 'junior' && (
               
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle">
                    <MdSubject/>
                    Experience
                </div>
                <div className="dropdown-menu show">
                <NavLink className="dropdown-item" activeClassName="active" to="/addexperience">
               Add Experience
                </NavLink>
    
              </div>
              </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to={`/editprofile/${userID}`}>
                    <MdPeople/>
                    Edit Profile
                </NavLink>
              </li>
            </ul>
        </div>
    )
}

export default Sidebar
