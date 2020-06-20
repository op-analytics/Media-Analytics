import { Card } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AboutSection from './components/AboutSection';
import ContributorSection from './components/ContributorSection';
import contributers from './contributers.json';

const useStyles = makeStyles(theme => ({
  containerCard: {
    width: '100%',
    padding: '2rem',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '55vw',
    minWidth: '30em',
    '& a': {
      color: theme.palette.primary.main,
      wordWrap: 'break-word',
    },
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Card className={classes.containerCard}>
        <AboutSection />
        <br />
        <ContributorSection contributors={contributers} />
      </Card>
    </Container>
  );
};

export default About;
