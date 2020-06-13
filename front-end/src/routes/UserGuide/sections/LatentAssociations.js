import React from 'react';
import { useSectionStyles } from '../hooks/useSectionStyles';

export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h2 className={classes.sectionHeadings}>Latent Associaions</h2>
      <h3 className={classes.subSectionHeadings}>Adding words</h3>
      <h3 className={classes.subSectionHeadings}>Choosing an outlet</h3>
      <h3 className={classes.subSectionHeadings}>Interpreting the data</h3>
    </div>
  );
}
