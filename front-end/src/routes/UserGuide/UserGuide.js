import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useSectionStyles } from './hooks/useSectionStyles';
import FrequencyCounts from './sections/FrequencyCounts';

const useStyles = makeStyles((theme) => ({
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


/**
 * The user guide page component
 * @component
 */
const UserGuide = () => {
  const classes = useStyles();
  const sectionClasses = useSectionStyles();
  return (
    <Container className={classes.container}>
      <Card className={classes.containerCard}>
        <div className={sectionClasses.div}>
          <h1>User Guide</h1>
        </div>
        <div className={sectionClasses.div}>
          <h2>Request limits</h2>
          <Typography
            variant="body1"
            component="p"
            color="textPrimary"
            className={sectionClasses.aboutText}
          >
            Every user has a maximum of 100 requests per month. A request is
            counted when you click the submit button on a form. Request tokens
            automatically refresh every month after creating your account.
          </Typography>
        </div>
        <FrequencyCounts />
      </Card>
    </Container>
  );
};

export default UserGuide;
