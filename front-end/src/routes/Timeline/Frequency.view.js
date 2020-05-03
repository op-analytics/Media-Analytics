import CircularProgress from '@material-ui/core/CircularProgress';
import ChipInput from 'material-ui-chip-input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LineCharts from '../../components/LineCharts';
import { getFrequencies } from '../../state/ducks/timeline';

const useStyles = makeStyles(theme => ({
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
  form: {
    width: '45%',
    height: '100%',
  },
  input: {
    border: 'solid 1px black',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  submitButton: {
    width: '100%',
  },
  toggleButton: {
    maxWidth: '150px',
  },
}));

const mediaOutlets = [
  { title: 'New York Times', name: 'New York Times', value: 'nyt' },
  { title: 'Wall Street Journal', name: 'Wall Street Journal', value: 'wsj' },
  { title: 'The Guardian', name: 'The Guardian', value: 'guardian' },
  { title: 'HuffPost', name: 'HuffPost', value: 'hp' },
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
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();
  const [yAxisKey, setYAxisKey] = useState('freq');
  const [absolute, setAbsolute] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [displayOption, setDisplayOption] = useState('multiple');
  const [words, setWords] = useState([]);
  const loading = useSelector(state => state.timeline.loading);
  const frequencies = useSelector(state => state.timeline.frequencies);

  const onSubmitHandler = () => {
    dispatch(getFrequencies(words, yearFrom, yearTo, outlets));
  };

  return (
    <>
      <h3>Word Frequncy Timeline</h3>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <ChipInput
                  label="Words:"
                  name="words"
                  newChipKeyCodes={[13, 32]} // Make new chip on enter and space key codes
                  blurBehavior="add" // Fix android chrome bug
                  onChange={newWords => setWords(newWords)}
                  required={!words.length}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={mediaOutlets}
                  getOptionLabel={option => option.title}
                  filterSelectedOptions
                  required={!outlets.length}
                  onChange={(_, value) =>
                    setOutlets(value.map(({ value: code }) => code))
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Media Outlets"
                      placeholder="Add a media outlet"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  type="number"
                  label="Year from:"
                  name="year_from"
                  value={yearFrom}
                  onChange={e => setYearFrom(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  type="number"
                  label="Year to:"
                  name="year_to"
                  value={yearTo}
                  onChange={e => setYearTo(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            {
              // Custom options start here
            }
            <Grid item md={3} sm={6} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  className={classes.label}
                  id="y-axis-key-select-label"
                >
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
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControl className={classes.formControl}>
                <ToggleButton
                  selected={absolute}
                  onChange={() => {
                    setAbsolute(!absolute);
                  }}
                  className={classes.ToggleButton}
                >
                  Display Absolute
                </ToggleButton>
              </FormControl>
            </Grid>
            <Grid item md xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  className={classes.label}
                  id="display-option-select-label"
                >
                  Display Options
                </InputLabel>
                <Select
                  labelId="display-option-select-label"
                  id="display-option-select"
                  value={displayOption}
                  onChange={e => setDisplayOption(e.target.value)}
                >
                  {displayOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {
              // Submit button
            }
            <Grid container item sm={12} justify="center">
              <Grid item xs={3} align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  margin="0 auto"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {loading ? (
          <CircularProgress />
        ) : (
          <LineCharts
            datasets={frequencies}
            xAxisKey="year"
            yAxisKey={yAxisKey}
            displayAbsolute={absolute}
            tooltipItems={[{ key: 'rank', title: 'rank' }]}
            words={words}
            mediaOutlets={outlets}
            allMediaOutlets={mediaOutlets}
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
