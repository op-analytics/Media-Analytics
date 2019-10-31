import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import contributers from '../contributers.json';

const useStyles = makeStyles({
  about: {
    marginBottom: '20px',
  },
  contributers: {},
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    marginRight: '10px',
  },
  image: {
    maxWidth: 240,
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.about}>
        <Typography variant="h4" component="h2">
          About
        </Typography>
        <Typography variant="body1" component="p" color="textPrimary">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Typography>
      </div>
      <div className={classes.contributers}>
        <Typography variant="h4" component="h2">
          Contributers
        </Typography>
        <Container className={classes.container}>
          {contributers.map(({ name, description, image }) => (
            <Card className={classes.card} key={name}>
              <Avatar
                className={classes.image}
                src={image}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </div>
    </>
  );
};

export default About;
