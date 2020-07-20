import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useSectionStyles } from '../hooks/useSectionStyles';

/**
 * The LatentAssociations section for the userguide page
 * @component
 */
export default function LatentAssociations() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h2 className={classes.sectionHeadings}>Latent Associations</h2>

      <h3 className={classes.subSectionHeadings}>Adding concepts</h3>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        Concepts are groupings of words that represent an idea, words can be
        added to a concept via a chip input in the same way as words on the
        frequency page. You may add up to four words per concept in a single
        request.
      </Typography>

      <h3 className={classes.subSectionHeadings}>Choosing an outlet</h3>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        Choosing an outlet is the same as choosing an outlet on the
        FrequencyCounts page, although you may only choose one of the available
        outlets in a single request.
      </Typography>

      <h3 className={classes.subSectionHeadings}>Interpreting the data</h3>
      <Typography
        variant="body1"
        component="p"
        color="textPrimary"
        className={classes.aboutText}
      >
        The latent association metric between a pair of words is derived from the
        cosine similarity of the word2vec embedding vector representations of
        each word. This metric can be interpreted as measuring the likelihood
        with which a pair of words co-occur together or in similar contexts.
      </Typography>
    </div>
  );
}
