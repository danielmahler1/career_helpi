import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import BasicQuestion from './Pages/BasicQuestion';
import DetailedQuestion from './Pages/DetailedQuestion';

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, handleSubmit, changeKey}: HomePageProps) => {
  return (
    <div className="homepage-container">
      <div className="quiz-container">
        <div className="quiz-box">
          <h2>Basic Questions Quiz</h2>
          <p>Start with some fundamental questions to test your basic knowledge.</p>
          <Link to="/basic-questions" className="button">Start Basic Quiz</Link>
        </div>
        <div className="quiz-box">
          <h2>Detailed Questions Quiz</h2>
          <p>Dive deeper with detailed questions for a thorough challenge.</p>
          <Link to="/detailed-questions" className="button">Start Detailed Quiz</Link>
        </div>
      </div>
      <footer className="footer">
        <Form onSubmit={handleSubmit} className="api-form">
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" value={keyData} onChange={changeKey}></Form.Control>
          <Button className="submit-button" type="submit">Submit</Button>
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
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center', backgroundColor: "#282c34" }}>
        <li style={{ display: 'inline' }}>
          <Link to="/starter_helpi/" className="link-button">
            Home
          </Link>
        </li>
        <li style={{ display: 'inline' }}>
          <Link to="/basic-questions" className="link-button">
            Basic Questions
          </Link>
        </li>
        <li style={{ display: 'inline' }}>
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
  let initialKeyData = "";
  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    initialKeyData = JSON.parse(prevKey);
  }
  const [key, setKey] = useState<string>(initialKeyData);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(saveKeyData, JSON.stringify(key));
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
}

export default App;
