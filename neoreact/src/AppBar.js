import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AppBar() {
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href='/'>FakePets</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/register-pet">Register a Pet</Nav.Link>
              <NavDropdown title="Others" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/available-pets">Available Pets</NavDropdown.Item>
                <NavDropdown.Item href="/other-owners">Other Owners</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/recomendation">Recomendation</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/check">Check for a pet</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
}

export default AppBar;
