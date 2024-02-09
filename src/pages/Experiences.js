import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import "./home.css";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

function Experience() {
  const location = useLocation();
  let authorID = "";
  
  if (location.state && location.state.authorID) {
    authorID = location.state.authorID;
  }
  
  // Rest of your code
  
  const user = localStorage.getItem("name");
  const loggedIn = localStorage.getItem("loggedIn");
  const userID = localStorage.getItem("_id");
  const [experience, setExperience] = useState([]);

  const [experinceID, setExperienceID] = useState("");

  const [darkMode, setDarkMode] = useState("light");
  const navigate = useNavigate();

  const [limit] = useState(1);
  const [skip, setSkip] = useState(0);

  //console.log(questions);

  const previousPage = () => {
    setSkip(skip - limit);
    console.log(experience);
                  
    console.log(userID);
      console.log(user);
      
  };

  const nextPage = () => {
    setSkip(skip + limit);
    console.log(userID);
      console.log(user);
      
  };

  useEffect(() => {
    getExperience(limit, skip);
    setDarkMode(localStorage.getItem("darkMode"));
  }, [skip, limit]);

  const editor = useRef(null);

  const config = {
    readonly: false,
    height: "85vh",
  };

 /* function onTextChange(e) {
    let queryText = e.target.value.toLowerCase();
    console.log(queryText.length);
    if (queryText.length === 0) {
      axios
        .get(`/getallexperiences`)
        .then((res) => {
          if (res) {
            setExperience(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let resQues = experience.filter((e) => {
        let dataFilter = e.query.toLowerCase();
        return dataFilter.indexOf(queryText) !== -1;
      });
      setExperience(resQues);
    }
  }
*/
  // function giveAnswer(query,id){
  //   setShowForm(true);
  //   setQuestionID(id);
  //   setQuery(query);
  // }

  // function hideForm(){
  //   setShowForm(false);
  // }

  // function showAnswers(id,query,tags){
  //   axios.get(`/getanswers?id=${id}`).then(res => {
  //       if(res){
  //         setAnswers(res.data);
  //         setQuery(query);
  //         setTags(tags);
  //         setQuestionID(id);
  //       }
  //   }).catch(err => {
  //       console.log(err);
  //   });
  //   setShowAnswer(true);
  // }

  // function hideAnswers(){
  //   if(questionID){
  //     axios.post(`/addview?id=${questionID}`, {
  //       view : 1
  //     }).then(res => {
  //       if(res){
  //         //toast("View Added Success!");
  //         getQuestions();
  //         window.location.reload();
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }else{
  //     toast("Something Went Wrong!!");
  //   }
  //   setShowAnswer(false);
  // }

  const getExperience = (limit, skip) => {
    axios
      .get(`/getallexperiences?limit=${limit}&skip=${skip}`)
      .then((res) => {
        if (res) {
          setExperience(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`homeContainer ${darkMode === "light" ? "light" : "dark"}`}>
      <Header />
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
        <div className="searchFilter">
          <h4
            className={`totalQues  ${darkMode === "light" ? "light" : "dark"}`}
          >
           {/* Total Experience: {experience.length}*/}
          </h4>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary btn-sm mt-2"
              onClick={previousPage}
            >
              {" "}
              Previous Page{" "}
            </button>
            <button
              className="btn btn-primary btn-sm mt-2 ms-2"
              onClick={nextPage}
            >
              {" "}
              Next Page{" "}
            </button>
          </div>
        </div>
        {experience.length > 0 ? (
          experience.map((experience, index) => {
            return (
              <div className="homequery shadow-sm" key={index}>
                <h3> {experience.expname}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: experience.query }}
                />{" "}
                <br></br>
                <div className="footer">
                  <span className="highlight">Batch:</span> {experience.year} <br></br>
                  <span className="highlight"> LinkedIn: </span>{experience.authorlinkedin}
                  <br></br>
                  <span className="highlight">Email: </span>{experience.authoremail}
                  <br></br>
                  <span className="highlight">Contact: </span>{experience.authorcontact}
                </div>
                <div className="footer">
                  Shared by{" "}
                  
                  <span className="highlight">  {experience.author}</span>
                  {" "}
                  {moment(experience.createdAt).fromNow()} works in{" "}
                   
                  <span className="highlight"> {experience.company}</span>
                  {" "}
                  
                </div>
              </div>
            );
          })
        ) : (
          <div className="notFound">No Experience Found</div>
        )}
      </div>
    </div>
  );
}

export default Experience;
