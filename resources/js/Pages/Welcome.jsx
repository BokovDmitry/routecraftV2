import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import PopularRoutes from '../Components/PopularRoutes';
import FAQ from '../Components/FAQ';
import Gallery from '../Components/Gallery';
import Footer from '../Components/Footer';
import '../../css/app.css';

function App ({ auth , topLikedRoutes}) {

  return (
    <>
      <Navbar auth={auth}/>
      <Hero />
      <Features />
      <PopularRoutes routes={topLikedRoutes}/> 
      <FAQ />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;