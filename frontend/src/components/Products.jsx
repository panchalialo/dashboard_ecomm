import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  //render product list on load
  useEffect(() => {
    fetchProducts();
  }, [setProductList]);

  //fetch products from db
  const fetchProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();

    setProductList(result);
    console.log(result[0].imageUrl)
  };
// console.log(productList[0].filePath)
  

  //add product button function
  const addProductHandler = () => {
    navigate("/add-product");
  };
  return (
    <>
      <div className="container my-4">
        <div className=" row page-header my-4 ">
          <div className="col-md-6 d-flex justify-content-flex-start">
            <h2>All Products</h2>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addProductHandler}
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="container">
          
          
            <div className="row">
            {productList.map((items) => {
              return (
                <>
                <div className="col-lg-4 col-md-6 col-sm-12 text-center mb-5" key={items._id}>
                 
                  <ProductCard name={items.name} price={items.price} image={items?.imageUrl} brand= {items.brand} id={items._id} fetchProducts ={fetchProducts}/>
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
