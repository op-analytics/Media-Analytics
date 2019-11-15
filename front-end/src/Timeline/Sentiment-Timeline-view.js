import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import React, { useState } from 'react';
import LineCharts from '../Shared/LineChartsV2';
import Form from './components/Timeline-form';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'
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
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const onSubmitHandler = (e, yearFrom, yearTo, words) => {
    e.preventDefault();
    const wordArray = words.split(',');
    setLoading(true);
    Axios.post(`${API_URL}/timeline/sentiment`, {
      words: wordArray,
      year_from: yearFrom,
      year_to: yearTo,
    })
      .then(response => {
        const wordFrequencyData = response.data.data;
        setTimelineDatasets(wordFrequencyData);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <h3>Sentiment Over Timeline</h3>
      <div className={classes.container}>
        <Form onSubmitHandler={onSubmitHandler} />
        {loading ? (
          <CircularProgress />
        ) : (
          <LineCharts
            datasets={timelineDatasets.map(cleanDataset)}
            xAxisKey="year"
            yAxisKey="sentiment"
            tooltipItems={[{ key: 'sentiment', title: 'Sentiment' }]}
          />
        )}
      </div>
    </>
  );
}
