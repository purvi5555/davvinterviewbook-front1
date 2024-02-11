import React, {useState, useEffect} from 'react';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import './Header.css'
import {useNavigate} from 'react-router-dom';

/*react-toastify : show toast notifications in your application */
/*Toast : The toast function is used to trigger a toast notification and an call this function with
 different parameters to customize the content and appearance of the toast.
 */
/*ToastContainer : manage the positioning and styling of the toasts. */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LightIcon from '../assets/images/lightmode.png';
import DarkIcon from '../assets/images/darkmode.png';
import Logo from '../assets/images/DAVV_logo.png';
const baseUrl = 'https://davvinterviewbook-back.onrender.com'

function Header() {

  const [loggedIn, setLoggedIn] = useState('');
  const [darkMode, setDarkMode] = useState('light');
  const navigate = useNavigate();
  
  /*useEffect hook is used to perform side effects in your functional components. Side effects might include data fetching, subscriptions, manual DOM manipulations, 
  or other operations that need to be performed after the component has rendered. */
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    setDarkMode(localStorage.getItem("darkMode"));
  }, [])

  function signOut(){
    localStorage.clear()
    window.location.reload()
    navigate(`${baseUrl}/login`);
    toast('Logged Out Successfull!');
  }
  const lightDarkMode = () => {
    if(darkMode === 'light'){
      setDarkMode('dark');
      localStorage.setItem("darkMode", 'dark');
      window.location.reload()
    }else{
      setDarkMode('light')
      localStorage.setItem("darkMode", 'light');
      window.location.reload()
    }
  }

  return (
    <Navbar expand="lg" className={`fixed-top shadow-sm  ${darkMode === 'light' ? 'light' : 'dark' }`}>
      <Container>
      <div class="logod">
      <a href="#home"><img width="42px" height="42px" src={Logo}/></a>
    </div>
        <Link className='logo'>DAVV InterviewBook</Link>
        {/*toggle for the Navbar's content on small screen */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/*grouping and hide Navbar content on small screen */}
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
          >
            <Link to="/">Questions</Link>
            <Link to="/allexperiences">Experiences</Link>
            {loggedIn === 'true' ?
            <div>
              <Link to="/dashboard">Dashboard</Link>
              <Link to='/' onClick={signOut}>Logout</Link>
            </div>
            :
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
            }
            <div
              onClick={lightDarkMode}
              className="lightDarkMode"
            >
              {darkMode === 'light' 
              ? 
              <img src={LightIcon} alt="Light Mode"/>
              :
              <img src={DarkIcon} alt="Dark Mode"/>
              }
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer 
      position="top-right"
      autoClose={10000}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover />
    </Navbar>
  )
}

export default Header