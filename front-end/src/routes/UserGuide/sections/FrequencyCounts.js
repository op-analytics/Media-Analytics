import React from 'react';
import { useSectionStyles } from '../hooks/useSectionStyles';

export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h3>Frequency Counts</h3>
      <br />
      <h4>Adding words</h4>
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
      <br />
      <h4>Choosing outlets</h4>
      <p>
        Outlets are a prepopulated list that are selected via a chip input with
        autocomplete.
      </p>
      <br />
      <img src="/userguide/chipInput.png" />
      <br />
      <p>
        We have frequency data for 46 outlets from multiple countries. You may
        add up to four outlets in a single request.
      </p>
      <br />
      <h4>Display options</h4>
      <br />
      <p>
        There are four options for chart rendering available for frequency
        counts.
      </p>
      <br />
      <h4>Single</h4>
      <br />
      <p>
        This option renders all data on a single chart. Words are differentiated
        by line color and outlets are differentiated by data point shape.
      </p>
      <h4>Multiple</h4>
      <p>This options</p>
      <h4>By outlet</h4>
      <p>This options</p>
      <h4>By word</h4>
      <p>This options</p>
      <h4>Display Absolute vs Display Normalised</h4>
      <h4>Interpreting the data</h4>
    </div>
  );
}
