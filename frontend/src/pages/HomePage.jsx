import React from 'react';
import HomeSection from '../components/HomeSection';
import PropertySection from '../components/PropertySection';
import BenefitsSection from '../components/BenefitsSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <HomeSection />
      <PropertySection />
      <BenefitsSection />
      <FaqSection />
      <Footer/>
    </>
  );
};

export default HomePage;