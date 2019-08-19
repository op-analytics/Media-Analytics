import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
<<<<<<< HEAD
import { makeStyles } from '@material-ui/core/styles';
=======
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
>>>>>>> e6ea8409bc074dbd2f2131df8844b56fe6536341
import Grid from '@material-ui/core/Grid';
import Form from './components/Form';

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

  const [datasets] = useState([
    {
      label: 'My First dataset',
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
      data: [
        {
          year: 1980,
          word: 'boat',
          rank: 1525,
          count: 3223,
          y: 0.0126,
        },
        {
          year: 1981,
          word: 'boat',
          rank: 1400,
          count: 3400,
          y: 0.013,
        },
        {
          year: 1982,
          word: 'boat',
          rank: 1420,
          count: 3375,
          y: 0.01352324,
        },
        {
          year: 1983,
          word: 'boat',
          rank: 1475,
          count: 4000,
          y: 0.01145463,
        },
        {
          year: 1984,
          word: 'boat',
          rank: 1600,
          count: 3955,
          y: 0.012745,
        },
      ],
    },
  ]);

  const [labels] = useState(['1980', '1981', '1982', '1983', '1984']);

  const classes = useStyles();

  useEffect(() => {
<<<<<<< HEAD
    setTimelineData(data => ({ ...data, datasets, labels }));
  }, [datasets, labels]);

  const createLabels = currentLabels => (tooltipItem, data) => currentLabels.reduce(
=======
    setData(data => ({ ...data, datasets, labels }));
  }, [datasets, labels]);

  const createLabels = labels => (tooltipItem, data) => labels.reduce(
>>>>>>> e6ea8409bc074dbd2f2131df8844b56fe6536341
    (accum, { key, value }) => accum.concat(key + data.datasets[0].data[tooltipItem.index][value]),
    [],
  );

  return (
    <>
      <h3>Word Frequency Timeline</h3>
      <Grid container spacing="2">
        <Grid item xs="false" lg={4} />
        <Grid item xs={6} lg={4} spacing-xs-2>
          <Form />
        </Grid>
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
                    { key: 'Count: ', value: 'count' },
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
