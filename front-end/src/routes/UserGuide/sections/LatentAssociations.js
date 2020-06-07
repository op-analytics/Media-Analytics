import React from 'react';
import { useSectionStyles } from '../hooks/useSectionStyles';

export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <div className={classes.div}>
        <h3>Latent Associaions</h3>
        <h4>Adding words</h4>
        <h4>Choosing outlets</h4>
        <h4>Display options</h4>
        <h4>Display Absolute vs Display Normalised</h4>
        <h4>Interpreting the data</h4>
      </div>
    </div>
  );
}
