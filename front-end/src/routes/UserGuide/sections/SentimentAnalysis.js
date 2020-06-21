import React from 'react';

import { useSectionStyles } from '../hooks/useSectionStyles';

/**
 * The SentimentAnalysis section for the userguide page
 * @component
 */
export default function SentimentAnalysis() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h2 className={classes.sectionHeadings}>Sentiment Analysis</h2>
      <h3 className={classes.subSectionHeadings}>Adding a word</h3>
      <h3 className={classes.subSectionHeadings}>Choosing an outlet</h3>
      <p>
        Currently sentiment analysis is only available for the New York Times.
        For reasons explained below the data is not considered accurate enough
        yet.
      </p>
      <h3 className={classes.subSectionHeadings}>Interpreting the data</h3>
    </div>
  );
}
