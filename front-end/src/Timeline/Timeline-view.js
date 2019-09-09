import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Form from './components/Timeline-form';
import LineCharts from '../Shared/LineCharts';

const API_URL = process.env.NODE_ENV === 'production' ? '/api/' : process.env.REACT_APP_API_URL;

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

export default function Timeline() {
  const [timelineDatasets, setTimelineDatasets] = useState([]);

  const classes = useStyles();

  const getLabels = wordFrequencyData =>
    wordFrequencyData[0].data.reduce((yearLabels, { year }) => yearLabels.concat(year * 1), []);

  const createDataset = ({ data, word }) => {
    const dataWithY = data.reduce(
      (accum, {
        wordFreq, rank, wordCount, year,
      }) =>
        accum.concat({
          word,
          year,
          wordFreq,
          rank,
          wordCount,
          y: wordFreq,
        }),
      [],
    );

    return {
      label: word,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(172,75,125,0.8)',
      pointBackgroundColor: 'rgba(172,75,125,1)',
      pointBorderWidth: 1.5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderWidth: 2,
      pointHitRadius: 10,
      data: dataWithY,
    };
  };

  const onSubmitHandler = (e, yearFrom, yearTo, words) => {
    e.preventDefault();
    const wordArray = words.split(',');
    Axios.post(`${API_URL}timeline/frequency`, {
      words: wordArray,
      year_from: yearFrom,
      year_to: yearTo,
    })
      .then(response => {
        const wordFrequencyData = response.data.data;
        setTimelineDatasets(
          wordFrequencyData.reduce(
            (accum, data) =>
              accum.concat({
                labels: getLabels(wordFrequencyData),
                datasets: [createDataset(data)],
              }),
            [],
          ),
        );
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <h3>Word Frequency Timeline</h3>
      <div className={classes.container}>
        <Form onSubmitHandler={onSubmitHandler} />
        <LineCharts chartDatasets={timelineDatasets} />
      </div>
    </>
  );
}
