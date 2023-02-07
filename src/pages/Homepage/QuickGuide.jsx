import {useRef, useState} from 'react';
import {Modal, Carousel} from "react-bootstrap"
import CarouselImg from "../../images/how.png"
import HomePageUtils from "./utils/homepageUtils"

//Styles
import "../../styles/pages/_howToUse.scss";

function QuickGuide(props) {
  const {showGuide, setShowGuide, firstLogIn, setFirstLogIn, user, index, setIndex} = props;

  const handleSelect = (selectedIndex) => {
    const leftArrow = document.querySelector(".carousel-control-prev");
    const rightArrow = document.querySelector(".carousel-control-next")
    if (selectedIndex === 0) {
      leftArrow.style.visibility = "hidden"
      setIndex(selectedIndex)
      return
    }
    if(selectedIndex === 4) {
      rightArrow.style.visibility = "hidden"
      setIndex(selectedIndex)
      return
    }
    rightArrow.style.visibility = "visible"
    leftArrow.style.visibility = "visible"
    setIndex(selectedIndex)
  };
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
  
      <Carousel activeIndex={index} indicators={false} onSelect={handleSelect} interval={null} slide={true}>
        <Carousel.Item>
          <div className="help-image-container">
            <img
              className="d-block help-image"
              src={CarouselImg}
              alt="First slide"
            />
          </div>
          <Carousel.Caption className="carousel-text">
            <div className="quick-guide-caption">
            {firstLogIn ? <h3 className="help-title">Hi {user.data.storeName}, you have successfully signed up!</h3>: <h3 className="help-title">Hi {user.data.storeName}!</h3>}
            {firstLogIn ? <p className="help-text">Welcome! This walkthrough will help you get started with MealTime.</p>: <p className="help-text">This quick guide will help you how to use with MealTime.</p>}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="help-image-container">
          <img
            className="d-block help-image"
            src={CarouselImg }
            alt="Second slide"
          />
          </div>

          <Carousel.Caption className="carousel-text">
          <div className="quick-guide-caption">
            <h3 className="help-title">Quick Guide:</h3>
            <p className="help-text">Put in ingredients in the "Ingredients" box.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="help-image-container">
          <img
            className="d-block help-image"
            src={CarouselImg}
            alt="Third slide"
          />
          </div>

          <Carousel.Caption className="carousel-text">
          <div className="quick-guide-caption">
            <h3 className="help-title">Quick Guide:</h3>
            <p className="help-text">
              Press "Generate Meal Packs".
            </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="help-image-container">
          <img
            className="d-block help-image"
            src={CarouselImg}
            alt="Third slide"
          />
          </div>

          <Carousel.Caption className="carousel-text">
          <div className="quick-guide-caption">
            <h3 className="help-title">Quick Guide:</h3>
            <p className="help-text">
              Add Meal Packs you like.
            </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="help-image-container">
          <img
            className="d-block help-image"
            src={CarouselImg}
            alt="Third slide"
          />
          </div>

          <Carousel.Caption className="carousel-text">
          <div className="quick-guide-caption">
            <h3 className="help-title">Quick Guide:</h3>
            <p className="help-text">
              Press "Save" and you are good to go.
            </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Modal>
  );
}

export default QuickGuide;