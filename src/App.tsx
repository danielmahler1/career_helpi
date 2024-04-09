import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import BasicQuestion from './Pages/BasicQuestion';
import DetailedQuestion from './Pages/DetailedQuestion';
import HomePage from './Pages/HomePage'; 

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const Header = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }}>
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

function App() {
  const [key, setKey] = useState<string>(keyData);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission behavior
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    // window.location.reload(); // Consider using React state to trigger a re-render instead of reloading the page
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
