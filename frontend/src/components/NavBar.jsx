import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-primary">
            E-Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="text-light" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {auth && (
                <>
                  <Nav.Link as={Link} to="/">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/products">
                    Products
                  </Nav.Link>
                  <NavDropdown
                    title="Product Config"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item as={Link} to="/add-product">
                      Add Products
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/update-product">
                      Update Products
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/profile">
                    My Profile [{JSON.parse(auth).name}]
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Form className="d-flex">
            {auth ? (<>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary" className="mx-1">
                Search
              </Button>
             
                <Button
                  variant="outline-primary"
                  className="mx-1"
                  onClick={logoutHandler}
                >
                  Logout
                </Button></>
              ) : (<>
              <Button
                  variant="outline-primary"
                  className="mx-1"
                  as={Link}
                  to="/login"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline-primary"
                  className="mx-1"
                  as={Link}
                  to="/signup"
                >
                  Sign Up
                </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
