import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import contributers from '../contributers.json';
import AboutSection from './components/AboutSection';
import ContributorSection from './components/ContributorSection';

const useStyles = makeStyles({
  about: {
    marginBottom: '20px',
  },
  aboutText: {
    paddingTop: 15,
  },
  contributorsContainer: {
    display: 'flex',
    paddingTop: 20,
  },
  card: {
    width: '18vw',
    marginRight: '10px',
  },
  image: {
    width: '50%',
    height: '50%',
    maxWidth: 140,
    margin: 10,
    display: 'inline-block',
  },
  imageContainer: {
    textAlign: 'center',
  },
});

const About = () => {
  const classes = useStyles();
  return (
    <>
      <AboutSection classes={classes} />
      <ContributorSection classes={classes} contributers={contributers} />
    </>
  );
};

export default About;
