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
  },
  contributors: {
    boxSizing: 'border-box',
  },
  card: {
    minHeight: 380,
    width: '100%',
    margin: '10px',
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
    marginRight: 10,
    '@media screen and (max-width: 1000px)': {
      flex: '50%',
      maxWidth: '50%',
    },
    '@media screen and (max-width: 800px)': {
      flex: '100%',
      maxWidth: '100%',
    },
  },
});

function listToMatrix(list, elementsPerSubArray) {
  let matrix = [],
    i,
    k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

const cleanArray = list => list.filter(n => n);

function getContributorsMatrix(contributors) {
  let contributorsMatrix = listToMatrix(
    contributors,
    Math.ceil(contributors.length / 3) + 1,
  );
  contributorsMatrix = (m => m[0].map((x, i) => m.map(x => x[i])))(
    contributorsMatrix,
  );
  return contributorsMatrix.map(cleanArray);
}

function ContributorSection({ contributors }) {
  const classes = useStyles();
  const contributorsMatrix = getContributorsMatrix(contributors);
  return (
    <Container>
      <Typography variant="h4" component="h2">
        Contributors
      </Typography>
      <div className={classes.contributors}>
        <div className={classes.container}>
          {contributorsMatrix.map(contributors => (
            <div
              className={classes.column}
              key={contributors.reduce((accum, { name }) => accum + name, '')}
            >
              {contributors.map(({ name, description, image }) => (
                <Card className={classes.card} key={name}>
                  <Container className={classes.imageContainer}>
                    <Avatar className={classes.image} src={image} />
                  </Container>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Container>
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
