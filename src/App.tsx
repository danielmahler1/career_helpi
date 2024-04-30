import React, { useRef, useState } from "react";
import { Button, Form, Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import BasicQuestion from "./Pages/BasicQuestion";
import DetailedQuestion from "./Pages/DetailedQuestion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FooterProps {
  keyData: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeroSection = ({ handleStartClick }: { handleStartClick: () => void }) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Discover Your Career Path</h1>
      <p className="hero-subtitle">Take our career assessment to find careers that match your interests and skills.</p>
      <button onClick={handleStartClick} className="start-assessment-button">
        Select Your Assessment
      </button>
    </div>
  );
};

const QuizHeader = () => {
  return (
    <div className="quiz-header">
      <h1>Choose Your Quiz</h1>
      <p>Explore our different quizzes to assess your knowledge and skills.</p>
    </div>
  );
};

const HomePage = ({ keyData, handleSubmit, changeKey }: HomePageProps) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const handleStartClick = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage-container">
      <HeroSection handleStartClick={handleStartClick} />
      <div className="quiz-container" ref={quizRef}>
        <QuizHeader />
        <div className="quiz-box">
          <h2>Basic Questions Quiz</h2>
          <p>Start with some fundamental questions to test your basic knowledge.</p>
          <Link to="/basic-questions" className="button">
            Start Basic Quiz
          </Link>
        </div>
        <div className="quiz-box">
          <h2>Detailed Questions Quiz</h2>
          <p>Dive deeper with detailed questions for a thorough challenge.</p>
          <Link to="/detailed-questions" className="button">
            Start Detailed Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ keyData, handleSubmit, changeKey }: FooterProps) => {
  return (
    <footer className="footer">
      <Form onSubmit={handleSubmit} className="api-form">
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" value={keyData} onChange={changeKey}></Form.Control>
        <Button className="submit-button" type="submit">
          Submit
        </Button>
      </Form>
      <div className="names-container">
        <p className="name-tag">Nathan Wolf</p>
        <p className="name-tag">Daniel Mahler</p>
        <p className="name-tag">Benjamin Kellner</p>
      </div>
    </footer>
  );
};

const App = () => {
  const saveKeyData = "MYKEY";
  const [key, setKey] = useState<string>(localStorage.getItem(saveKeyData) || "");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(saveKeyData, key);
    toast.success("API Key Saved Successfully");
  }
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/starter_helpi/">
              CareerPath
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/basic-questions">
                  Basic Quiz
                </Nav.Link>
                <Nav.Link as={Link} to="/detailed-questions">
                  Detailed Quiz
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/starter_helpi/" replace />} />
          <Route path="/starter_helpi/" element={<HomePage keyData={key} setKey={setKey} handleSubmit={handleSubmit} changeKey={changeKey} />} />
          <Route path="/basic-questions" element={<BasicQuestion />} />
          <Route path="/detailed-questions" element={<DetailedQuestion />} />
        </Routes>
        <Footer keyData={key} handleSubmit={handleSubmit} changeKey={changeKey} />
      </div>
    </Router>
  );
};

export default App;
