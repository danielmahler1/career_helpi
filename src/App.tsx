import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BasicQuestion from './Pages/BasicQuestion';

// Local storage and API Key setup
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const Header = () => {
  return (
    <a href="/" className="Home-Button" style={{
      margin: '10px',
      padding: '5px',
      backgroundColor: '#61dafb',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px'
    }}>
      Home
    </a>
  );
}

function App() {
  const [key, setKey] = useState<string>(keyData);

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.tsx</code> and save to reload.</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <p className="name-tag">Nathan Wolf</p>
          <p className="name-tag">Daniel Mahler</p>
          <p className="name-tag">Benjamin Kellner</p>
          <Link to="/basic-questions">
            <Button variant="primary">Go to Basic Questions</Button>
          </Link>
        </header>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        <Routes>
          <Route path="/basic-questions" element={<BasicQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
