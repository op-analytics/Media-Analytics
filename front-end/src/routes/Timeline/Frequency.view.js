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
import { YAxis } from 'recharts';

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

const chartTypes = [
  { name: 'Single Chart', value: 'single' },
  { name: 'Mulitple Charts', value: 'multiple' },
  { name: 'By Outlet Charts', value: 'byOutlet' },
  { name: 'By Word Charts', value: 'byWord' },
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
  const [chartType, setChartType] = useState('multiple');
  const [words, setWords] = useState([]);

  const loading = useSelector(state => state.timeline.loading);
  const frequencies = useSelector(state => state.timeline.frequencies);

  const onSubmitHandler = ({
    year_from: yearFrom,
    year_to: yearTo,
    words: wordsString,
  }) => {
    let wordsList = wordsString.split(',')
    setWords(wordsList);
    dispatch(getFrequencies(wordsList, yearFrom, yearTo, mediaOutlets, chartType));
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
          <InputLabel className={classes.label} id="chart-type-select-label">
            Chart Type
          </InputLabel>
          <Select
            labelId="chart-type-select-label"
            id="chart-type-select"
            value={chartType}
            onChange={e => setChartType(e.target.value)}
          >
            {chartTypes.map(type => (
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
          />
        )}
      </div>
    </>
  );
}

export default Timeline;
