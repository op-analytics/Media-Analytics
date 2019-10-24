import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Form from './components/Timeline-form';
import LineCharts from '../Shared/LineChartsV2';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/'
    : process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '94%',
  },
}));

const cleanDataset = dataset => ({ title: dataset.word, data: dataset.data });

export default function Timeline() {
  const [timelineDatasets, setTimelineDatasets] = useState([]);

  const classes = useStyles();

  const onSubmitHandler = (e, yearFrom, yearTo, words) => {
    e.preventDefault();
    const wordArray = words.split(',');
    Axios.post(`${API_URL}/timeline/frequency`, {
      words: wordArray,
      year_from: yearFrom,
      year_to: yearTo,
    })
      .then(response => {
        const wordFrequencyData = response.data.data;
        setTimelineDatasets(wordFrequencyData);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <h3>Word Frequency Timeline</h3>
      <div className={classes.container}>
        <Form onSubmitHandler={onSubmitHandler} />
        <LineCharts
          datasets={timelineDatasets.map(cleanDataset)}
          xAxisKey="year"
          yAxisKey="freq"
          tooltipItems={[
            { key: 'freq', title: 'freq' },
            { key: 'count', title: 'count' },
            { key: 'rank', title: 'rank' },
          ]}
        />
      </div>
    </>
  );
}
