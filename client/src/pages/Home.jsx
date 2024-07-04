import React from 'react';
import { Hero } from '../Components/Hero';
import Footer from "../Components/Footer";

export const Home = () => {
  return (
    <div className='h-heightWithoutNavbar '>
      <Hero />
      <Footer />
    </div>
  );
};
