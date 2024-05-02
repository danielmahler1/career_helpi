import React from "react";
import { Navbar, Nav, Form, FormControl, InputGroup, Button } from "react-bootstrap";

interface FooterProps {
  keyData: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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

export default Footer;
