import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function AppBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">FakePets</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/person/add_user">Register</Nav.Link>
            <Nav.Link href="/dog/add">Register a Pet</Nav.Link>
            <NavDropdown title="Others" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/available_dogs">
                Available Dogs
              </NavDropdown.Item>
              <NavDropdown.Item href="/recommend_dogs/">
                Recommend Dog
              </NavDropdown.Item>
              <NavDropdown.Item href="/other_users">
                Other Users
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/race/add/">
                Register Race
              </NavDropdown.Item>
              <NavDropdown.Item href="/shelter/add/">
                Register Shelter
              </NavDropdown.Item>
              <NavDropdown.Item href="/update_info/">
                Update Info
              </NavDropdown.Item>
              <NavDropdown.Item href="/delete_info/">
                Delete Info
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/search_dog/">Search for a dog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
