import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
 
  const [inputLoginValue, setInputLoginValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem("users");
    if(auth){
      navigate("/")
    }

  })

  const getLoginInputValue = (e) => {
    setInputLoginValue({ ...inputLoginValue, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    console.log(inputLoginValue);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify(inputLoginValue),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.email) {
        
      
      localStorage.setItem("users", JSON.stringify(result));
      navigate("/");
    } else {
      alert("wrong details entered");
    }
  };

  return (
    <>
 
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign In
                </p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    name="email"
                    value={inputLoginValue.email}
                    onChange={getLoginInputValue}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    name="password"
                    value={inputLoginValue.password}
                    onChange={getLoginInputValue}
                  />
                </div>

                <MDBBtn className="mb-4" size="lg" onClick={loginHandler}>
                  Log In
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default LogIn;
