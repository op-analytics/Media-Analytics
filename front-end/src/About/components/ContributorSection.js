import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    minHeight: 380,
    width: '98%',
    margin: 5,
  },
  image: {
    width: '50%',
    height: '50%',
    margin: 10,
    display: 'inline-block',
  },
  imageContainer: {
    textAlign: 'center',
  },
  column: {
    flex: '33%',
    maxWidth: '31%',
    '@media screen and (max-width: 1200px)': {
      flex: '50%',
      maxWidth: '45%',
    },
    '@media screen and (max-width: 900px)': {
      flex: '100%',
      maxWidth: '100%',
    },
  },
});

function ContributorSection({ contributors }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" component="h2">
        Contributors
      </Typography>
      <div className={classes.contributors}>
        <div className={classes.container}>
          {contributors.map(({ name, description, image }) => (
            <Card className={`${classes.card} ${classes.column}`} key={name}>
              <Container className={classes.imageContainer}>
                <Avatar className={classes.image} src={image} />
              </Container>
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
        </div>
      </div>
    </>
  );
}

ContributorSection.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
};

export default ContributorSection;
