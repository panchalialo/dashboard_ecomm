import React from "react";
import Products from "./Products";

import "../assets/css/banner-style.css"


const Home = ({fetchProducts}) => {
  let squares = [];

  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }
  
  const generateRandomNum = ({ min, max }) => Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <>
    <div className="intro">
      {/* <div className="quote">
        <h1>{title}</h1>
        <p>{description}</p>
      </div> */}
      <div className="squares-wrapper">
        <ul className="squares">
          {squares.map((el, i) => {
            const randomDimensions = Math.floor(
              Math.random() * (150 - 15 + 1) + 15
            );

            return ( 
              <li
                key={i}
                style={{
									left: `${generateRandomNum({ min: 0, max: 90 })}%`,
									width: randomDimensions,
									height: randomDimensions,
									animationDelay: `${i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0}s`,
									animationDuration: `${generateRandomNum({ min: 10, max: 50 })}s`,
								}}
              />
            );
          })}
        </ul>
      </div>
      <div className="image-overlay" />
    </div>


    <Products/>

    </>
  );
};

export default Home;
