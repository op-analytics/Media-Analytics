import React from 'react';
import contributers from '../contributers.json';
import AboutSection from './components/AboutSection';
import ContributorSection from './components/ContributorSection';

const About = () => {
  return (
    <>
      <AboutSection />
      <ContributorSection contributors={contributers} />
    </>
  );
};

export default About;
