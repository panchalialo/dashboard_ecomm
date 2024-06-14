import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Form from "react-bootstrap/Form";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [addProductShow, setAddProductShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //render product list on load
  useEffect(() => {
    fetchProducts();
    if (location.pathname === "/products") {
      setAddProductShow(true);
    }
  }, [setProductList, location.pathname]);

  //fetch products from db
  const fetchProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();

    setProductList(result);
  };

  //add product button function
  const addProductHandler = () => {
    navigate("/add-product");
  };

  //search product
  const searchInputHandler = async (e) => {
    let key = e.target.value;
    // console.log(e.target.value)
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProductList(result);
      }
    } else {
      fetchProducts();
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className=" row page-header my-4 ">
          <div className="col-md-4 d-flex justify-content-flex-start">
            <h2>All Products</h2>
          </div>
          <div className="col-md-8 d-flex justify-content-end">
            {addProductShow ? (
              <>
                {" "}
                <div className="col-md-8">
                 
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Products..."
                    onChange={searchInputHandler}
                  />
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={addProductHandler}
                  >
                    + Add Product
                  </button>
                </div>
              </>
            ) : (
              <>
              <div className="col-md-6 mr-5 ">
                <input
                  type="search"
                  id="default-search"
                  class="block w-full  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Products..."
                  onChange={searchInputHandler}
                />
                </div>
              </>
            )}
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
