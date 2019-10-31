import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function AboutSection({ classes }) {
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
