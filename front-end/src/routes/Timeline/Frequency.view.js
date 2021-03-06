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
import { useStoreActions, useStoreState } from 'easy-peasy';
import ChipInput from 'material-ui-chip-input';
import React, { useMemo, useState } from 'react';

// import Autocomplete from '@material-ui/lab/Autocompelte';
import CsvDownloadButton from '../../components/CsvDownloadButton';
import FeedbackBar from '../../components/FeedbackBar';
import LineCharts from '../../components/LineCharts';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
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
  circularProgress: {
    marginTop: '40px',
  },
}));

const MEDIA_OUTLETS = config.mediaOutlets.frequency;
const DISPLAY_OPTIONS = config.frequencyDisplayOptions;
const MIN_YEAR = config.yearRange.from;
const MAX_YEAR = config.yearRange.to;
const PARAMETER_LIMIT = config.parameterLimits.frequency;
const Y_AXIS_METRICS = config.frequencyAxisMetrics;
const CSV_DOWNLOAD_NAME = config.csvDownloadNames.frequency;

const getDownloadData = (currentData, key, yearFrom, yearTo) => {
  const dataToDownload = [];
  currentData.forEach((wordData) => {
    const { word, year, outlet, [key]: value } = wordData;
    if (year <= yearTo && year >= yearFrom)
      dataToDownload.push({
        year,
        value,
        mediaOutlet: MEDIA_OUTLETS.find((obj) => obj.value === outlet).title,
        word,
      });
  });
  return dataToDownload;
};

/**
 * The frequency timeline page component
 * @component
 */
function Frequency() {
  const classes = useStyles();

  const [yearFrom, setYearFrom] = useState(MIN_YEAR);
  const [yearTo, setYearTo] = useState(MAX_YEAR);
  const [yAxisMetric, setYAxisMetric] = useState('freq');
  const [normalised, setNormalised] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [displayOption, setDisplayOption] = useState('byOutlet');
  const [words, setWords] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const loading = useStoreState((state) => state.ui.loading);
  const frequencies = useStoreState((state) => state.timeline.frequencies);
  const getFrequencies = useStoreActions(
    (state) => state.timeline.getFrequencies,
  );

  const errors = useStoreState((state) => state.ui.errors);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    getFrequencies({ words, year_from: MIN_YEAR, year_to: MAX_YEAR, outlets });
  };

  const handleDelete = (chip, state, setState) => {
    setState(state.filter((word) => word !== chip));
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
          filename={CSV_DOWNLOAD_NAME}
        />
      ) : null}
      <div className={classes.container}>
        <Card className={classes.Card}>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <h2>Frequency Counts</h2>
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
                    onAdd={(chip) => {
                      handleAddChip(chip, words, setWords);
                    }}
                    onDelete={(chip) => handleDelete(chip, words, setWords)}
                    chipRenderer={({ value }, key) => (
                      <Chip
                        key={key}
                        style={{
                          margin: '0px 8px 8px 0px',
                          float: 'left',
                        }}
                        label={value}
                        // eslint-disable-next-line no-unused-vars
                        onDelete={(_) => handleDelete(value, words, setWords)}
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
                    options={MEDIA_OUTLETS}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    filterOptions={(options, state) => {
                      return outlets.length < PARAMETER_LIMIT
                        ? options.filter((option) => {
                            const optionTitle = option.title.toLowerCase();
                            const input = state.inputValue.toLowerCase();
                            return optionTitle.includes(input);
                          })
                        : [];
                    }}
                    onChange={(_, value) => {
                      const newOutlets = value.map(({ value: code }) => code);
                      const newOutletExists = !newOutlets.every((item) =>
                        outlets.includes(item),
                      );
                      if (newOutletExists && words.length) {
                        setFormSubmitted(false);
                      }
                      setOutlets(newOutlets);
                    }}
                    renderInput={(params) => (
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
                    InputProps={{ inputProps: { min: MIN_YEAR, max: yearTo } }}
                    onChange={(e) => {
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
                    InputProps={{ inputProps: { min: yearFrom, max: MAX_YEAR } }}
                    onChange={(e) => {
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
                    onChange={(e) => setYAxisMetric(e.target.value)}
                  >
                    {Y_AXIS_METRICS.map((metric) => (
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
                    onChange={(e) => setDisplayOption(e.target.value)}
                  >
                    {DISPLAY_OPTIONS.map((option) => (
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

        {errors.length > 0 ? <FeedbackBar errors={errors} /> : null}

        {loading ? (
          <CircularProgress className={classes.circularProgress} />
        ) : (
          formSubmitted &&
          words.length !== 0 && (
            <LineCharts
              datasets={frequencies}
              formParameters={{
                outlets,
                words: words.map((word) => word.toLowerCase()),
                yearFrom: Number(yearFrom),
                yearTo: Number(yearTo),
                yAxisKey: yAxisMetric,
                displayNormalised: normalised,
                displayOption,
              }}
              mediaOutlets={MEDIA_OUTLETS}
            />
          )
        )}
      </div>
    </>
  );
}

export default Frequency;
