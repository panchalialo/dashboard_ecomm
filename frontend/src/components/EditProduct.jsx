import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [inputProductValue, setInputProductValue] = useState({
    name: " ",
    price: " ",
    brand: " ",
    image: "product",
  });
  const params = useParams();

  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    updateProducthandler();
  }, []);

  //input data onchange function

  const getProductInput = (e) => {
    setInputProductValue({
      ...inputProductValue,
      [e.target.name]: e.target.value,
    });
  };

  //file input onchange function

  const getImageHandler = (e) => {
    setInputProductValue({ ...inputProductValue, image: e.target.files[0] });
  };

  //   const objectUrl = URL.createObjectURL(inputProductValue.image)

  //   console.log('image', objectUrl)

  //product edit function
  const updateProducthandler = async (e) => {
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
    console.log(result);
    setInputProductValue({ ...result, image: result.imageUrl });
  };

  return (
    <>
      <div className="container ">
        {/* --------------------Add Product form-------------- */}

        <div className="row d-flex justify-content-center align-items-center">
          <div class=" card my-4 col-sm-12 col-lg-8 ">
            <h5 class="card-header text-primary ">Update Product</h5>
            <div class="card-body">
              <form
                onSubmit={updateProducthandler}
                encType="multipart/form-data"
              >
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inputProductValue.name}
                      onChange={getProductInput}
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                      required
                    />
                    {errMessage && inputProductValue.name === " " && (
                        <span className="text-danger">Please enter name</span>
                      )}
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
                    {errMessage && inputProductValue.price === " " && (
                        <span className="text-danger">Please enter price</span>
                      )}
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
                    {errMessage && inputProductValue.brand === " " && (
                        <span className="text-danger">Please enter brand</span>
                      )}
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
                  {/* {selectedFile &&  <img src={preview}  alt=""/> } */}
                  <img
                    src={inputProductValue?.image}
                    alt=""
                    className="update-img"
                  />
                  {errMessage && inputProductValue.image === null && (
                      <span className="text-danger">Please upload file</span>
                    )}
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
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

export default EditProduct;
