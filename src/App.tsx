import React, { useRef, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/starter_helpi/" style={{ marginLeft: 10 }}>
        CareerFinder
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: 10 }} />
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
          <Nav.Link as={Link} to="/results">
            Results Overview
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Footer = ({ keyData, handleSubmit, changeKey }: FooterProps) => {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between text-white footer">
      <Form onSubmit={handleSubmit} className="footer-form">
        <InputGroup className="input-group-custom">
          <InputGroup.Text id="basic-addon1">API Key</InputGroup.Text>
          <FormControl type="password" placeholder="Insert API Key Here" aria-label="API Key" aria-describedby="basic-addon1" value={keyData} onChange={changeKey} />
          <Button type="submit" variant="outline-light">
            Submit
          </Button>
        </InputGroup>
      </Form>
      <Nav>
        <Nav.Item className="mx-3">Nathan Wolf</Nav.Item>
        <Nav.Item className="mx-3">Daniel Mahler</Nav.Item>
        <Nav.Item className="mx-3">Benjamin Kellner</Nav.Item>
      </Nav>
    </Navbar>
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
        <Header />
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
