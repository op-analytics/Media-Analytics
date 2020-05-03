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
  label: {
    backgroundColor: 'white',
  },
  formControl: {
    minWidth: 120,
    padding: 10,
  },
}));

const formData = [
  { label: 'Words', name: 'words', required: true },
  { label: 'Year from', name: 'year_from', required: true },
  { label: 'Year to', name: 'year_to', required: true },
];

const allMediaOutlets = [
  { name: 'New York Times', value: 'nyt' },
  { name: 'Wall Street Journal', value: 'wsj' },
  { name: 'The Guardian', value: 'guardian' },
  { name: 'HuffPost', value: 'hp' },
];

const displayOptions = [
  { name: 'On a single chart', value: 'single' },
  { name: 'On individual charts', value: 'multiple' },
  { name: 'Grouped by media outlet', value: 'byOutlet' },
  { name: 'Grouped by word', value: 'byWord' },
];

const yAxisKeys = [
  { name: 'Frequency', value: 'freq' },
  { name: 'Count', value: 'count' },
  { name: 'Rank', value: 'rank' },
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
  const [mediaOutlets, setMediaOutlets] = useState(['nyt']);
  const [displayOption, setDisplayOption] = useState('multiple');
  const [words, setWords] = useState([]);
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();
  const loading = useSelector(state => state.timeline.loading);
  const frequencies = useSelector(state => state.timeline.frequencies);

  const onSubmitHandler = ({
    year_from: yearFrom,
    year_to: yearTo,
    words: wordsString,
  }) => {
    let wordsList = wordsString.split(',')
    let year_from = Number(yearFrom)
    let year_to = Number(yearTo)
    setWords(wordsList);
    setYearFrom(year_from)
    setYearTo(year_to)
    dispatch(getFrequencies(wordsList, yearFrom, yearTo, mediaOutlets));
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
            {yAxisKeys.map(key => (
              <MenuItem key={key.name} value={key.value}>
                {key.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} id="media-outlets-select-label">
            Media Outlets
          </InputLabel>
          <Select
            labelId="media-outlets-select-label"
            id="media-outlets-select"
            multiple
            value={mediaOutlets}
            onChange={e => setMediaOutlets(e.target.value)}
          >
            {allMediaOutlets.map(outlet => (
              <MenuItem key={outlet.name} value={outlet.value}>
                {outlet.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} id="display-options-select-label">
            Display options
          </InputLabel>
          <Select
            labelId="display-options-select-label"
            id="display-options-select"
            value={displayOption}
            onChange={e => setDisplayOption(e.target.value)}
          >
            {displayOptions.map(type => (
              <MenuItem key={type.name} value={type.value}>
                {type.name}
              </MenuItem>
            ))}
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
              { key: "rank", title:"rank" }
            ]}
            words={words}
            mediaOutlets={mediaOutlets}
            allMediaOutlets={allMediaOutlets}
            yearFrom={yearFrom}
            yearTo={yearTo}
            displayOption={displayOption}
          />
        )}
      </div>
    </>
  );
}

export default Timeline;
