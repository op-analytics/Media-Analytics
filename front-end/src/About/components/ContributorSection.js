import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function ContributorSection({ classes, contributers }) {
  return (
    <Container className={classes.contributers}>
      <Typography variant="h4" component="h2">
        Contributers
      </Typography>
      <Container className={classes.contributorsContainer}>
        {contributers.map(({ name, description, image }) => (
          <Card className={classes.card} key={name}>
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
      </Container>
    </Container>
  );
}
