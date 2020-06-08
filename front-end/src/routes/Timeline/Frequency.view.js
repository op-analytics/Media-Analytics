import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ChipInput from 'material-ui-chip-input';
import React, { useState, useMemo, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import LineCharts from '../../components/LineCharts';
import CsvDownloadButton from '../../components/CsvDownloadButton';
import FeedbackBar from '../../components/FeedbackBar';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '94%',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  label: {
    backgroundColor: 'white',
  },
  form: {
    width: '100%',
    height: '100%',
    padding: '2rem',
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
  Card: {
    width: '45vw',
    minWidth: '400px',
  },
}));

const mediaOutlets = [
  { title: 'New York Times', value: 'nyt' },
  { title: 'Wall Street Journal', value: 'wsj' },
  { title: 'The Guardian', value: 'guardian' },
  { title: 'HuffPost', value: 'hp' },
];

const displayOptions = [
  { name: 'On a single chart', value: 'single' },
  { name: 'On individual charts', value: 'multiple' },
  { name: 'Grouped by media outlet', value: 'byOutlet' },
  { name: 'Grouped by word', value: 'byWord' },
];

const getDownloadData = (currentData, key, yearFrom, yearTo) => {
  const dataToDownload = [];
  currentData.forEach(wordData => {
    const { word, year, outlet, [key]: value } = wordData;
    if (year <= yearTo && year >= yearFrom)
      dataToDownload.push({
        year,
        value,
        mediaOutlet: mediaOutlets.find(obj => obj.value === outlet).title,
        word,
      });
  });
  return dataToDownload;
};
const yAxisMetrics = [
  { name: 'Frequency', value: 'freq' },
  { name: 'Count', value: 'count' },
  { name: 'Rank', value: 'rank' },
];

/**
 * The frequency timeline page component
 * @component
 */
