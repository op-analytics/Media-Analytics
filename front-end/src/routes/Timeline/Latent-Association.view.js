import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  createLatentAssociationLegendPayload,
  singleLatentAssociationDataset,
  stringToColour,
} from '../../components/LineCharts/utils';
import { getAssociations } from '../../state/ducks/timeline';

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
  chartContainer: {
    width: '100%',
    height: '50vh',
    flex: '0 1 auto',
    paddingBottom: '6vh',
    marginTop: '5vh',
  },
  chartTitle: {
    textAlign: 'center',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  tooltip: {
    width: '200px',
    margin: 0,
    lineHeight: '24px',
    border: '1px solid #f5f5f5',
    backgroundColor: 'hsla(0,0%,100%,.8)',
    padding: '10px',
  },
  tooltipLabel: {
    color: '#333',
  },
  tooltipLabelFirstWord: {
    color: '#777',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  Card: {
    width: '45vw',
    minWidth: '400px',
  },
}));

// TODO Update other functions to use title instead of name, title is required for
// autocomplete.
const mediaOutlets = [
  { title: 'New York Times', name: 'New York Times', value: 'nyt' },
  { title: 'Wall Street Journal', name: 'Wall Street Journal', value: 'wsj' },
  { title: 'The Guardian', name: 'The Guardian', value: 'guardian' },
];

const displayOptions = [
  { name: 'On a single chart', value: 'single' },
  { name: 'Seperated by media outlet', value: 'byOutlet' },
];

/**
 * The latent association page component
 * @component
 */
function Timeline() {
  const associations = useSelector(state => state.timeline.associations);
  const loading = useSelector(state => state.timeline.loading);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [concept1, setConcept1] = useState([]);
  const [concept2, setConcept2] = useState([]);
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();
  const [outlets, setOutlets] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const wordLimit = 5;

  const handleDelete = (chip, state, setState) => {
    setState(state.filter(word => word != chip));
  };

  const handleAddChip = (chip, state, setState) => {
    if (state.length < wordLimit) {
      setState([...state, chip]);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    setFormSubmitted(true);
    dispatch(getAssociations(concept1, concept2, yearFrom, yearTo, outlets));
  };

  return (
    <>
      <h3>Latent association over time</h3>
      <div className={classes.container}>
        <Card className={classes.Card}>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <ChipInput
                    label="Concept One:"
                    name="concept_1"
                    newChipKeyCodes={[13, 32]} // Make new chip on enter and space key codes
                    blurBehavior="add" // Fix android chrome bug
                    required={!concept1.length}
                    value={concept1}
                    onAdd={chip => handleAddChip(chip, concept1, setConcept1)}
                    onDelete={chip => handleDelete(chip, concept1, setConcept1)}
                    chipRenderer={({ value }, key) => (
                      <Chip
                        key={key}
                        style={{ margin: '0px 8px 8px 0px', float: 'left' }}
                        color="secondary"
                        label={value}
                        onDelete={_ =>
                          handleDelete(value, concept1, setConcept1)
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <ChipInput
                    label="Concept Two:"
                    name="concept_2"
                    newChipKeyCodes={[13, 32]} // Make new chip on enter and space key codes
                    blurBehavior="add" // Fix android chrome bug
                    required={!concept2.length}
                    value={concept2}
                    onAdd={chip => handleAddChip(chip, concept2, setConcept2)}
                    onDelete={chip => handleDelete(chip, concept2, setConcept2)}
                    chipRenderer={({ value }, key) => (
                      <Chip
                        key={key}
                        style={{ margin: '0px 8px 8px 0px', float: 'left' }}
                        color="default"
                        label={value}
                        onDelete={_ =>
                          handleDelete(value, concept2, setConcept2)
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <Autocomplete
                    id="outlet"
                    options={mediaOutlets}
                    getOptionLabel={option => option.title}
                    filterSelectedOptions
                    required={!outlets.length}
                    onChange={(_, value) => {
                      setOutlets([value.value])
                    }
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Media Outlet"
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
                    onChange={e => setYearFrom(Number(e.target.value))}
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
                    onChange={e => setYearTo(Number(e.target.value))}
                    required
                  />
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
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>

        {loading ? (
          <CircularProgress />
        ) : (
          formSubmitted &&
          outlets.map(outlet => {
            let data = singleLatentAssociationDataset(associations);
            if (data) {
              return (
                <div className={classes.chartContainer}>
                  <h1 className={classes.chartTitle}>
                    {mediaOutlets.find(obj => obj.value === outlet).name}
                  </h1>
                  <ResponsiveContainer>
                    <LineChart
                      data={data.data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 10,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="yearRange" tickMargin={15} />
                      <YAxis />
                      <Legend
                        payload={createLatentAssociationLegendPayload(
                          data,
                          outlets,
                          mediaOutlets,
                        )}
                      />
                      <Tooltip />
                      <Line
                        type="linear"
                        dataKey={'association'}
                        stroke={stringToColour(outlet)}
                        fill={stringToColour(outlet)}
                        strokeWidth={3}
                        dot={{ strokeWidth: 5 }}
                        activeDot={{
                          stroke: stringToColour(outlet),
                          strokeWidth: 7,
                          border: 'white',
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
}

export default Timeline;
