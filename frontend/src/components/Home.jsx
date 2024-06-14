import React from "react";
import Products from "./Products";
import Carousel from 'react-bootstrap/Carousel';
import banner1 from "../assets/images/banner-1.jpg"
import banner2 from "../assets/images/banner-2.jpg"
import banner3 from "../assets/images/banner-3.jpg"


const Home = () => {
 

  return (
    <>
    <div className="dashboard-banner">
     <Carousel pause="hover" fade="true">
      <Carousel.Item interval={1000}>
        <img src={banner1} alt="banner-1" className="banner-img"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img src={banner2} alt="banner-1" className="banner-img"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img src={banner1} alt="banner-1" className="banner-img"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>


    <Products/>

    </>
  );
};

export default Home;
