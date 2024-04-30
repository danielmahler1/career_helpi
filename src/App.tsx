import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import BasicQuestion from "./Pages/BasicQuestion";
import DetailedQuestion from "./Pages/DetailedQuestion";

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Inside the HeroSection component
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
    </div>
  );
};

const Header = () => {
  return (
    <nav>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0, textAlign: "center", backgroundColor: "#282c34" }}>
        <li style={{ display: "inline" }}>
          <Link to="/starter_helpi/" className="link-button">
            Home
          </Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/basic-questions" className="link-button">
            Basic Questions
          </Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/detailed-questions" className="link-button">
            Detailed Questions
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const saveKeyData = "MYKEY";
  const [key, setKey] = useState<string>(localStorage.getItem(saveKeyData) || "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(saveKeyData, key); // Store the API key directly
    alert("API Key saved. Please refresh the page or re-run the operation to use the new key."); // Alert the user
  }
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/starter_helpi/" replace />} />
          <Route path="/starter_helpi/" element={<HomePage keyData={key} setKey={setKey} handleSubmit={handleSubmit} changeKey={changeKey} />} />
          <Route path="/basic-questions" element={<BasicQuestion />} />
          <Route path="/detailed-questions" element={<DetailedQuestion />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
