import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";


const AddProduct = () => {
  const [inputProductValue, setInputProductValue] = useState({
    name: " ",
    price: " ",
    brand: " ",
    image: " ",
  });

  const addProducthandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", inputProductValue)

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify(inputProductValue),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  const getProductInput = (e) => {
    setInputProductValue({
      ...inputProductValue,
      [e.target.name]: e.target.value,
    });
  };

  const getImageHandler = (e) => {
    setInputProductValue({ ...inputProductValue, image: e.target.files[0] });
  };
  return (
    <>
      <div className="container ">
        {/* --------------------Add Product form-------------- */}

        <div className="row d-flex justify-content-center align-items-center">
          <div class="card my-4 col-sm-12 col-lg-6 ">
            <h5 class="card-header text-primary">Add Product</h5>
            <div class="card-body">
              <Form onSubmit={addProducthandler} encType="multipart/form-data">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={inputProductValue.name}
                      onChange={getProductInput}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Price
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="price"
                      value={inputProductValue.price}
                      onChange={getProductInput}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Brand
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      name="brand"
                      value={inputProductValue.brand}
                      onChange={getProductInput}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={getImageHandler}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">
                    Add Product
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
