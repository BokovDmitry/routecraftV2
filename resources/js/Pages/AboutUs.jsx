import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import heroBg from '../../assets/bg20.jpg';
import img1 from '../../assets/bg30.jpg';
import img2 from '../../assets/bg3.jpg';
import img3 from '../../assets/bg31.jpg';
import '../../css/AboutUs.css';

export default function AboutUs() {
    return (
      <>
        <Navbar />
  
        {/* Hero */}
        <div className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="about-hero-overlay" />
          <div className="about-hero-content text-center text-white">
            <h1 className="about-title">About RouteCraft</h1>
            <p className="about-subtitle">
              We're on a mission to make travel planning more personal, flexible, and inspiring.
            </p>
          </div>
        </div>
  
        {/* Content */}
        <main className="about-content py-5">
          <Container>
            <Row className="align-items-center mb-5">
              <Col md={6}>
                <img src={img1} alt="Explore World" className="img-fluid rounded shadow" />
              </Col>
              <Col md={6}>
                <h2>Discover Unique Routes</h2>
                <p>
                  Whether you're planning a solo trip or a group journey, RouteCraft helps you discover
                  custom routes made by real travelers with real stories.
                </p>
              </Col>
            </Row>
  
            <Row className="align-items-center mb-5 flex-md-row-reverse">
              <Col md={6}>
                <img src={img2} alt="Save Favorites" className="img-fluid rounded shadow" />
              </Col>
              <Col md={6}>
                <h2>Save and Share Your Favorites</h2>
                <p>
                  Easily bookmark your favorite routes and share them with friends, family, or fellow explorers.
                </p>
              </Col>
            </Row>
  
            <Row className="align-items-center">
              <Col md={6}>
                <img src={img3} alt="Create Your Route" className="img-fluid rounded shadow" />
              </Col>
              <Col md={6}>
                <h2>Build Your Dream Itinerary</h2>
                <p>
                  Use our flexible route builder to plan every step of your journey and keep everything in one place.
                </p>
              </Col>
            </Row>
          </Container>
        </main>
  
        <Footer />
      </>
    );
  }