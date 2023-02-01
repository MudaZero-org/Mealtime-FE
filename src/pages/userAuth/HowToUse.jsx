import {useState, useEffect, useRef} from 'react';
import {Carousel, Modal, Button} from "react-bootstrap"
import CarouselImg from "../../images/howToUse.jpg"
import {useNavigate} from "react-router-dom"
import "../../styles/pages/_howToUse.scss";

function HowToUse(props) {
  const storeName = JSON.parse(localStorage.getItem("user")).data.storeName;
  const ref = useRef(null);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(true);
  const [index, setIndex] = useState(0);

  const onPrevClick = () => {
    ref.current.prev();
  };
  const onNextClick = () => {
    ref.current.next();
  };

  console.log(storeName)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        backdrop="static"
      >
    
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} ref={ref} controls={false} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="First slide"
            />
            
            
            <Carousel.Caption className="carousel-text">
              <h3>Hi {storeName}, you have successfully signed up!</h3>
              <p>Welcome! This walkthrough will help you get started with MealTime.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg }
              alt="Second slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Second slide label</h3>
              <p></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CarouselImg}
              alt="Third slide"
            />

            <Carousel.Caption className="carousel-text">
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
        <div class="level">
          
          <div class="level-left">
            <button class="button" onClick={() => navigate("/home")}>Skip</button>
          </div>
          <div class="level-right">
              {index !== 0 ? <span aria-hidden="true" className="carousel-control-prev-icon" onClick={() => onPrevClick()
            }/> : ""}
            
            
            {index !== 2 ? <span aria-hidden="true" className="carousel-control-next-icon" onClick={() => onNextClick()}/> : <button class="button">Let's get started!</button>}
          </div>
        </div>
      </Modal>
    );
  }



  return (
    <div className="howToUse-page">
      
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default HowToUse;