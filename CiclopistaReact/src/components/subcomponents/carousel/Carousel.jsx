import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function Carousell() {
    return (
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://drive.google.com/uc?export=download&id=1ChbkmEkhUomKHBdQT6eH8ZJZsqmjwmwr"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="CarruselInicial">¡Hola hermosa!</h3>
              <p className="CarruselInicial">Bienvenida a Dasein</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://drive.google.com/uc?export=download&id=1gxQqqM-iLAbTCA0U5dRAdGu1tkzjIuRp" 
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3 className="CarruselInicial">¡Hola hermosa!</h3>
              <p className="CarruselInicial">Bienvenida a Dasein</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://drive.google.com/uc?export=download&id=1a7Hru0I6rgFTS9Wrg-APLZ9ChV3iUtUO"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3 className="CarruselInicial">¡Hola hermosa!</h3>
              <p className="CarruselInicial">Bienvenida a Dasein</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )
}
