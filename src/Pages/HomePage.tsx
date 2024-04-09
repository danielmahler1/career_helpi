import React from 'react';
import logo from '../logo.svg'; // Adjust the path as necessary
import { Button, Form } from 'react-bootstrap';

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, handleSubmit, changeKey }: HomePageProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Mahler, Wolf, Kellner Career Assessment</p>
      </header>
      <div className="main-content">
        {/* Your main content here */}
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


export default HomePage;
export {};