import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import React, { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { createTooltip } from '../Shared/utils';
import Form from './components/Timeline-two-field-form';


const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '80vw',
    height: '50vh',
    flex: '0 1 auto',
    maxWidth: '1000px',
    paddingBottom: '6vh',
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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '94%',
  },
}));

const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'
    : process.env.REACT_APP_API_URL;

export default function Timeline() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const onSubmitHandler = (e, yearFrom, yearTo, concept1, concept2) => {
    e.preventDefault();
    const concept1Array = concept1.split(',');
    const concept2Array = concept2.split(',');
    const yearFromInt = parseInt(yearFrom);
    const yearToInt = parseInt(yearTo);
    setLoading(true);
    Axios.post(`${API_URL}/timeline/latent-association`, {
      concept_1: concept1Array,
      concept_2: concept2Array,
      year_from: yearFromInt,
      year_to: yearToInt,
    })
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <h3>Latent association over time</h3>
      <div className={classes.container}>
        <Form onSubmitHandler={onSubmitHandler} />
        {loading ? (
          <CircularProgress />
        ) : (
          data && (
            <div className={classes.chartContainer}>
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year_range" tickMargin={15} />
                  <YAxis
                    dataKey="association"
                    tickFormatter={tickValue => tickValue.toFixed(2)}
                    domain={['dataMin', 'dataMax']}
                  />
                  <Tooltip
                    content={createTooltip(classes, [
                      {
                        key: 'association',
                        title: 'Association',
                        formatFunction: item => item.toFixed(5),
                      },
                    ])}
                  />
                  <Line
                    type="linear"
                    dataKey="association"
                    stroke="#8884d8"
                    fill="#8884d8"
                    strokeWidth={3}
                    dot={{ strokeWidth: 5 }}
                    activeDot={{
                      stroke: '#3F51B5',
                      strokeWidth: 7,
                      border: 'white',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        )}
      </div>
    </>
  );
}
