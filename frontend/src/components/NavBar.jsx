import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary " data-bs-theme="dark">
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
                
                </>
              )}
            </Nav>
            <Form className="d-flex">
              {auth ? (
                <>
                  {/* <Button variant="outline-primary" className="mx-1">
                    Search
                  </Button> */}
                  <div className="text-white py-2 px-1">
                    <svg
                      class="w-6 h-6 text-gray-400 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>

                  <h5 className="text-gray-400 pr-3 py-2">
                    {JSON.parse(auth).name}
                  </h5>

                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      as={Link}
                      to="/signup"
                    >
                      Sign Up
                    </button>
                  </Link>
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
