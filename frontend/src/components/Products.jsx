import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate()

  const addProductHandler = () =>{
    navigate("/add-product")
  }
  return (
    <>
      <div className="container my-4">
        <div className=" row page-header my-4 ">
          
            <div className="col-md-6 d-flex justify-content-flex-start">
              <h2>All Products</h2>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary btn-sm" onClick={addProductHandler}>+ Add Product</button>
            </div>
          
        </div>
        <div class="card">
          

          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
