import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BasicQuestion from './Pages/BasicQuestion';
import HomePage from './Pages/HomePage'; // Make sure the import path is correct

// Local storage and API Key setup
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const Header = () => {
  return (
    <div>
      <Link to="/" style={{
        margin: '10px',
        padding: '5px',
        backgroundColor: '#61dafb',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Home
      </Link>
      <Link to="/basic-questions" style={{
        margin: '10px',
        padding: '5px',
        backgroundColor: '#61dafb',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Basic Questions
      </Link>
    </div>
  );
}

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
          <Route path="/" element={<HomePage keyData={key} setKey={setKey} handleSubmit={handleSubmit} changeKey={changeKey} />} />
          <Route path="/basic-questions" element={<BasicQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
