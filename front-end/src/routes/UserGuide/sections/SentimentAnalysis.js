import React from 'react';
import { useSectionStyles } from '../hooks/useSectionStyles';

export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <div className={classes.div}>
        <h3>Sentment Analysis</h3>
        <h4>Adding words</h4>
        <h4>Outlets available</h4>
        <p>
          Currently sentiment analysis is only availanble for the New York times.
          For reasons explained below the data is not considered accurate enough
          yet.
        </p>
        <h4>Interpreting the data</h4>
      </div>
    </div>
  );
}
