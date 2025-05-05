import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import PopularRoutes from './PopularRoutes';
import FAQ from './FAQ';
import Gallery from './Gallery';
import Footer from './Footer';
import '../../css/app.css';

function App ({ auth }) {

  return (
    <>
      <Navbar auth={auth}/>
      <Hero />
      <Features />
      <PopularRoutes /> 
      <FAQ />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;