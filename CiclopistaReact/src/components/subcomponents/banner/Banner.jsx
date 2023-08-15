import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// importing aos
import './Banner.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default class MyClassComponent extends Component {
    componentDidMount() {
        AOS.init();
    }

  render() {
    return (
      <div
        data-aos="fade-right"  className='Banner'//Here you can use any of the AOS animations
      >
        <Container>
          <Row >
            <div className='img1'>
              <Col sm={3}><img src="https://drive.google.com/uc?export=download&id=1QpFui3n2chiD_IcHk64KuyqW19_maq8E" class="img-fluid" alt=""></img></Col>
              <Col sm={3}><img src="https://drive.google.com/uc?export=download&id=1JBpWo1KCnv7PvFmXF2qMf_t__33GXZ_N" class="img-fluid" alt=""></img></Col>
              <Col sm={3}><img src="https://drive.google.com/uc?export=download&id=1Vrpe8Pc-9zLQwRk8Tm-seH0M3NkJpVY4" class="img-fluid" alt=""></img></Col>
              <Col sm={3}><img src="https://drive.google.com/uc?export=download&id=1yhH1OYqjO5cCyFeJUah8OonQJg1huqaP" class="img-fluid" alt=""></img></Col>
              
            </div>
            <div>
              <Col sm={12} >
                <div className='Texto_banner'>
                  <h3 className='Subtitulo'>Produtos hechos con 100% de amor</h3>
                  <h1 className='Titulo'>Enterate de las ultimas colecciones que sacamos</h1>
                  <button className='boton'><b>VER PRODUCTOS</b></button>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    )
  }
}