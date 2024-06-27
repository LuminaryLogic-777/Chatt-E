import React from "react";
import { Container, Nav, Navbar, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ height: "4rem" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3">
          ChatApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Stack direction="horizontal" gap="3" className="align-items-center">
              {user ? (
                <>
                  <span className="text-warning">Logged in as {user?.name}</span>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="outline-light">
                    Login
                  </Button>
                  <Button as={Link} to="/register" variant="outline-light">
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