function Timeline() {
  const MIN_YEAR = 1970;
  const MAX_YEAR = 2020;
  const PARAMETER_LIMIT = 4;

  const classes = useStyles();
  const [yearFrom, setYearFrom] = useState(MIN_YEAR);
  const [yearTo, setYearTo] = useState(MAX_YEAR);
  const [yAxisMetric, setYAxisMetric] = useState('freq');
  const [normalised, setNormalised] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [displayOption, setDisplayOption] = useState('byOutlet');
  const [words, setWords] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const loading = useStoreState(state => state.timeline.loading);
  const frequencies = useStoreState(state => state.timeline.frequencies);
  const getFrequencies = useStoreActions(state => state.timeline.getFrequencies);

  const setErrors = useStoreActions(state => state.timeline.setErrors);
  useEffect(() => {
    setErrors([])
  }, [setErrors]);
  const errors = useStoreState(state => state.timeline.errors);


  const dataToDownload = useMemo(
    () => getDownloadData(frequencies, yAxisMetric, yearFrom, yearTo),
    [frequencies, yAxisMetric, yearFrom, yearTo],
  );

  const csvHeaders = useMemo(
    () => [
      { label: 'media outlet', key: 'mediaOutlet' },
      { label: 'word', key: 'word' },
      { label: 'year', key: 'year' },
      { label: yAxisMetric, key: 'value' },
    ],
    [yAxisMetric],
  );

  const onSubmitHandler = e => {
    e.preventDefault();
    setFormSubmitted(true);
    getFrequencies({ words, year_from: MIN_YEAR, year_to: MAX_YEAR, outlets });
  };

  const handleDelete = (chip, state, setState) => {
    setState(state.filter(word => word !== chip));
  };

  const handleAddChip = (chip, state, setState) => {
    if (state.length < PARAMETER_LIMIT) {
      setState([...state, chip]);
      setFormSubmitted(true);
      if (outlets.length) {
        setFormSubmitted(false);
      }
    }
  };

  return (
    <>
      {formSubmitted && dataToDownload.length && !loading ? (
        <CsvDownloadButton
          data={dataToDownload}
          headers={csvHeaders}
          filename="ma-word-frequency.csv"
        />
      ) : null}
      <h3>Word Frequency Timeline</h3>
      <div className={classes.container}>
        <Card className={classes.Card}>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <ChipInput
                    label="Words:"
                    name="words"
                    newChipKeyCodes={[13, 32, 188]} // Make new chip on enter, space or comma key codes
                    blurBehavior="add" // Fix android chrome bug
                    required={!words.length}
                    value={words}
                    onAdd={chip => {
                      handleAddChip(chip, words, setWords);
                    }}
                    onDelete={chip => handleDelete(chip, words, setWords)}
                    chipRenderer={({ value }, key) => (
                      <Chip
                        key={key}
                        style={{
                          margin: '0px 8px 8px 0px',
                          float: 'left',
                        }}
                        label={value}
                        // eslint-disable-next-line no-unused-vars
                        onDelete={_ => handleDelete(value, words, setWords)}
                      />
                    )}
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
                    // eslint-disable-next-line no-unused-vars
                    filterOptions={(options, _) =>
                      outlets.length < PARAMETER_LIMIT ? options : []
                    }
                    onChange={(_, value) => {
                      console.log('value :>> ', value);
                      const newOutlets = value.map(({ value: code }) => code);
                      const newOutletExists = !newOutlets.every(item =>
                        outlets.includes(item),
                      );
                      if (newOutletExists && words.length) {
                        setFormSubmitted(false);
                      }
                      setOutlets(newOutlets);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Media Outlets"
                        placeholder="Add a media outlet"
                        required={!outlets.length}
                        helperText={
                          outlets.length === PARAMETER_LIMIT
                            ? `There is a ${PARAMETER_LIMIT} outlet limit per request`
                            : ''
                        }
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
                    InputProps={{ inputProps: { min: MIN_YEAR, max: MAX_YEAR } }}
                    onChange={e => {
                      const newYear = Number(e.target.value);
                      if (newYear >= MIN_YEAR && newYear <= MAX_YEAR) {
                        setYearFrom(newYear);
                      }
                    }}
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
                    InputProps={{ inputProps: { min: MIN_YEAR, max: MAX_YEAR } }}
                    onChange={e => {
                      const newYear = Number(e.target.value);
                      if (newYear >= MIN_YEAR && newYear <= MAX_YEAR) {
                        setYearTo(newYear);
                      }
                    }}
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
                    id="y-axis-metric-select-label"
                  >
                    Y-Axis Metric
                  </InputLabel>
                  <Select
                    labelId="y-axis-metric-select-label"
                    id="y-axis-metric-select"
                    value={yAxisMetric}
                    onChange={e => setYAxisMetric(e.target.value)}
                  >
                    {yAxisMetrics.map(metric => (
                      <MenuItem key={metric.value} value={metric.value}>
                        {metric.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <ToggleButton
                    selected={normalised}
                    value={normalised}
                    onChange={() => {
                      setNormalised(!normalised);
                    }}
                    className={classes.ToggleButton}
                  >
                    {normalised ? 'Display Absolute' : 'Display Normalised'}
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
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitButton}
                    margin="0 auto"
                    disabled={formSubmitted}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>

        { errors.length > 0 ? (
          <FeedbackBar
            errors={errors}
          />
        ) : null }

        {loading ? (
          <CircularProgress />
        ) : (
          formSubmitted &&
          words.length !== 0 && (
            <LineCharts
              datasets={frequencies}
              formParameters={{
                outlets,
                words,
                yearFrom: Number(yearFrom),
                yearTo: Number(yearTo),
                yAxisKey: yAxisMetric,
                displayNormalised: normalised,
                displayOption,
              }}
              mediaOutlets={mediaOutlets}
            />
          )
        )}
      </div>
    </>
  );
}

export default Timeline;
