import React, { useState, useEffect } from "react";
import './addquestion.css'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import Defaultuser from '../assets/images/defaultuser.jpg';
import {MdCalendarViewMonth,MdLocationOn,MdLink} from "react-icons/md";
import { FaTwitterSquare,FaGithubSquare} from "react-icons/fa";
import moment from 'moment';
import { useLocation, Link, useNavigate} from "react-router-dom";

const baseUrl = 'https://davvinterviewbook-back.onrender.com'

function PublicProfile() {
  /*current user object */
  console.log("Public Profile Called");
  const locationData = useLocation();
let userID = {};

if (locationData.state && locationData.state.userID) {
  userID = locationData.state.userID;
} else {
  userID = localStorage.getItem("_id");
}

  const navigate = useNavigate();
  //console.log(userID) 
  const [darkMode, setDarkMode] = useState('light');
  const loggedIn = localStorage.getItem("loggedIn"); 
  const [about, setAbout] = useState('');
  const [ucategory, setUCategory] = useState('');
  
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [wlink, setWLink] = useState('');
  const [tusername, setTUsename] = useState('');
  const [gusername, setGUsername] = useState('');
  const [createdAt, setCreatedAt] = useState('');
    useEffect(()=>{
        setDarkMode(localStorage.getItem("darkMode"));
        axios.get(`${baseUrl}/getuser?userID=${userID}`)
            .then(res => {
                if(res.data){
                    setName(res.data[0].name);
                    setUCategory(res.data[0].ucategory);
                    setPhoto(res.data[0].photo);
                    setLocation(res.data[0].location);
                    setAbout(res.data[0].about);
                    setTitle(res.data[0].title);
                    setWLink(res.data[0].wlink);
                    setTUsename(res.data[0].tusername);
                    setGUsername(res.data[0].gusername);
                    setCreatedAt(res.data[0].updatedAt)
                }
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    return (
        <div className={`dashboardContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
            <Header/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container">
                <div className="row">
                    <div className=" adminContent addQuestion">
                        <div className="row">
                            <div className=" mt-3">
                                <h3>Profile</h3>
                            </div>
                            <div className="col-sm-2 mt-3">
                                <img className="profilePhoto" src={photo ? require('../uploads/'+photo) : Defaultuser } alt={name} width={150}/>
                            </div>
                            <div className="col-sm-10 mt-3">
                                <h3>{name}</h3>
                                <h5>{ucategory}</h5>
                                <h5>{title}</h5>
                                <label><MdCalendarViewMonth/> Member since {moment(createdAt).fromNow()}</label>
                                <label><MdLocationOn/> {location}</label>
                                <label>
                                    <a target='_blank' rel="noopener noreferrer" href={wlink} className='plink' title={wlink}><MdLink/> {wlink}</a>
                                    <a target='_blank' rel="noopener noreferrer" href={tusername} className='plink ms-2' title={tusername}><FaTwitterSquare/></a>
                                    <a target='_blank' rel="noopener noreferrer" href={gusername} className='plink ms-2' title={gusername}><FaGithubSquare/></a>
                                </label>
                                
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>About me</label>
                                <label><span dangerouslySetInnerHTML={{__html: about}} /></label>
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
    )
}


export default PublicProfile

