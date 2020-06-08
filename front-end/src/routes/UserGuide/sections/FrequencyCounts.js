import React from 'react';
import { useSectionStyles } from '../hooks/useSectionStyles';

export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h3 className={classes.sectionHeadings}>Frequency Counts</h3>
      <h4 className={classes.subSectionHeadings}>Adding words</h4>
      <p>
        Words are added via a chip input. They can be deleted by pressing
        backspace twice, the delete key or by clicking the &apos;X&apos; on the
        chip itself.
      </p>
      <img
        src="/userguide/chipInput.png"
        className={classes.image}
        alt="Input pane"
      />
      <p>You may add up to four words in a single request.</p>
      <h4 className={classes.subSectionHeadings}>Choosing outlets</h4>
      <p>
        Outlets are a prepopulated list that are selected via a chip input with
        autocomplete.
      </p>
      <img src="/userguide/chipInput.png" className={classes.image}/>
      <p>
        We have frequency data for 46 outlets from multiple countries. You may
        add up to four outlets in a single request.
      </p>
      <h4 className={classes.subSectionHeadings}>Display options</h4>
      <p>
        There are four options for chart rendering available for frequency
        counts.
      </p>
      <h4 className={classes.subSectionHeadings}>Single</h4>
      <p>
        This option renders all data on a single chart. Words are differentiated
        by line color and outlets are differentiated by data point shape.
      </p>
      <h4 className={classes.subSectionHeadings}>Multiple</h4>
      <p>
        This option renders an individual chart for each outlet combined with
        each word. They are then arranged in a grid, with a row for each word and
        a column for each outlet.
      </p>
      <h4 className={classes.subSectionHeadings}>By outlet</h4>
      <p>
        This options renders a chart for each outlet and displays the data for
        each word.
      </p>
      <h4 className={classes.subSectionHeadings}>By word</h4>
      <p>
        This options renders a chart for each word and displays the data for each
        outlet. Outlets are differentiated by line color.
      </p>
      <h4>Display Absolute vs Display Normalised</h4>
      <p>The default display</p>
      <h4>Interpreting the data</h4>
    </div>
  );
}
