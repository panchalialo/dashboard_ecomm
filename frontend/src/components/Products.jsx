import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Form from "react-bootstrap/Form";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [addProductShow, setAddProductShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation()

  //render product list on load
  useEffect(() => {
    fetchProducts();
    if(location.pathname === "/products"){
      setAddProductShow(true)
    }
  }, [setProductList, location.pathname]);

  //fetch products from db
  const fetchProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();

    setProductList(result);
  };

  //add product button function
  const addProductHandler = () => {
    navigate("/add-product");
  };


  //search product
  const searchInputHandler = async (e) => {
    let key = e.target.value
    // console.log(e.target.value)
    if(key){
    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json()
    if(result){
      setProductList(result)
    }}else{
      fetchProducts()
    }
  }



  return (
    <>
      <div className="container my-4">
        <div className=" row page-header my-4 ">
          <div className="col-md-6 d-flex justify-content-flex-start">
            <h2>All Products</h2>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
         { addProductShow ?<> <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addProductHandler}
            >
              + Add Product
            </button>
            <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={searchInputHandler}
                  />
            </>: <>
            
            <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={searchInputHandler}
                  />
            </>
            }
          </div>
        </div>

        <div className="container">
          <div className="row">
            {productList.map((items) => {
              return (
                <>
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 text-center mb-5"
                    key={items._id}
                  >
                    <ProductCard
                      name={items.name}
                      price={items.price}
                      image={items?.imageUrl}
                      brand={items.brand}
                      id={items._id}
                      fetchProducts={fetchProducts}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
