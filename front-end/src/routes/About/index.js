import Container from '@material-ui/core/Container';
import React from 'react';
import contributers from './contributers.json';
import AboutSection from './components/AboutSection';
import ContributorSection from './components/ContributorSection';

const About = () => {
  return (
    <Container>
      <AboutSection />
      <br />
      <ContributorSection contributors={contributers} />
    </Container>
  );
};

export default About;
