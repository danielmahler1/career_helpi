import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface HomePageProps {
  keyData: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, handleSubmit, changeKey }: HomePageProps) => {
  return (
    <>
      <header className="App-header">
        <p>Mahler, Wolf, Kellner Career Assessment</p>
      </header>
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
    </>
  );
};

export default HomePage;
export {};
