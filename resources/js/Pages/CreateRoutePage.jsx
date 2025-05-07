import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CreateRoute from '../Components/CreateRoute';
import bgImage from '../../assets/bg20.jpg';
import '../../css/MyRoutes.css'; 

export default function CreateRoutePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="my-routes-hero small-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="my-routes-hero-overlay" />
        <div className="hero-content px-3">
          <h1 className="hero-title py-2">CREATE YOUR ROUTE</h1>
          <p className="hero-description py-1">
            Add your destination, travel days, and budget to start building your route.
            </p>
        </div>
      </div>

      {/* Route creation form */}
      <CreateRoute />

      <Footer />
    </>
  );
}
