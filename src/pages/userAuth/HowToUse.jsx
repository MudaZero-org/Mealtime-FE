import {useState, useEffect} from 'react';
import {Carousel, Modal, Button} from "react-bootstrap"
import Hiroshi from "../../images/hiroshi.png"
import Hirosha from "../../images/background-img.jpg"
import {useNavigate} from "react-router-dom"
import "../../styles/pages/_howToUse.scss";

function HowToUse(props) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(true);
  const [index, setIndex] = useState(0);


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
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hiroshi}
          alt="First slide"
        />
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item nextIcon={nextButton()}>
        <img
          className="d-block w-100"
          src={Hirosha}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/home")}>Skip</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const nextButton = () => {
    console.log(index)
    return <figure className="carousel-control-prev-icon">
        <img src={Hiroshi}/>
      </figure>
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