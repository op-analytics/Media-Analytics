import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../components/Form';
import LineCharts from '../../components/LineCharts';
import { getFrequencies } from '../../state/ducks/timeline';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '94%',
  },
  label:{
    backgroundColor:'white',
  },
  formControl: {
    minWidth: 120,
  },
}));

const formData = [
  { label: 'Words', name: 'words', required: true },
  { label: 'Year from', name: 'year_from', required: true },
  { label: 'Year to', name: 'year_to', required: true },
];

/**
 * The frequency timeline page component
 * @component
 */
function Timeline() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [yAxisKey, setYAxisKey] = useState('freq');
  const [absolute, setAbsolute] = useState(false);

  const loading = useSelector(state => state.timeline.loading);
  const frequencies = useSelector(state => state.timeline.frequencies);

  const onSubmitHandler = ({
    year_from: yearFrom,
    year_to: yearTo,
    words: wordsString,
  }) => {
    const words = wordsString.split(',');
    dispatch(getFrequencies(words, yearFrom, yearTo));
  };

  return (
    <>
      <h3>Word Frequency Timeline</h3>
      <div className={classes.container}>
        <Form formData={formData} onSubmit={onSubmitHandler} />
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} id="y-axis-key-select-label">
            Y-Axis Key
          </InputLabel>
          <Select
            labelId="y-axis-key-select-label"
            id="y-axis-key-select"
            value={yAxisKey}
            onChange={e => setYAxisKey(e.target.value)}
          >
            <MenuItem value="freq">Frequency</MenuItem>
            <MenuItem value="count">Count</MenuItem>
            <MenuItem value="rank">Rank</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={(
            <Switch
              checked={absolute}
              onChange={() => setAbsolute(!absolute)}
              value="absolute"
              color="primary"
            />
          )}
          label="Display absolute"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <LineCharts
            datasets={frequencies}
            xAxisKey="year"
            yAxisKey={yAxisKey}
            displayAbsolute={absolute}
            tooltipItems={[
              { key: 'freq', title: 'freq' },
              { key: 'count', title: 'count' },
              { key: 'rank', title: 'rank' },
            ]}
          />
        )}
      </div>
    </>
  );
}

export default Timeline;
