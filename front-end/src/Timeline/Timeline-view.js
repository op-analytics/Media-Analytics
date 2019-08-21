import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Form from './components/Timeline-form';

const useStyles = makeStyles(() => ({
  LineChart: {
    maxWidth: '1000px',
  },
}));

export default function Timeline() {
  const [timelineData, setTimelineData] = useState({
    labels: [],
    datasets: [],
  });

  const classes = useStyles();

  const createLabels = currentLabels => (tooltipItem, data) => currentLabels.reduce(
    (accum, { key, value }) => accum.concat(key + data.datasets[0].data[tooltipItem.index][value]),
    [],
  );

  return (
    <>
      <h3>Word Frequency Timeline</h3>
      <Form setTimelineData={setTimelineData} />
      <Grid container spacing="2">
        <Grid item xs="false" lg={4} />
        <Grid item xs="false" lg={4} />
        <Grid item xs="false" lg={3} />
        <Grid item xs={12} lg={6} className={classes.LineChart} wrap="wrap">
          <Line
            data={timelineData}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              tooltips: {
                callbacks: {
                  title(tooltipItem, data) {
                    const response = data.datasets[0].data[tooltipItem[0].index];
                    return `${response.year} - ${response.word}`;
                  },
                  label: createLabels([
                    { key: 'Frequency: ', value: 'y' },
                    { key: 'Count: ', value: 'wordCount' },
                    { key: 'Rank: ', value: 'rank' },
                  ]),
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
