import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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

function AboutSection() {
  const classes = useStyles();
  return (
    <Container className={classes.aboutContainer}>
      <Typography variant="h4" component="h2">
        About
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </Typography>
    </Container>
  );
}

export default AboutSection;
