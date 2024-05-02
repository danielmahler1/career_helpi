import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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

export default Header;
