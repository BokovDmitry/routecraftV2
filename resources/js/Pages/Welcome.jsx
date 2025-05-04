import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import PopularRoutes from './PopularRoutes';
import '../../css/app.css';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <PopularRoutes /> 
    </>
  );
}

export default App;