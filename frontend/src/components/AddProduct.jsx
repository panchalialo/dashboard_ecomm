import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [inputProductValue, setInputProductValue] = useState({
    name: " ",
    price: " ",
    brand: " ",
    image: null,
  });
  const [message, setMessage] = useState("")
  const [errMessage, setErrMessage] = useState(false);

  const navigate = useNavigate();

  const getProductInput = (e) => {
    setInputProductValue({
      ...inputProductValue,
      [e.target.name]: e.target.value,
    });
  };

  const getImageHandler = (e) => {
    setInputProductValue({ ...inputProductValue, image: e.target.files[0] });
  };

  const addProducthandler = async (e) => {
    e.preventDefault();
    if (
      !inputProductValue.name ||
      !inputProductValue.price ||
      !inputProductValue.brand ||
      !inputProductValue.image
    ) {
      setErrMessage(true);
      return false;
    }else {

    

    const userId = JSON.parse(localStorage.getItem("users")).email;
    const data = new FormData();
    data.append("file", inputProductValue.image);
    data.append("productName", inputProductValue.name);
    data.append("brand", inputProductValue.brand);
    data.append("price", inputProductValue.price);
    data.append("userId", userId);

    try {
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: data,
      });

      if (res.ok && data) {
        setMessage("File Uploaded Successfully");
        console.log(JSON.stringify(res.body));
        navigate("/products");
      } else {
        setMessage("Error: File Upload Failed");
        setErrMessage(true)
      }
    } catch (err) {
      setMessage("Error: File Upload Failed");
    }

  }
  };

  return (
    <>
      <div className="container ">
        {/* --------------------Add Product form-------------- */}

        <div className="row d-flex justify-content-center align-items-center">
          <div class=" card my-4 col-sm-12 col-lg-8 ">
            <h5 class="card-header text-primary ">Add Product</h5>
            <div class="card-body">
              <form onSubmit={addProducthandler} encType="multipart/form-data">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inputProductValue.name}
                      onChange={getProductInput}
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                      
                    />
                    {errMessage && inputProductValue.name === " " && <span className="text-danger">Please enter name</span>}
                  </div>

                  <div>
                    <label
                      for="company"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="company"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Price"
                      required
                      name="price"
                      value={inputProductValue.price}
                      onChange={getProductInput}
                    />
                    {errMessage && inputProductValue.price === " " && <span className="text-danger">Please enter price</span>}
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Brand Name
                    </label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Brand"
                      required
                      name="brand"
                      value={inputProductValue.brand}
                      onChange={getProductInput}
                    />
                    {errMessage && inputProductValue.brand === " " && <span className="text-danger">Please enter brand</span>}
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={getImageHandler}
                  />
                  {errMessage && inputProductValue.image === null && <span className="text-danger">Please enter name</span>}
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>

              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
