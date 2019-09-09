import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '100%',
    flex: '0 1 auto',
    maxWidth: '1000px',
  },
}));

function LineCharts({ chartDatasets }) {
  const classes = useStyles();

  return (
    <>
      {chartDatasets.map(data => (
        <div className={classes.chartContainer}>
          <Line
            key={data.datasets[0].data[0].word}
            data={data}
            options={{
              maintainAspectRatio: true,
              responsive: true,
              tooltips: {
                callbacks: {
                  title: (tooltipItem, wordData) => {
                    const response = wordData.datasets[0].data[tooltipItem[0].index];
                    return `${response.year} - ${response.word}`;
                  },
                  label: (toolTipItems => (tooltipItem, wordData) =>
                    toolTipItems.reduce(
                      (accum, { key, value }) =>
                        accum.concat(key + wordData.datasets[0].data[tooltipItem.index][value]),
                      [],
                    ))([
                    {
                      key: 'Frequency: ',
                      value: 'y',
                    },
                    {
                      key: 'Count: ',
                      value: 'wordCount',
                    },
                    {
                      key: 'Rank: ',
                      value: 'rank',
                    },
                  ]),
                },
              },
            }}
          />
        </div>
      ))}
    </>
  );
}

LineCharts.propTypes = {
  chartDatasets: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string),
      datasets: PropTypes.arrayOf(PropTypes.shape({ data: PropTypes.array.isRequired })),
    }),
  ).isRequired,
};

export default LineCharts;
