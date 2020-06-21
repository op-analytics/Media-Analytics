import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import React from 'react';

import { useSectionStyles } from './hooks/useSectionStyles';
import FrequencyCounts from './sections/FrequencyCounts';

/**
 * The user guide page component
 * @component
 */
const UserGuide = () => {
  const classes = useSectionStyles();
  return (
    <Container className={classes.container}>
      <Card>
        <div className={classes.div}>
          <h1>User Guide</h1>
        </div>
        <div className={classes.div}>
          <h2>Request limits</h2>
          <p>
            Every user has a maximum of 100 requests per month. A request is
            counted when you click the submit button on a form. Request tokens
            automatically refresh every month after creating your account.
          </p>
        </div>
        <FrequencyCounts />
      </Card>
    </Container>
  );
};

export default UserGuide;
