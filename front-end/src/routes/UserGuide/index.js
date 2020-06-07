import Container from '@material-ui/core/Container';
import React from 'react';
import Card from '@material-ui/core/Card';
import { useSectionStyles } from './hooks/useSectionStyles';
import FrequencyCounts from './sections/FrequencyCounts';
import LatentAssociations from './sections/LatentAssociations';
import SentimentAnalysis from './sections/SentimentAnalysis';

const About = () => {
  const classes = useSectionStyles();
  return (
    <Container className={classes.container}>
      <Card>
        <div className={classes.div}>
          <h2>User Guide</h2>
        </div>
        <FrequencyCounts />
        <LatentAssociations />
        <SentimentAnalysis />
      </Card>
    </Container>
  );
};

export default About;
