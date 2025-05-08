import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import EditRouteForm from '../Components/EditRouteForm';
import bgImage from '../../assets/bg24.jpg';
import '../../css/MyRoutes.css';

export default function EditRoutePage({ route }) {
  return (
    <>
      <Navbar />

      <div className="edit-route-hero" style={{ backgroundImage: `url(${bgImage})` }}>
  <div className="my-routes-hero-overlay" />
  <div className="hero-content edit-hero-content px-3">

    <h1 className="hero-title py-2">EDIT YOUR ROUTE</h1>
    <p className="hero-description py-1">
      Update your destination, days, or must-see places.
    </p>
  </div>
</div>


      <EditRouteForm existingRoute={route} />

      <Footer />
    </>
  );
}
