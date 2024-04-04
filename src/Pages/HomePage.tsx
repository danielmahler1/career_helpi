import React from 'react';
import logo from '../logo.svg'; // Adjust the path as necessary
import { Button, Form } from 'react-bootstrap';

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, setKey, handleSubmit, changeKey }: HomePageProps) => {
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <p className="name-tag">Nathan Wolf</p>
        <p className="name-tag">Daniel Mahler</p>
        <p className="name-tag">Benjamin Kellner</p>
      </header>
      <Form onSubmit={handleSubmit}>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" value={keyData} onChange={changeKey}></Form.Control>
        <br />
        <Button className="Submit-Button" type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default HomePage;
export {};
