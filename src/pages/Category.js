import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import "./home.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from "jodit-react";
import moment from "moment";
import Close from "@mui/icons-material/Close";
import LikesDislikes from "../components/LikesDislikes";
import jsPDF from 'jspdf';

const baseUrl = 'https://davvinterviewbook-back.onrender.com'


function Category() {
  const location = useLocation();
  let categoryID = "";
  if (location.state) {
    categoryID = location.state.categoryID;
  }
  const user = localStorage.getItem("name");
  const loggedIn = localStorage.getItem("loggedIn");
  const [query, setQuery] = useState("");
  const userID = localStorage.getItem("_id");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionID, setQuestionID] = useState("");
  const ucategory = localStorage.getItem("ucategory");
  const [showForm, setShowForm] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();
  const [ans, setAns] = useState("");
  const [darkMode, setDarkMode] = useState("light");
  const [tags, setTags] = useState([]);
  const [limit] = useState(3);
  const [skip, setSkip] = useState(0);

  //console.log(answers);

  const editor = useRef(null);

  const config = {
    readonly: false,
    height: "60vh",
  };
  //download pdf 
  const downloadPDF = () => {
    const pdf = new jsPDF();

    questions.forEach((question, index) => {
      pdf.text(`Question ${index + 1}`, 10, index * 50 + 10);
      pdf.text(question.query, 10, index * 50 + 20);
      // Add more formatting as needed
    });

    pdf.save('questions.pdf');
  };

  function giveAnswer(id) {
    setShowForm(!showForm);
    setQuestionID(id);
  }

  function hideForm() {
    setShowForm(false);
  }

  function showAnswers(id, query, tags) {
    axios
      .get(`${baseUrl}/getanswers?id=${id}`)
      .then((res) => {
        if (res) {
          setAnswers(res.data);
          setQuery(query);
          setTags(tags);
          setQuestionID(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShowAnswer(true);
  }

  function hideAnswers() {
    if (questionID) {
      axios
        .post(`${baseUrl}/addview?id=${questionID}`, {
          view: 1,
        })
        .then((res) => {
          if (res) {
            //toast("View Added Success!");
            getQuestions();
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast("Something Went Wrong!!");
    }
    setShowAnswer(false);
  }

  const previousPage = () => {
    setSkip(skip - limit);
  };

  const nextPage = () => {
    setSkip(skip + limit);
  };

  useEffect(() => {
    getQuestions(skip, limit);
    setDarkMode(localStorage.getItem("darkMode"));
  }, [skip, limit]);

  const getQuestions = (skip, limit) => {
    axios
      .get(
        `${baseUrl}/getcquestions?categoryID=${categoryID}&limit=${limit}&skip=${skip}`
      )
      .then((res) => {
        if (res) {
          setQuestions(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ans) {
      axios
        .post(`${baseUrl}/addanswer?id=${questionID}`, {
          answer: ans,
          user: user,
          userID: userID,
        })
        .then((res) => {
          if (res) {
            toast("Answer Added Success!");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast("Pill fill the Textbox!");
    }
  };

  const handleUpdate = (e) => {
    setAns(e);
  };

  function onTextChange(e) {
    let queryText = e.target.value.toLowerCase();
    console.log(queryText.length);
    if (queryText.length === 0) {
      axios
        .get(`${baseUrl}/getcquestions?categoryID=${categoryID}`)
        .then((res) => {
          if (res) {
            setQuestions(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let resQues = questions.filter((e) => {
        let dataFilter = e.query.toLowerCase();
        return dataFilter.indexOf(queryText) !== -1;
      });
      setQuestions(resQues);
    }
  }
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
            Total Questions: {questions.length}
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
            <button className="btn btn-primary btn-sm mt-2 ms-2" onClick={downloadPDF}>
              Download PDF
            </button>

          </div>
          <input placeholder="Enter Question..." onChange={onTextChange} />
        </div>
        {questions.length > 0 ? (
          questions.map((question, index) => {
            return (
              <div className="homequery shadow-sm" key={index}>
                <h5>Question {index + 1}</h5>
                <div dangerouslySetInnerHTML={{ __html: question.query }} />
                <div className="tags my-2">
                  {question.tags.map((tag, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/questions/tagged/${tag}`}
                        className="tag"
                        state={{ tag: tag }}
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </div>
                <div className="footer">
                  Asked by{" "}
                  <Link
                    className="link"
                    to={`/users/${question.author
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    state={{ authorID: question.authorID }}
                  >
                    {question.author}
                  </Link>{" "}
                  {moment(question.createdAt).fromNow()} in{" "}
                  <Link
                    to={`/questions/${question.categoryName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="link"
                    state={{ categoryID: question.categoryID }}
                  >
                    {question.categoryName}
                  </Link>{" "}
                  <span className="views">
                    Viewed: {question.views ? question.views : 0} times
                  </span>
                </div>
                {ucategory !== 'junior' && (
                  loggedIn === "true" ? (
                    <div
                      className="btn btn-primary btn-sm mt-2 me-2"
                      onClick={() => giveAnswer(question.query, question._id)}
                    >
                      Give Answer
                    </div>
                  ) : (
                    <div
                      className="btn btn-primary btn-sm mt-2 me-2"
                      onClick={() => navigate(`${baseUrl}/login`)}
                    >
                      Give Answer
                    </div>
                  ))
                }
                <div
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() =>
                    showAnswers(question._id, question.query, question.tags)
                  }
                >
                  Show Answers
                </div>
              </div>
            );
          })
        ) : (
          <div className="notFound">No Question Found</div>
        )}
      </div>
      <div className={`answerText ${showAnswer === true ? "active" : ""}`}>
        <div className="closeBtn" onClick={() => hideAnswers()}>
          <Close />
        </div>
        <div className="container py-2">
          <h4 dangerouslySetInnerHTML={{ __html: query }} />
          <div className="tags mt-2">
            {tags.map((tag, index) => {
              return (
                <Link
                  key={index}
                  to={`/questions/tagged/${tag}`}
                  className="tag"
                  state={{ tag: tag }}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
          <hr />
          {answers.length > 0 ? (
            answers.map((answer, index) => {
              return (
                <div key={index} className="mb-3">
                  <h6>Answer: {index + 1}</h6>
                  <div
                    className="answer"
                    dangerouslySetInnerHTML={{ __html: answer.answer }}
                  />
                  <div className="ansNo">
                    <strong>
                      Answered by
                      <Link
                        className="link"
                        to={`/publicprofile/${answer.userID}/${answer.user
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        state={{ userID: answer.userID }}
                      >
                        {answer.user}
                      </Link>{" "}
                      {moment(answer.createdAt).format("DD MMM, YYYY")} at{" "}
                      {moment(answer.createdAt).format("hh:mm A")}
                    </strong>{" "}
                  </div>
                  <LikesDislikes
                    props={{ userID: userID, answerID: answer._id }}
                  />
                  <hr />
                </div>
              );
            })
          ) : (
            <div
              className={`notFound  ${darkMode === "light" ? "light" : "dark"}`}
            >
              No Answer Found!
            </div>
          )}
        </div>
      </div>

      <div className={`answerBox ${showForm === true ? "active" : ""}`}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="closeBtn" onClick={() => hideForm()}>
            <Close />
          </div>
          <div className="answerEditor">
            <JoditEditor
              ref={editor}
              value={ans.answer}
              config={config}
              onBlur={handleUpdate}
            />
            <input type="hidden" value={ans.answer} name="answer" />
          </div>
          <div className="float-end m-2">
            <input className="btn btn-primary" type="submit" value={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Category;
